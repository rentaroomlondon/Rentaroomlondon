import RoomLead from "../Models/Lead.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createRoomLead = async (req, res) => {
  try {
    const { name, phone, location, website } = req.body;

    // Honeypot check – if filled, treat as bot and silently succeed
    if (website) {
      return res.status(201).json({
        success: true,
        message: "Lead submitted successfully",
      });
    }

    // Create the lead in the database
    const lead = await RoomLead.create({
      name,
      phone,
      location,
    });

    const subject = "New Room Search Lead";

    const htmlContent = `
      <h3>New Lead Received</h3>
      <hr />
      <p><b>Name:</b> ${name}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Preferred Location:</b> ${location}</p>
      <p><b>Lead ID:</b> ${lead._id}</p>
    `;

    // ============================
    // 📧 EMAIL → INFO
    // ============================
    try {
      await sendEmail(
        "info@rentaroomlondon.co.uk",
        subject,
        htmlContent
      );

      console.log(
        "✅ Room Lead email sent to: info@rentaroomlondon.co.uk"
      );
    } catch (emailError) {
      console.error(
        "❌ Room Lead email failed: info@rentaroomlondon.co.uk",
        emailError.message
      );
    }

    // ============================
    // 📧 EMAIL → GMAIL
    // ============================
    try {
      await sendEmail(
        "londonrentalroom@gmail.com",
        subject,
        htmlContent
      );

      console.log(
        "✅ Room Lead email sent to: londonrentalroom@gmail.com"
      );
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