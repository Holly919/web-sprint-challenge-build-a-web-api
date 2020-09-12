const express = require("express");
const projectRoute = require('./routers/projectRoute');
const actionRoute = require('./routers/actionRoute');

const server = express();


server.use(express.json());
server.use('/api/projects', projectRoute);
server.use('/api/actions', actionRoute);

server.get('/', (req, res) => {
    res.status(200).json({message: "The server is online!"});
  });

module.exports = server;