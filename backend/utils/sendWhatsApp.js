import twilio from "twilio";

// 🔥 Hard-coded credentials
const TWILIO_SID = "AC0cde376b60be6e7cdf36c4cdb5ccc0a9";
const TWILIO_AUTH_TOKEN = "cec656fb70a0a02730d1cf1aabca1c2e";
const TWILIO_WHATSAPP_NUMBER = "whatsapp:+14155238886";

console.log("🔍 TWILIO DEBUG START");
console.log("SID:", TWILIO_SID);
console.log("TOKEN:", TWILIO_AUTH_TOKEN);
console.log("FROM:", TWILIO_WHATSAPP_NUMBER);

const client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

export const sendWhatsApp = async (to, message) => {
  try {
    console.log("📤 Sending WhatsApp...");
    console.log("TO:", to);
    console.log("MESSAGE:", message);

    const response = await client.messages.create({
      from: TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${to}`,
      body: message,
    });

    console.log("✅ WhatsApp Sent:", response.sid);

  } catch (error) {
    console.error("❌ WhatsApp Error FULL:", error);
    console.error("❌ WhatsApp Error MSG:", error.message);
  }
};