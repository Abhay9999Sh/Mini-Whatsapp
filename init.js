// to initialize database
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
 .then((res) => {console.log("connection successful")
  })
 .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakeWhatsapp');
};

let allChats = [
    {
    from: "neha pawar",
    to: "priya",       
    msg: "send me your exam sheets",
    created_at: new Date()
    },
    {
    from: "rahul",
    to: "Kunal",       
    msg: "How are you doing",
    created_at: new Date()
    },
    {
    from: "priyanka",
    to: "rahul",       
    msg: "go to hell",
    created_at: new Date()
    },
    {
    from: "mona",
    to: "lisa",       
    msg: "this is my painting",
    created_at: new Date()
    },
];

Chat.insertMany(allChats);

