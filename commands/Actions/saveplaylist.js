const { ApplicationCommandOptionType } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'saveplaylist',
    description: 'Save your own playlist in the music engine',
    options: [
        {
            name: 'link',
            description: 'Enter your playlist link (Youtube will work better)',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'name',
            description: 'Enter a name for your playlist',
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],
    async execute ({ inter }){
        const listlink = inter.options.getString('link');
        const playlistName = inter.options.getString('name');
        const user = inter.user.id;
        var directory = fs.readFileSync('C:/Users/nicke/Downloads/Overbot/overbot/Playlistsaved.json')
        var target = JSON.parse(directory);
        
        if (!target.user[user] || !target.user[user].playlists) {
            target.user[user] = {
                playlists: [{
                    name: playlistName,
                    links: [listlink]
                }]
            };
        } else {
            const playlists = target.user[user].playlists;
            const playlist = playlists.find((playlist) => playlist.name === playlistName);

            if (!playlist) {
                playlists.push({
                    name: playlistName,
                    links: [listlink]
                });
            } else {
                playlist.links.push(listlink);
            }
        }
        
        const playlistCount = target.user[user].playlists.length;
        await inter.reply(`Votre liste de lecture "${playlistName}" a été enregistrée convenablement dans la bibliothèque. Vous avez enregistré ${playlistCount} listes de lecture différentes.`);
        fs.writeFileSync('C:/Users/nicke/Downloads/Overbot/overbot/Playlistsaved.json', JSON.stringify(target, null, 2));
        
    }
};
