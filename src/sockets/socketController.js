const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}
const socketController = {

    handlePing: io => async data => {
        io.emit(`time-pong-${data.clientID}`, { time: Date.now() })
    },

    // SYNC
    handleSync: io => async data => {
        const { clientID } = data;
        for (let i = 0; i < 50; i++) {
            await sleep(50);
            await io.emit(`sync-${clientID}`, { serverTime: Date.now() })
        }
        io.emit(`syncComplete-${clientID}`, { message: "sync complete" })
    },


    handlePingPlayer: io => async data => {

        const { player, sessionKey } = data
        io.emit(`execPingPlayer-${sessionKey}`, { player, time: Date.now() })

    },

    handleReportPlayerPing: io => data => {
        const { player, sessionKey } = data
        io.emit(`execReportPlayerPing-${sessionKey}`, {
            player,
            delay: data.timeReceived - data.timeSent,
            roundtrip: Date.now() - data.timeSent,
            latencyPings: data.latencyPings
        })
    },

    handleResetPlayer: io => data => {
        io.emit(`execResetPlayer-${data.sessionKey}`, {player: data.player})
    },


    // CONDUCTOR SOCKETS
    handlePlayCue: io => async data => {
        let { sessionKey, cueSheet, cue, delay, delayAdjustments, startMeasure, repeatStart, tempoShift } = data;
        delay = delay || 5000; // default delay of 5 seconds

        io.emit(`execCue-${sessionKey}`, {
            cueSheet, // this is hardcoded on the front end for now
            cue,
            delay,
            delayAdjustments,
            startMeasure,
            repeatStart,
            tempoShift,
            time: Date.now()
        })

    },

    handleMetronome: io => async data => {
        let { sessionKey, bpm, subdivision, delay, numBeats } = data;

        delay = delay || 3000;
        const startTime = Date.now() + delay

        io.emit(`execMetronome-${sessionKey}`, { bpm, subdivision, startTime, numBeats })
    },




    handleCuePlayer: io => async data => {
        let { sessionKey, player } = data;
        io.emit(`execPlayerCue-${sessionKey}`, { player })
    },

    handleCuePlayerStop: io => async data => {
        let { sessionKey, player } = data;
        io.emit(`execPlayerCueStop-${sessionKey}`, { player })
    },



    handleStop: io => async data => {

        const { sessionKey } = data;
        io.emit(`execStop-${sessionKey}`, { message: "stop" })

    },








    // handlePing: io => async data => {

    //     console.log(`new client connected: ${data.clientID}`)

    //     let pingCount = 0;

    //     while(pingCount < 50){
    //         await sleep(50)
    //         await io.emit(`ping-${data.clientID}`, {serverTime: Date.now()})
    //         pingCount += 1;
    //     }

    //     io.emit(`sync-complete-${data.clientID}`, {message: "sync complete"})
    // },

    handleMultiple: io => async data => {
        let count = 1;
        let currentTime = Date.now()
        let newTime;
        while (count <= 32) {
            newTime = Date.now()
            if (newTime - currentTime >= (60000 / 100)) {
                console.log({ newTime, currentTime })
                await io.emit("test", { count, time: newTime })
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
        io.emit("play", { startTime: Date.now() + data.delay })
    }

}

export default socketController;