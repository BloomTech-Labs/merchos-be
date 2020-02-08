const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const server = express();

const settings = [helmet(), cors(), morgan("dev"), express.json()];

server.use(settings);

server.get("/", (req,res) => {
  res.status(200).send({message: "Sever is Live"})
})

module.exports = server;