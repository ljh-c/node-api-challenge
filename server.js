const express = require('express');

const server = express();

const projectsRouter = require('./routers/projectsRouter');
const actionsRouter = require('./routers/actionsRouter');

server.use(express.json());

// logger middleware

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl}`);
  next();
}

server.get('/', (req, res) => {
  res.send(`<h1>Don't Worry Be Happy</h1>`);
});

server.use('/api/projects', logger, projectsRouter);
server.use('/api/actions', logger, actionsRouter);

module.exports = server;