
import socketController from './socketController'


const sockets = io => {

    io.on('connection', socket => {
        
        // console.log("NEW CONNECTION")
        
        // RECEIVING

        // SYNC
        socket.on("sync", socketController.handleSync(io))

        // CONDUCTOR
        socket.on("playCue", socketController.handlePlayCue(io))
        socket.on("metronome", socketController.handleMetronome(io))
        socket.on("stop", socketController.handleStop(io))

        socket.on("clientPing", socketController.handlePing(io))


        socket.on("multiple", socketController.handleMultiple(io))
        socket.on("single", socketController.handleSingle(io))
        socket.on("start-performance", socketController.handleStartPerformance(io))



    })


}

export default sockets;