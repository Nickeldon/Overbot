module.exports = {
    name: 'resume',
    description: 'play the track',
    voiceChannel: true,

    execute({ inter }) { 
        const queue = player.nodes.get(inter.guildId);

        if (!queue) return inter.reply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });
        

        if(!queue.connection.paused) return inter.reply({content: `The track is already running, ${inter.member}... try again ? ❌`, ephemeral: true})

        const success = queue.node.resume();
        
        return inter.reply({ content:success ? `Current music ${queue.currentTrack} resumed ✅` : `Something went wrong ${inter.member}... try again ? ❌`});
    },
};
