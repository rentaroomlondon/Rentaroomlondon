import Enquiry from "../Models/Enquiry.js";
import { sendEmail } from "../utils/sendEmail.js";

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
    } = req.body;

    // ✅ Validation
    if (!name || !email || !phone || !moveIn || !area || !lengthOfStay || !budget) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // ✅ Save to DB
    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
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

    await sendEmail(
      "info@rentaroomlondon.co.uk",
      "📩 New Room Enquiry",
      adminHtml
    );

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

    await sendEmail(
      email,
      "We Received Your Enquiry – Rent a Room London",
      userHtml
    );

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