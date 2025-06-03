import express from "express";
import {createServer} from "node:http";

import {Server} from "socket.io";

import mongoose from "mongoose";
import {connectToSocket} from "./controllers/socketManager.js";

import cors from "cors";

const app= express();
const server = createServer(app);
const io= connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit:"40Kb"}));
app.use(express.urlencoded({limit:"40Kb", extended:true}));

const start = async()=>{
    const connectionDb = await mongoose.connect("mongodb+srv://rachitgandhi138:R301118G@cluster0.wf0daln.mongodb.net/")
    console.log(`Mongo connected DB HOST :${connectionDb.connection.host}`);
    server.listen(app.get("port"),()=>{
        console.log("Listening on port 8000");
    });
}

start();

