// const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");

dotenv.config();
const apiKey= process.env.OPENAI_API_KEY


const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");
const dy = require("body-parser");
const { OpenAI } = require("openai");
const mconnect = require("./db");
 
const Message = require("./models/Message");
const func = require("./controllers/chatController");
const { signUp, login } = require("./controllers/userController");

mconnect();

dotenv.config();
const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "http://localhost:3000",
    preflightContinue: true,
    methods: ["POST", "GET"],
    credentials: true,
  })
);


app.use(dy.json());
app.use(dy.urlencoded({ extended: true }));

const io = socketIO(server, {
  cors: { origin: "*" },
}); 
 


// Socket IO Logic


io.on("connection" , func) ;

app.get("/", (req, res) => {
 console.log("apikey" ,apiKey) ;
  res.send("hello" ,apiKey);
});

app.get("/messages", async (req, res) => {
  const messages = await Message.find().sort({ timestamp: 1 });
  res.send(messages);
});

app.post("/clear-chat", async (req, res) => {
  try {
    const user_id = req.body.user_id; 
    await Message.deleteMany({sender : user_id});  
    await Message.deleteMany({receiver : user_id}) ;    
    res.send({ message: "Chat cleared" }) ;  
  } catch (error) {
    res.send(error);     
  }
  
})

app.post("/signUp" , signUp) ;
app.post("/login" , login) ;

server.listen(5000, () => {
  console.log("Server started on port 5000");
});









 
