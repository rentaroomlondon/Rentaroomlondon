import RoomLead from "../Models/Lead.js";
import { sendEmail } from "../utils/sendEmail.js";
import { isNameSafe } from "../utils/validateName.js";   // ← Import here

export const createRoomLead = async (req, res) => {
  try {
    const { name, phone, location, website } = req.body;

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