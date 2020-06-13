const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}
const socketController = {

    handlePing: io => async data => {
        let pingCount = 0;
        while(pingCount < 50){
            await sleep(50)
            await io.emit(`ping-${data.clientID}`, {serverTime: Date.now()})
            pingCount += 1;
        }

        io.emit(`sync-complete-${data.clientID}`, {message: "sync complete"})
    },

    handleMultiple: io => async data => {
        let count = 1;
        let currentTime = Date.now()
        let newTime;
        while (count <= 32) {
            newTime = Date.now()
            if(newTime - currentTime >= 500){
                console.log({newTime, currentTime})
                await io.emit("test", {count, time: newTime})
                currentTime = newTime
                count += 1
            } 
            await sleep(1);
        }

    },

    handleSingle: io => async data => {
        io.emit("test", { type: "downbeat" })
    },

    handleStartPerformance: io => data => {
        io.emit("play", {startTime: Date.now() + data.delay})
    }

}

export default socketController;