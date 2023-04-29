const ytdl = require('ytdl-core');
const fs = require('fs');

module.exports = {
    name: 'saveit',
    description: 'Save the current track in your local hard drive!',
    voiceChannel : true,
    async execute ({ inter }){
        const queue = player.nodes.get(inter.guildId);
        console.log(queue)
    const currentTrack = queue.songs[0];

    const audioStream = await ytdl(currentTrack.url, { filter: 'audioonly' });
    const filename = `${currentTrack.title}.mp3`;

    const file = fs.createWriteStream(filename);
    audioStream.pipe(file);

    const fileBuffer = fs.readFileSync(filename);

    //Make the bot send a message with a file attachement
    }
}