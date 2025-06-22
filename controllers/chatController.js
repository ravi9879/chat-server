const { OpenAI } = require("openai"); 

const openai = new OpenAI({
  apiKey:
    "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",
});

const Message = require("../models/Message");

// io.on("connection", 
    

const func = (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("sendMessage", async ({ sender, receiver, content }) => {
    const message = new Message({ sender, receiver, content });
    await message.save();
    // const recieve = await Message.find({sender : sender}) ;
    const recieve = await Message.find({}) ;
    // console.log(recieve) ;
    socket.emit("receiveMessage", recieve);
    // console.log("ravi") ;
    // io.emit("receiveMessage", message);

    // If chatbot, respond with GPT
    // const botUser = await User.findOne({ isBot: true });
    // // if (receiver === botUser._id.toString()) {
    if (receiver === "bot_id_here") {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [{ role: "user", content: content }],
      });

      // console.log(completion.choices[0].message);

      const botMessage = new Message({
        sender: "ravi",
        receiver: sender,
        content: completion.choices[0].message.content,
      });
      await botMessage.save();
      const botRecieve = await Message.find({}) ;
      // console.log(botRecieve) ;
      // io.emit("receiveMessage", completion.choices[0].message);
      socket.emit("receiveMessage", botRecieve);
    }
  });
}; 

module.exports = func ;