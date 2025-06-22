const mongoose = require("mongoose");
const { Schema } = mongoose; 

const MessageSchema = new Schema({
  sender: {
    type: String,
  },
  receiver: {
    type: String,
  },
  content: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
