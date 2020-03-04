const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const cookieParser = require('cookie-parser');

const server = express();

// middleware
const setting = [
  helmet(),
  cors({
    origin: [`${process.env.FRONTEND_URL}`],
    credentials: true
  }),
  morgan('dev'),
  express.json(),
  cookieParser()
];
server.use(setting);
server.use(logger);

// ROUTES
server.use('/user', require('../routes/userRoutes'));
server.use('/store', require('../routes/storeRouter'));
server.use('/page', require('../routes/pageRouter'));

// Main route
server.get('/', (req, res) => {
  res.status(200).send({ message: 'Sever is Live' });
});

module.exports = server;
