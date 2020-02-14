const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./middleware/logger")

const server = express();

const setting = [helmet(), cors(), morgan("dev"), express.json()];

// middleware
server.use(setting);
server.use(express.json());
server.use(logger);

// ROUTES
const userRouter = require("../auth/userRoutes");
server.use("/user", userRouter);

server.get("/", (req, res) => {
  res.status(200).send({ message: "Sever is Live" });
});

module.exports = server;
