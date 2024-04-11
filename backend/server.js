import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from './routes/user.routes.js';

import connectToMongoDB from './db/connectToMongoDB.js'
import cookieParser from "cookie-parser";
import {app, server} from './socket/socket.js'
import path from 'path';

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); // Middleware for parsing JSON bodies
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, ()=>{ 
    connectToMongoDB();
    console.log(`Server listening at port ${PORT}`)
});