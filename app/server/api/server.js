require("dotenv").config();
const express = require("express");
const authToken = require("./auth/auth-token")
const messageRouter = require("./messages/message-router");
const smtpRouter = require("./smtp/smtp-router");
const imapRouter = require("./imap/imap-router");


const server = express();

//ROUTERS
server.use("/emails", messageRouter);
server.use("/smtp", smtpRouter)
server.use("/token", authToken)
// server.use("/imap", imapRouter);

export default server;
