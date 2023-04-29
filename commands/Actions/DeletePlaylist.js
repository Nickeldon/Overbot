const fs = require('fs');
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
module.exports = {
    name: 'delist',
    description: 'Delete one of your saved playlists',
    
async execute({ inter }){
    await inter.deferReply();
const user = inter.user.id;
var directory = fs.readFileSync('C:/Users/nicke/Downloads/Overbot/overbot/Playlistsaved.json', 'utf-8')
var target = JSON.parse(directory, (k, v) => Array.isArray(v) ? v.filter(e => e !== null) : v);

if (!target.user[user] || !target.user[user].playlists) {
    inter.editReply({content: 'You do not have any playlist saved, try saving one by using the /saveplaylist command', ephemeral: true});
} else {
    console.log(target.user[user].playlists)
    const links = target.user[user].playlists;
    console.log(links)
    const linkCount = Object.keys(links).length;
    let link;
    console.log(linkCount)
    if (!target.user[user] || !target.user[user].playlists) {
        inter.editReply({content: 'You do not have any playlist saved, try saving one by using the /saveplaylist command', ephemeral: true});
    } else {
        console.log(target.user[user].playlists)
        const links = target.user[user].playlists;
        console.log(links)
        const linkCount = Object.keys(links).length;
        let link;
        console.log(linkCount)
        if(linkCount  === 1){ 
            link = target.user[user].playlists;
            if(link){
                delete target.user[user].playlists;;
                await inter.editReply('Votre seul lien à été supprimé avec succès');
            }
            else{
                await inter.editReply('Aucun lien sélectionné.');
            }
            fs.writeFileSync('C:/Users/nicke/Downloads/Overbot/overbot/Playlistsaved.json', JSON.stringify(target, null,  2))
        }
        else {
            if(linkCount > 1) {
            const embed = new EmbedBuilder()
                .setColor('DarkRed')
                .setTitle('Ehhhh, je supprime lequel?')
                .setDescription('Choisissez le lien que vous souhaitez supprimer');

            const components = [];

            for (let i = 0; i < linkCount; i++) {
                const playlist = links[i];
                const button = new ButtonBuilder()
                    .setCustomId(String(i))
                    .setLabel(playlist.name)
                    .setStyle(ButtonStyle.Secondary);
            
                const row = new ActionRowBuilder()
                    .addComponents(button);
            
                components.push(row);
            }
            

            await inter.editReply({ embeds: [embed], components: components});
            const collector = inter.channel.createMessageComponentCollector({
                time: 60000,
                max: 1,
                filter: (inter) => {
                    return inter.user.id === inter.user.id && inter.isButton();
                }
            });
               var temp
            collector.on('collect', async(inter) => {
                const linkNumber = parseInt(inter.customId);
                link = target.user[user].playlists[linkNumber].links[0];
                console.log(`User selected link ${linkNumber}: ${link}`);
                temp = link
                await inter.reply('Votre liste de lecture choisie à été supprimée avec succès');
                delete target.user[user].playlists[linkNumber]
                // Do something with the selected link
                fs.writeFileSync('C:/Users/nicke/Downloads/Overbot/overbot/Playlistsaved.json', JSON.stringify(target, null, 2));
            })

            collector.on('end', collected => {
                if (collected.size === 0) {
                    inter.editReply('Aucun lien sélectionné.');
                }
            });
        } else{
            inter.editReply('Aucun lien valide detécté.');
        }
        }
    }
}
}
}