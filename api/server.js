const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const server = express();

const setting = [helmet(), cors(), morgan("dev"), express.json()];
const userRouter = require("../auth/userRoutes");

server.use(setting);
server.use(express.json());
server.use("/user", userRouter);

server.get("/", (req, res) => {
  res.status(200).send({ message: "Sever is Live" });
});

module.exports = server;
