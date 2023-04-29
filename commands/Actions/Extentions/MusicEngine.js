const { QueryType } = require('discord-player');
module.exports = async function play(inter, client, link){
        const song = link
        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });
        if (!res || !res.tracks.length) return console.log('Not-existent or private protected')
        const queue = player.nodes.create(inter.guild, {
            metadata: {
                channel: inter.channel,
                client: inter.guild.members.me,
                requestedBy: inter.user,
            },
            spotifyBridge: client.config.opt.spotifyBridge,
            initialVolume: client.config.opt.defaultvolume,
            leaveOnEnd: client.config.opt.leaveOnEnd,
            autoSelfDeaf: client.config.opt.autoSelfDeaf,
            leaveOnEmpty: client.config.opt.leaveOnEmpty,
            leaveOnStop: client.config.opt.leaveOnStop
        });

        try {
            if (!queue.connection) await queue.connect(inter.member.voice.channel);
            if (!queue.connection) {
                if(client.config.opt.fixedChannel) {
                    await queue.connect(client.config.opt.fixedChannel); // Connect to fixed channel if set.
                } else {
                    await queue.connect(inter.member.voice.channel);
                }
            } 
        } catch {
            await player.deleteQueue(inter.guildId);}
   
         res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);
       if (!queue.isPlaying()) await queue.node.play();
}