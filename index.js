const express = require("express");
const mongoose= require("mongoose");
const path=require("path");
const app=express();
const Chat = require("./models/chat.js");
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
const port=8080;
const methodOverride = require("method-override");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
main().then(()=>{
    console.log("Connection Succesfull");
});
main().catch(err=>{
  console.log("Error :",err);  
});

app.get("/",(req,res)=>{
    console.log("root is working");
})

// let chat1 = new Chat({
// from:"Riya",
// to:"priya",
// msg:"send me your notes",
// created_at:new Date()

// });
// chat1.save().then((result)=>{
//     console.log(result);
// });

//index route
app.get("/chats",async (req,res)=>{
    await Chat.find().then(result=>{
      
        res.render("index.ejs",{result});
    })
})

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})
//create route
app.post("/chats",(req,res)=>{
    let {to:to,from:from,msg:msg}=req.body;

    let chat1 = new Chat({to:to,
        from:from,
        msg:msg,
        created_at:new Date()
    })
    chat1.save().then(result=>{
        console.log("Chat Saved..",result);
        res.redirect("/chats");
    }).catch(err=>{
        console.log("Error in DB");
    })

});

app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let edit_chat= await Chat.findById(id);
    res.render("edit.ejs",{edit_chat});
})
//update route

app.patch("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {new_msg:new_msg}=req.body;
    let updated_chat= await Chat.findByIdAndUpdate(id,{msg:new_msg},
        {runValidators:true},
        {new:true});
    console.log(updated_chat);
    res.redirect("/chats");
});

//delete chat

app.delete("/chats/:id",async (req,res)=>{

    let {id}= req.params;
    let del = await Chat.findByIdAndDelete(id);
    console.log("chat deleted :",del);
    res.redirect("/chats");
});
app.listen(port,()=>{
    console.log("Server Started ....");
});