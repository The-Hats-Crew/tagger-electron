import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import messageRouter from "./messages/message-router";
import smtpRouter from "./smtp/smtp-router";


const server = express();

//ROUTERS
server.use("/emails", messageRouter);
server.use("/smtp", smtpRouter)
// server.use("/imap", imapRouter);

export default server;
