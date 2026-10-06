import RoomLead from "../Models/Lead.js";
import { sendEmail } from "../utils/sendEmail.js";
import { isNameSafe } from "../utils/validateName.js";   // ← Import here

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
    const leads = await RoomLead.find()
      .sort({ createdAt: -1 });

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
