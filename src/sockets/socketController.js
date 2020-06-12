const socketController = {

    handleComm: io => data => {
        io.emit("test", {message: "here is a test message"})
        console.log(data)
    }

}

export default socketController;