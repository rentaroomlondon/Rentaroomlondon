import Enquiry from "../Models/Enquiry.js";          // adjust path/name if different
import { sendEmail } from "../utils/sendEmail.js";
import { validate } from "deep-email-validator";

// ---------- Helpers (same as contact) ----------
const isValidName = (name) => {
  if (!name || typeof name !== "string") return false;
  const cleaned = name.trim();
  if (!/^[a-zA-Z\s'-]{2,40}$/.test(cleaned)) return false;
  if (!/[aeiouAEIOU]/.test(cleaned)) return false;
  if (/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]{5,}/.test(cleaned)) return false;
  if (cleaned.length < 3) return false;
  return true;
};

const isValidPhone = (phone) => {
  if (!phone || typeof phone !== "string") return false;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
};

const isSpammyEmail = (email) => {
  if (!email) return true;
  const local = email.split("@")[0] || "";
  const dotCount = (local.match(/\./g) || []).length;
  if (dotCount >= 3) return true;
  if (local.includes("..") || local.startsWith(".") || local.endsWith(".")) return true;
  if (local.length < 3) return true;
  return false;
};

export const submitEnquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      moveIn,
      area,
      lengthOfStay,
      budget,
      selectedLocationId,
      website,        // honeypot
    } = req.body;

    // ========== 1. HONEYPOT ==========
    if (website && website.trim() !== "") {
      return res.status(201).json({
        success: true,
        message: "Enquiry submitted successfully",
      });
    }

    // ========== 2. BASIC + STRONG VALIDATION ==========
    const errors = [];

    if (!isValidName(name)) {
      errors.push("Please enter a valid name");
    }

    if (!isValidPhone(phone)) {
      errors.push("Please enter a valid phone number (at least 10 digits)");
    }

    if (isSpammyEmail(email?.trim().toLowerCase())) {
      errors.push("Please enter a valid email address");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors[0],
      });
    }

    // ========== 3. STRONG EMAIL VALIDATION ==========
    const emailResult = await validate({
      email: email?.trim().toLowerCase(),
      validateRegex: true,
      validateMx: true,
      validateTypo: true,
      validateDisposable: true,
      validateSMTP: false,
    });

    if (!emailResult.valid) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // ========== 4. SAVE TO DB ==========
    const enquiry = await Enquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      moveIn,
      area,
      lengthOfStay,
      budget,
      selectedLocationId: selectedLocationId || null,
    });

    // =========================
    // 📧 ADMIN EMAIL
    // =========================
    const adminHtml = `
    <div style="font-family:Arial;background:#f5f5f5;padding:40px">
      <div style="max-width:800px;margin:auto;background:white;border-radius:10px;overflow:hidden">

        <div style="background:#FF6B35;padding:10px;text-align:center;color:white">
          <h1>📩 New Room Enquiry</h1>
        </div>

        <div style="padding:30px">

          <p>Hello Admin,</p>

          <p>You have received a new room enquiry from your website.</p>

          <hr/>

          <h3 style="color:#FF6B35">👤 Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>

          <hr/>

          <h3 style="color:#FF6B35">🏠 Enquiry Details</h3>
          <p><strong>Preferred Area:</strong> ${area}</p>
          <p><strong>Move-in Time:</strong> ${moveIn}</p>
          <p><strong>Length of Stay:</strong> ${lengthOfStay}</p>
          <p><strong>Monthly Budget:</strong> £${budget}</p>
          ${selectedLocationId ? `<p><strong>Selected Location ID:</strong> ${selectedLocationId}</p>` : ""}

          <hr/>

          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Status:</strong> New Lead</p>

          <hr/>

          <p>⚡ Please respond to this lead as soon as possible.</p>

          <p style="margin-top:30px">
            Regards,<br/>
            <strong>RENTAROOMLONDON System</strong>
          </p>

        </div>
      </div>
    </div>
    `;

    try {
      await sendEmail(
        "londonrentalroom@gmail.com",
        "📩 New Contact Inquiry",
        adminHtml
      );

      console.log("✅ Admin email sent to: londonrentalroom@gmail.com");
    } catch (error) {
      console.error(
        "❌ Admin email failed: londonrentalroom@gmail.com",
        error.message
      );
    }

    // =========================
    // 📧 ADMIN EMAIL #2
    // =========================

    try {
      await sendEmail(
        "info@rentaroomlondon.co.uk",
        "📩 New Contact Inquiry",
        adminHtml
      );

      console.log("✅ Admin email sent to: info@rentaroomlondon.co.uk");
    } catch (error) {
      console.error(
        "❌ Admin email failed: info@rentaroomlondon.co.uk",
        error.message
      );
    }

    // =========================
    // 📧 USER EMAIL
    // =========================
    const userHtml = `
    <div style="font-family:Arial;background:#f5f5f5;padding:40px">
      <div style="max-width:800px;margin:auto;background:white;border-radius:10px;overflow:hidden">

        <div style="background:#1a2332;padding:10px;text-align:center;color:white">
          <h1>We Received Your Enquiry</h1>
        </div>

        <div style="padding:30px">

          <p>Hello ${name},</p>

          <p>Thank you for submitting an enquiry with <strong>Rent a Room London</strong>.</p>
          <p>We will get back to you shortly with available rooms that match your requirements.</p>

          <hr/>

          <h3 style="color:#FF6B35">📋 Your Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Preferred Area:</strong> ${area}</p>
          <p><strong>Move-in:</strong> ${moveIn}</p>
          <p><strong>Length of Stay:</strong> ${lengthOfStay}</p>
          <p><strong>Budget:</strong> £${budget}</p>

          <hr/>

          <p>We typically respond within 24 hours.</p>

          <p style="margin-top:30px">
            Regards,<br/>
            <strong>Rent a Room London Team</strong>
          </p>

        </div>
      </div>
    </div>
    `;

    try {
      await sendEmail(
        email,
        "We Received Your Message",
        userHtml
      );

      console.log(`✅ Customer email sent to: ${email}`);
    } catch (error) {
      console.error(
        `❌ Customer email failed: ${email}`,
        error.message
      );
    }

    // =========================

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry,
    });
  } catch (error) {
    console.error("Enquiry Error:", error);

    // Handle Mongoose validation errors nicely
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};