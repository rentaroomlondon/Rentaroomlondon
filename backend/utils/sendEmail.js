import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html, cc = []) => {

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, // true for 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

await transporter.sendMail({
  from: `"RENTAROOMLONDON" <${process.env.EMAIL_USER}>`,
  to,
  subject,
  html,
  ...(cc.length && { cc })
});
};
