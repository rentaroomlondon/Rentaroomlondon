import RoomLead from "../Models/Lead.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "node:crypto";
import { isNameSafe } from "../utils/validateName.js";   // ← Import here

const safeEqual = (provided, expected) => {
  const a = Buffer.from(String(provided || ""));
  const b = Buffer.from(String(expected || ""));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
};

export const receiveGoogleAdsLead = async (req, res) => {
  try {
    const expectedKey = process.env.GOOGLE_ADS_WEBHOOK_KEY || "";
    if (!expectedKey) {
      console.error("GOOGLE_ADS_WEBHOOK_KEY is not configured");
      return res.status(503).json({ message: "Google Ads lead integration is not configured" });
    }
    const payload = req.body || {};
    if (!safeEqual(payload.google_key ?? payload.Google_key, expectedKey)) {
      return res.status(403).json({ message: "Invalid Google Ads webhook key" });
    }
    if (typeof payload.lead_id !== "string" || !payload.lead_id.trim()) {
      return res.status(400).json({ message: "lead_id is required" });
    }

    const googleLeadId = payload.lead_id.trim().slice(0, 200);
    if (await RoomLead.exists({ googleLeadId })) return res.status(200).json({});

    const fields = {};
    for (const column of Array.isArray(payload.user_column_data) ? payload.user_column_data : []) {
      const id = String(column?.column_id || "").toUpperCase();
      const value = typeof column?.string_value === "string" ? column.string_value.trim().slice(0, 2000) : "";
      if (value) fields[id] = value;
    }
    const firstName = fields.FIRST_NAME || "";
    const lastName = fields.LAST_NAME || "";
    const submittedAt = payload.lead_submit_time ? new Date(payload.lead_submit_time) : null;

    const lead = await RoomLead.create({
      name: (fields.FULL_NAME || `${firstName} ${lastName}`.trim()).slice(0, 120),
      phone: (fields.PHONE_NUMBER || fields.WORK_PHONE || "").slice(0, 40),
      email: (fields.EMAIL || fields.WORK_EMAIL || "").toLowerCase().slice(0, 254),
      location: (fields.PREFERRED_LOCATION || fields.CITY || fields.POSTAL_CODE || "").slice(0, 160),
      source: "google_ads",
      googleLeadId,
      google: {
        campaignId: payload.campaign_id == null ? "" : String(payload.campaign_id),
        adGroupId: payload.adgroup_id == null ? "" : String(payload.adgroup_id),
        creativeId: payload.creative_id == null ? "" : String(payload.creative_id),
        formId: payload.form_id == null ? "" : String(payload.form_id),
        clickId: typeof payload.gcl_id === "string" ? payload.gcl_id.slice(0, 500) : "",
        apiVersion: typeof payload.api_version === "string" ? payload.api_version.slice(0, 30) : "",
        leadSource: typeof payload.lead_source === "string" ? payload.lead_source.slice(0, 80) : "",
        submittedAt: submittedAt && !Number.isNaN(submittedAt.getTime()) ? submittedAt : undefined,
        isTest: payload.is_test === true,
        answers: Object.entries(fields).map(([question, answer]) => ({ question, answer })),
      },
    });
    if (payload.is_test !== true) {
      const escapeHtml = (value) => String(value || "").replace(/[&<>\"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;",
      }[character]));
      const answerRows = Object.entries(fields)
        .map(([question, answer]) => `<p><b>${escapeHtml(question)}:</b> ${escapeHtml(answer)}</p>`)
        .join("");
      sendEmail(
        ["info@rentaroomlondon.co.uk", "londonrentalroom@gmail.com"],
        "New Google Ads room lead",
        `<h3>New Google Ads lead received</h3><p><b>Name:</b> ${escapeHtml(lead.name || "Not provided")}</p><p><b>Email:</b> ${escapeHtml(lead.email || "Not provided")}</p><p><b>Phone:</b> ${escapeHtml(lead.phone || "Not provided")}</p><p><b>Location:</b> ${escapeHtml(lead.location || "Not provided")}</p><p><b>Campaign:</b> ${escapeHtml(lead.google.campaignId || "Not provided")}</p><hr/>${answerRows}<p>Open Admin → Leads → Room Leads to follow up.</p>`
      ).catch((emailError) => console.error("Google Ads lead notification failed:", emailError.message));
    }
    return res.status(200).json({});
  } catch (error) {
    if (error?.code === 11000 && error?.keyPattern?.googleLeadId) return res.status(200).json({});
    console.error("Google Ads lead webhook error:", error.message);
    return res.status(500).json({ message: "Unable to save Google Ads lead" });
  }
};

// CRM-only manual entry. This deliberately does not use or change the public website form flow.
export const createCrmLead = async (req, res) => {
  try {
    const name = typeof req.body.name === "string" ? req.body.name.trim().slice(0, 120) : "";
    const phone = typeof req.body.phone === "string" ? req.body.phone.trim().slice(0, 40) : "";
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase().slice(0, 254) : "";
    const location = typeof req.body.location === "string" ? req.body.location.trim().slice(0, 160) : "";
    if (name.length < 2) return res.status(400).json({ success: false, message: "Enter a name with at least two characters" });
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return res.status(400).json({ success: false, message: "Enter a valid email address" });

    const lead = await RoomLead.create({ name, phone, email, location, source: "manual", status: "New" });
    return res.status(201).json({ success: true, data: lead });
  } catch (error) {
    console.error("Create CRM Lead Error:", error.message);
    return res.status(500).json({ success: false, message: "Unable to create lead" });
  }
};

export const createRoomLead = async (req, res) => {
  try {
    const { name, phone, location, website } = req.body;
    const cleanEmail = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const roomType = typeof req.body.roomType === "string" ? req.body.roomType.trim() : "";
    const monthlyBudget = typeof req.body.monthlyBudget === "string" ? req.body.monthlyBudget.trim() : "";

    // 1. Honeypot check
    if (website) {
      return res.status(201).json({
        success: true,
        message: "Lead submitted successfully",
      });
    }

    // 2. Basic validation
    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid full name",
      });
    }

    if (!phone || !String(phone).trim()) {
      return res.status(400).json({ success: false, message: "Please enter a complete and valid phone number" });
    }

    if (!location || typeof location !== "string" || location.trim().length < 2) {
      return res.status(400).json({ success: false, message: "Please enter a preferred location" });
    }

    if (req.body.email != null && typeof req.body.email !== "string") {
      return res.status(400).json({ success: false, message: "Please enter a valid email address" });
    }
    if (req.body.roomType != null && typeof req.body.roomType !== "string") {
      return res.status(400).json({ success: false, message: "Please select a valid room type" });
    }
    if (req.body.monthlyBudget != null && typeof req.body.monthlyBudget !== "string") {
      return res.status(400).json({ success: false, message: "Please select a valid monthly budget" });
    }

    if (cleanEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      const localPart = cleanEmail.split("@")[0];
      const isSuspicious =
        localPart.length < 4 ||
        (localPart.match(/\./g) || []).length >= 2 ||
        localPart.includes("..") ||
        localPart.startsWith(".") ||
        localPart.endsWith(".") ||
        /^[0-9]+$/.test(localPart) ||
        /^(test|fake|dummy|sample|admin|user|guest|asdf|qwer)/.test(localPart);
      if (!emailRegex.test(cleanEmail) || isSuspicious) {
        return res.status(400).json({ success: false, message: "Please enter a valid email address" });
      }
    }

    if (!["", "Single", "Double", "Ensuite"].includes(roomType)) {
      return res.status(400).json({ success: false, message: "Please select a valid room type" });
    }
    if (!["", "Under £600", "£600–£750", "£750–£900", "£900+"].includes(monthlyBudget)) {
      return res.status(400).json({ success: false, message: "Please select a valid monthly budget" });
    }

    // 3. NameAPI Risk Detector (blocks garbage names)
    const nameIsSafe = await isNameSafe(name);

    if (!nameIsSafe) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid full name",
      });
    }

    // 4. Create the lead
    const lead = await RoomLead.create({
      name: name.trim(),
      phone: String(phone).trim(),
      location: location.trim(),
      email: cleanEmail,
      roomType,
      monthlyBudget,
    });

    const subject = "New Room Search Lead";

    const htmlContent = `
      <h3>New Lead Received</h3>
      <hr />
      <p><b>Name:</b> ${name}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Preferred Location:</b> ${location}</p>
      <p><b>Email:</b> ${cleanEmail || "Not provided"}</p>
      <p><b>Room Type:</b> ${roomType || "Not specified"}</p>
      <p><b>Monthly Budget:</b> ${monthlyBudget || "Not specified"}</p>
      <p><b>Lead ID:</b> ${lead._id}</p>
    `;

    // Email → INFO
    try {
      await sendEmail(
        "info@rentaroomlondon.co.uk",
        subject,
        htmlContent
      );
      console.log("✅ Room Lead email sent to: info@rentaroomlondon.co.uk");
    } catch (emailError) {
      console.error(
        "❌ Room Lead email failed: info@rentaroomlondon.co.uk",
        emailError.message
      );
    }

    // Email → GMAIL
    try {
      await sendEmail(
        "londonrentalroom@gmail.com",
        subject,
        htmlContent
      );
      console.log("✅ Room Lead email sent to: londonrentalroom@gmail.com");
    } catch (emailError) {
      console.error(
        "❌ Room Lead email failed: londonrentalroom@gmail.com",
        emailError.message
      );
    }

    return res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// 🟢 GET ALL ROOM LEADS (ADMIN)
// ============================
export const getAllRoomLeads = async (req, res) => {
  try {
    const { status, source, q } = req.query;
    const filter = {};
    if (["New", "Contacted", "Qualified", "Viewing booked", "Won", "Lost"].includes(status)) filter.status = status;
    if (["website", "google_ads", "manual"].includes(source)) filter.source = source;
    if (typeof q === "string" && q.trim()) {
      const escaped = q.trim().slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = ["name", "phone", "email", "location", "assignedTo"].map((field) => ({ [field]: { $regex: escaped, $options: "i" } }));
    }
    const leads = await RoomLead.find(filter).sort({ createdAt: -1 }).lean();

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    console.error("Get All Room Leads Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateRoomLead = async (req, res) => {
  try {
    const updates = {};
    const statuses = ["New", "Contacted", "Qualified", "Viewing booked", "Won", "Lost"];
    if (req.body.status !== undefined) {
      if (!statuses.includes(req.body.status)) return res.status(400).json({ success: false, message: "Invalid lead status" });
      updates.status = req.body.status;
    }
    if (req.body.notes !== undefined) {
      if (typeof req.body.notes !== "string" || req.body.notes.length > 5000) return res.status(400).json({ success: false, message: "Notes must be 5000 characters or fewer" });
      updates.notes = req.body.notes.trim();
    }
    if (req.body.assignedTo !== undefined) {
      if (typeof req.body.assignedTo !== "string" || req.body.assignedTo.length > 120) return res.status(400).json({ success: false, message: "Assignee must be 120 characters or fewer" });
      updates.assignedTo = req.body.assignedTo.trim();
    }
    if (!Object.keys(updates).length) return res.status(400).json({ success: false, message: "No supported lead fields provided" });
    const lead = await RoomLead.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });
    if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });
    return res.json({ success: true, data: lead });
  } catch (error) {
    if (error.name === "CastError") return res.status(400).json({ success: false, message: "Invalid lead ID" });
    console.error("Update Room Lead Error:", error.message);
    return res.status(500).json({ success: false, message: "Unable to update lead" });
  }
};
