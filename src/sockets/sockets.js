
import socketController from './socketController'


const sockets = io => {

    io.on('connection', socket => {
        
        // console.log("SOMEONE CONNECTED TO THE SOCKET SERVER")
        
        // RECEIVING
        socket.on("comm", socketController.handleComm(io))
        socket.on("single", socketController.handleSingle(io))




    })


}

export default sockets;