const http = require('http').createServer();
const io = require('socket.io')(http);
const _ = require('lodash');

// const Loop = require('./loop.js');

const Server = require('./server/Server');
const server = new Server('0.0.0.0', 3000);

server.start();
