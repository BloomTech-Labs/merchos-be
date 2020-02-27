const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./middleware/logger');

const server = express();

// middleware
const setting = [helmet(), cors(), morgan('dev'), express.json()];
server.use(setting);
server.use(logger);

// ROUTES
const userRouter = require('../routes/userRoutes');
server.use('/user', userRouter);

const storeRouter = require('../routes/storeRouter');
server.use('/store', storeRouter);

server.get('/', (req, res) => {
  res.status(200).send({ message: 'Sever is Live' });
});

module.exports = server;
