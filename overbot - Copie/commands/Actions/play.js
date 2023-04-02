const { QueryType } = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');
const fs = require('fs');
module.exports = {
    name: 'play',
    description: "play a song!",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the song you want to play',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter, client }) {
	    await inter.deferReply();
        const song = inter.options.getString('song');
        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });
const oldstate = inter.channelId;
const timestamp = new Date().toISOString();
const userrequest = inter.user.username;
        if(song){
            const musiclog = `MUSIC_ENGINE --> ${timestamp} - loading requested media content : ${song} by ${userrequest}; server: ${oldstate}`;
            fs.appendFileSync('C:/Users/nicke/Downloads/Overbot/overbot/serverlogs.txt', musiclog + '\n \n');
        }

        if (!res || !res.tracks.length) return inter.editReply({ content: `No results found ${inter.member}... try again ? ❌`, ephemeral: true });

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
            await player.deleteQueue(inter.guildId);
            return inter.reply({ content: `I can't join the voice channel ${inter.member}... try again ? ❌`, ephemeral: true});}

       await inter.editReply({ content:`Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧`});

       res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);
try{
       if (!queue.isPlaying()) await queue.node.play();
   }
   catch{
    await inter.reply({content: "Miswritten or Unavailable media URL", ephemeral: true});
   }    
    },
};
