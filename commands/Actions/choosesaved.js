const fs = require('fs');
const {EmbedBuilder} = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const  play  = require('./Extentions/MusicEngine.js')

module.exports = {
    name: 'playsave',
    description: 'play your previously saved playlist',
    voiceChannel: true,

    async execute({ inter, client }) {
        await inter.deferReply();
        const user = inter.user.id;
        var directory = fs.readFileSync('C:/Users/nicke/Downloads/Overbot/overbot/Playlistsaved.json')
        var target = JSON.parse(directory);
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
                link = links[0].links[0]
                if(link){
                    inter.editReply('Je commence à faire jouer votre liste de lecture! Ikuzo');
                }
                else{
                    inter.editReply('Aucun lien sélectionné.');
                }
                play(inter,client, link)
            }
            else {
                if(linkCount > 1) {
                const embed = new EmbedBuilder()
                    .setColor('DarkRed')
                    .setTitle('Ehhhh, je prends lequel?')
                    .setDescription('Choisissez le lien que vous souhaitez utiliser');

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
                

                inter.editReply({ embeds: [embed], components: components, ephemeral: false });
                

                // Listen for button interactions
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
                    link = links[String(linkNumber)].links[0];
                    console.log(`User selected link ${linkNumber}: ${link}`);
                    temp = link
                    await inter.reply('Je commence à faire jouer votre liste de lecture! Ikuzo');
                    try{
                    await play(inter, client, link)
                    }
                    catch{ inter.followUp({content: 'Je ne puis point jouer votre liste de lecture', ephemeral: true})
                            }// Do something with the selected link
                    await inter.deleteReply({setTimeout:5});
                })
                    
                
                console.log(temp)

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
};
