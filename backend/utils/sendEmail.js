import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html, cc = []) => {
 const transporter = nodemailer.createTransport({
 host: "smtp.hostinger.com",
 port: 465,
 secure: true,
 auth: {
 user: process.env.EMAIL_USER,
 pass: process.env.EMAIL_PASS,
 },
 connectionTimeout: 15000,
 greetingTimeout: 15000,
 socketTimeout: 20000,
 tls: {
 minVersion: "TLSv1.2",
 },
 });

 await transporter.verify();

 return transporter.sendMail({
 from: `"RENTAROOMLONDON" <${process.env.EMAIL_USER}>`,
 to,
 subject,
 html,
 ...(cc.length ? { cc } : {}),
 });
};
