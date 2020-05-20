require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const messageRouter = require("./messages/message-router");
const smtpRouter = require("./smtp/smtp-router");
const imapRouter = require("./imap/imap-router");


const server = express();

//ROUTERS
server.use("/emails", messageRouter);
// server.use("/smtp", smtpRouter)
// server.use("/imap", imapRouter);

module.exports = server;
