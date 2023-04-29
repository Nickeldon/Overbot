const { ApplicationCommandOptionType } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { lyricsExtractor } = require('@discord-player/extractor');
const {QueryType} = require('discord-player');

module.exports = {
    name: 'lyrics',
    description: 'display the lyrics of your track',
    voiceChannel: true,
    options: [
        {
            name: 'track',
            description: 'choose the song of which you want to import the lyrics',
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: [
                {name: 'this one!', value: 'this-song_chosen'},
                {name: 'another one!', value: 'custom-song_chosen'},
            ]
        },
        {
        name: 'custom_song',
        description: 'enter the name of your song (use only if another song was chosen)',
        required: false,
        type: ApplicationCommandOptionType.String,
        }
    ],

    async execute( { inter } ) {
        const queue = player.nodes.get(inter.guildId);
        const lyricsFinder = lyricsExtractor('hmN8DoAI-GFp7RJ8tkvX0bGHt9q05-9R5Zj5p1UQevEdA0PB_TZfG6lAwBliglKY');
        const song = inter.options.getString('customsong');
        const choice = inter.options.getString('track')
            var trackchosen;
                switch(choice){
                    case 'this-song_chosen': {
                        console.log('this');
                        trackchosen = queue.currentTrack
                    if(song){
                        await inter.reply('Illegal statement (You cannot overwrite the song constant)');
                    }}
                    case 'custom-song_chosen': {
                      if(!song){
                        await inter.reply('Invalid song name');
                      }  
                      else trackchosen = song
                      
                      console.log('another');
            }}
            console.log(trackchosen)
            const lyrics = await lyricsFinder.search(trackchosen).catch(() => null);
        if (!lyrics) return await inter.followUp({ content: 'No lyrics found', ephemeral: true });
        const trimmedLyrics = lyrics.lyrics.substring(0, 1997);
        const embed = new EmbedBuilder()
    .setTitle(lyrics.title)
    .setURL(lyrics.url)
    .setThumbnail(lyrics.thumbnail)
    .setAuthor({
        name: lyrics.artist.name,
        iconURL: lyrics.artist.image,
        url: lyrics.artist.url
    })
    .setDescription(trimmedLyrics.length === 1997 ? `${trimmedLyrics}...` : trimmedLyrics)
    .setColor('Yellow');
    return await inter.reply({ embeds: [embed] }); 
} }

