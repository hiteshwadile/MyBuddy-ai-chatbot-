import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Database Connected");
    } catch (err) {
        console.log("Failed to connect with DB", err);
        throw err;
    }
};

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Server startup failed:", err);
        process.exit(1);
    }
};

startServer();

// app.post("/test", async(req,res)=>{
//     const options = {
//       method:"POST",
//       headers:{
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//       },
//       body: JSON.stringify({
//             model:"gpt-4o-mini",
//             message:[{
//               role: "user",
//               content: "Hello!"
//              }]
//       })
//     }

//     try{
//      const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//      const data = await response.json();
//      console.log(data.choices[0].message.content);
//      res.send(data);
//     }catch(err){
//       console.log(err);
//     }
// })

