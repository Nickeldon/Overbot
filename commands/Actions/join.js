const { ApplicationCommandOptionType } = require('discord.js');
const { execute } = require('./geass');
const { EmbedBuilder } = require('discord.js');
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    name: 'join',
    description: 'Temp-command to try the join actions',

    async execute({ inter }){
inter.reply({content: 'Schneizel a déposé les armes Le Damoclès et les ogives du F.L.E.I.A sont miens.', ephemeral: false})
    
await sleep(2000);
        await inter.followUp('Nul ne peut me résister, pas même l’ordre des chevaliers noirs.');
        await sleep(2000);      
        await inter.followUp('Mais si quelqu’un ose me tenir tête.');
     
        await sleep(2000);
        await inter.followUp('Il goûtera à la puissance du F.L.E.I.A');
     
        await sleep(2000);
        await inter.followUp('Plus personne ne peut me disputer la suprématie');
     
        await sleep(3000);
        await inter.followUp('À partir de maintenant, le monde m’appartient!');
      
        await sleep(4000);
const embed = new EmbedBuilder()
.setColor('DarkRed')
.setTitle('Lelouch Vi Botannia ordonne!')
.setImage('https://media.tenor.com/KQG5JPLWBkQAAAAC/lelouch-vi-britannia-code-geass.gif')
await inter.followUp({embeds: [embed]});
   
        await sleep(4000);
        await inter.followUp('Que le serveur entier m’obéisse!');
   
        await sleep(5000);
        await inter.followUp('ALL HEIL LELOUCH!');
   
    }
}