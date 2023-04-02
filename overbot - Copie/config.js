module.exports = {
    app: {
        token: 'MTA3MzMzMjUzODc1MzQxNzQxOA.GEnOYN.6hQga9gtlYHHGpOr5dE64kbNibPYaWXkCqxwO0',
        playing: 'shinu',
        global: true,
        guild: 'XXX'
    },

    opt: {
        DJ: {
            enabled: true,
            roleName: 'geass',
            commands: []
        },
        maxVol: 100,
        leaveOnEnd: true,
        leaveOnEmpty: true,
        leaveOnStop: true,
        autoSelfDeaf: true,
        fixedChannel: '',
        loopMessage: false,
        spotifyBridge: true,
        defaultvolume: 75,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
