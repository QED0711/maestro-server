const sockets = io => {

    io.on('connection', function(socket){
        console.log("SOMEONE CONNECTED TO THE SOCKET SERVER")
        
        io.emit("test", {message: "here is a test message"})
        
        
        socket.on("comm", data => {
            console.log(data)
        })
    })


}

export default sockets;