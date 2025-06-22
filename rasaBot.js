// rasaBot.js
const axios = require("axios");

async function getRasaResponse(message, senderId) {
  try {
    const res = await axios.post("http://localhost:5005/webhooks/rest/webhook", {
      sender: senderId,
      message: message,
    });

    if (res.data.length > 0 && res.data[0].text) {
      return res.data[0].text;
    } else {
      return "Sorry, I didn't understand that.";
    }
  } catch (error) {
    console.error("Rasa error:", error.message);
    return "Bot is currently unavailable.";
  }
}

module.exports = getRasaResponse;

