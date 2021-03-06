'use strict'

import express from 'express';
import http from 'http';
import socketIO from 'socket.io'
import sockets from './sockets/sockets'


// ========================== INITIALIZATION ==========================
const app = express();
const server = http.Server(app);
const io = socketIO(server, {pingInterval: 2000})
sockets(io)


server.listen(process.env.PORT || 5000, () => {
    console.log("Server listening on port 5000\nhttp://localhost:5000/")
})

