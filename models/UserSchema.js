const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({ 
  email: {
    type: String,
    required : true ,
    unique : true
  },
  password: {
    type: String,
    required : true 
  },

  isBot: {
    type: String,
    required : true 
  },
});
module.exports = mongoose.model("UserSchema", UserSchema);
