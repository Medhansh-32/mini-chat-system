const mongoose= require("mongoose");
const Chat = require("./models/chat.js");
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
main().then(()=>{
    console.log("Connection Succesfull");
});
main().catch(err=>{
  console.log("Error :",err);  
});

let chats =[
    
    {
        from:"Riya",
        to:"priya",
        msg:"send me your notes",
        created_at:new Date()
    },
    {
        from: "Amit",
        to: "Rahul",
        msg: "Can you share the project files?",
        created_at: new Date()
    },
    {
        from: "Sneha",
        to: "Arjun",
        msg: "Did you complete the assignment?",
        created_at: new Date()
    },
    {
        from: "Neha",
        to: "Aisha",
        msg: "Let's meet for coffee",
        created_at: new Date()
    },
    {
        from: "Rohan",
        to: "Vikram",
        msg: "Can you review my code?",
        created_at: new Date()
    }
]
    
Chat.insertMany(chats);
    