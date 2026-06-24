import RoomLead from "../Models/Lead.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createRoomLead = async (req, res) => {
  try {
    const { name, phone, location } = req.body;

    // Create the lead in the database
    const lead = await RoomLead.create({
      name,
      phone,
      location,
    });

    // Added londonrentalroom@gmail.com to the recipient list
    const recipients = `info@rentaroomlondon.co.uk, londonrentalroom@gmail.com`;

    const subject = "New Room Search Lead";
    
    const htmlContent = `
      <h3>New Lead Received</h3>
      <hr />
      <p><b>Name:</b> ${name}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Preferred Location:</b> ${location}</p>
      <p><b>Lead ID:</b> ${lead._id}</p>
    `;

    // Send the email to all three recipients
    await sendEmail(recipients, subject, htmlContent);

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