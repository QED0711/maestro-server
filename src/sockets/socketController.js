const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}
const socketController = {

    // SYNC
    handleSync: io => async data => {
        const { clientID } = data;
        for (let i = 0; i < 50; i++){
            await sleep(50);
            await io.emit(`sync-${clientID}`, {serverTime: Date.now()})
        }
        io.emit(`syncComplete-${clientID}`, {message: "sync complete"})
    },


    // CONDUCTOR SOCKETS
    handlePlayCue: io => async data => {
        let {sessionKey, cueSheet, cue, delay} = data;

        delay = delay || 10000; // default delay of 10 seconds

        io.emit(`execCue-${sessionKey}`, {cueSheet, cue, delay, time: Date.now()})

    },
    
    handleMetronome: io => async data => {
        let {sessionKey, bpm, subdivision, delay, numBeats} = data;

        delay = delay || 3000;
        const startTime = Date.now() + delay

        io.emit(`execMetronome-${sessionKey}`, {bpm, subdivision, startTime, numBeats})
    },




    handleCuePlayer: io => async data => {
        let {sessionKey, player} = data;
        io.emit(`execPlayerCue-${sessionKey}`, {player})
    },
    
    handleCuePlayerStop: io => async data => {
        let {sessionKey, player} = data;
        io.emit(`execPlayerCueStop-${sessionKey}`, {player})
    },



    handleStop: io => async data => {

        const {sessionKey} = data;
        io.emit(`execStop-${sessionKey}`, {message: "stop"})

    },








    handlePing: io => async data => {
        
        console.log(`new client connected: ${data.clientID}`)

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
            if(newTime - currentTime >= (60000 / 100)){
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