import express from "express";
import Thread from "../models/Thread.js";
import getGeminiApiResponse from "../utils/openai.js";

const router = express.Router();

///test
router.post("/test", async (req,res)=>{
    try{
        const thread = new Thread({
            threadId: "xyz",
            title: "Testing New Thread"
        });

        const response = await thread.save();
        res.send(response);

    }catch(err){
        console.log(err);
        res.status(500).json({erro:"Failed to save in DB"});
    }
});


//get all the threads
router.get("/thread", async(req,res)=> {
    try{
        //descending order of the updatedAt ...most recent data will appear on top
        const threads = await Thread.find({}).sort({updatedAt: -1});
        res.json(threads);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to fetch threads"});
    }
});

router.get("/thread/:threadId", async(req,res)=>{
    const {threadId} = req.params;
    try{
        const thread = await Thread.findOne({threadId});
        if(!thread) {
           return res.status(404).json({
                error:"Thread not found"
            });
        }
        res.json(thread.messages);

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to fetch threads"});
    }
});

router.delete("/thread/:threadId", async (req,res) => {
    const {threadId} = req.params;

    try{
        const deleteThread = await Thread.findOneAndDelete({threadId});

        if(!deleteThread){
            res.status(404).json({error:"Thread are not found"});
        }
        
        res.status(200).json({success: "Thread deleted successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to fetch threads"});

    }
});


router.post("/chat", async(req,res)=>{

    console.log("Request body:", req.body);

    const {threadId, message} = req.body;

console.log("Received message:", message);
console.log("Received threadId:", threadId);
    
    if(!threadId || !message) {
       return res.status(400).json({error:"missing required fields"});
    }

    try{
        let thread = await Thread.findOne({threadId});
        if(!thread){
            //create a new thread in db
            thread = new Thread({
                threadId,
                title:message,
                messages:[{role: "user", content:message}]
            });
        }else{
            thread.messages.push({role:"user", content:message});
        }

        const assistantResponse = await getGeminiApiResponse(message);
      
        thread.messages.push({role:"assistant", content:assistantResponse});
        thread.updatedAt = new Date();
        
        await thread.save();
        res.json({reply:assistantResponse});

    }catch(err){
        console.log(err);
        res.status(500).json({error:" something went wrong or failed to process the request"})
    }
});

export default router;