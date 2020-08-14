
import socketController from './socketController'


const sockets = io => {

    io.on('connection', socket => {
        
        // console.log("NEW CONNECTION")
        
        // RECEIVING

        // SYNC
        socket.on("client-ping", socketController.handlePing(io))
        socket.on("sync", socketController.handleSync(io))
        socket.on("ping_player", socketController.handlePingPlayer(io))
        socket.on("report_player_ping_received", socketController.handleReportPlayerPing(io))

        // CONDUCTOR
        socket.on("playCue", socketController.handlePlayCue(io))
        socket.on("metronome", socketController.handleMetronome(io))
        socket.on("stop", socketController.handleStop(io))

        socket.on("cue_player", socketController.handleCuePlayer(io))
        socket.on("cue_player_stop", socketController.handleCuePlayerStop(io))

        // socket.on("clientPing", socketController.handlePing(io))


        socket.on("multiple", socketController.handleMultiple(io))
        socket.on("single", socketController.handleSingle(io))
        socket.on("start-performance", socketController.handleStartPerformance(io))



    })


}

export default sockets;