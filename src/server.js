'use strict'

import express from 'express';
import http from 'http';
import socketIO from 'socket.io'
import sockets from './sockets'


// ========================== INITIALIZATION ==========================
const app = express();
const server = http.Server(app);
const io = socketIO(server)
sockets(io)




app.get("/", function(req,res){
    res.send("Hello World")
})

server.listen(process.env.PORT || 5000, () => {
    console.log("Server listening on port 5000\nhttp://localhost:5000/")
})

