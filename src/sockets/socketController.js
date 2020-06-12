const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}
const socketController = {

    handleComm: io => async data => {
        for(let i = 0; i < 32; i++){
            io.emit("test", {count: i})
            console.log(new Date().getTime())
            await sleep(500)
        }
    },

    handleSingle: io => async data => {
        io.emit("test", {type: "downbeat"})
    }

}

export default socketController;