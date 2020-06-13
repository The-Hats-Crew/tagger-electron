import express from "express";
import authToken from "./auth/auth-token";
import messageRouter from "./messages/message-router";
import smtpRouter from "./smtp/smtp-router";
import imapRouter from "./imap/imap-router";


const server = express();

//ROUTERS
server.use("/emails", messageRouter);
server.use("/smtp", smtpRouter)
server.use("/token", authToken)
// server.use("/imap", imapRouter);

export default server;
