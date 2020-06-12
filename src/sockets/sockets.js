
import socketController from './socketController'


const sockets = io => {

    io.on('connection', socket => {
        console.log("SOMEONE CONNECTED TO THE SOCKET SERVER")
        
        socket.on("comm", socketController.handleComm(io))
    })


}

export default sockets;