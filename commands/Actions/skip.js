const{ EmbedBuilder, ButtonBuilder } = require('discord.js');
const{ ApplicationCommandOptionType, ActionRowBuilder, ButtonStyle} = require('discord.js');
module.exports = {
    name: 'skip',
    description: 'stop the track',
    voiceChannel: true,
options: [
{
    name: 'vote',
    description: 'Choose if you want to votee or not',
    required: true,
    type: ApplicationCommandOptionType.String,
    choices:[
        {name: 'instant', value: 'voting_disable'},
        {name: 'vote', value: 'voting_enable'},
    ],
}
],
            
      

   async execute({ inter }) {
       await inter.deferReply();
        const queue = player.nodes.get(inter.guildId);

        const choice = inter.options.getString('vote')
if(queue && queue.currentTrack){
        switch(choice){
            case 'voting_enable': {

                const embed = new EmbedBuilder()
                .setColor('DarkOrange')
                .setTitle('Vote to skip!')
                .setDescription('Choose whether you want to skip or not the current track')
              
              const components = [];
              
              for (let i = 0; i < 2; i++) {
                const button = new ButtonBuilder()
                  .setCustomId(String(i))
                  .setLabel(i === 0 ? 'Yes' : 'No')
                  .setStyle(ButtonStyle.Secondary);
              
                const row = new ActionRowBuilder()
                  .addComponents(button);
              
                components.push(row);
              }
              
              const message = await inter.editReply({
                embeds: [embed],
                components: components,
                ephemeral: false
              });
              
              const collector = message.createMessageComponentCollector({
                time: 60000, // time limit for the poll in milliseconds (60 seconds)
                max: 1 // max number of inters per user
              });
              
              const votes = {
                yes: 0,
                no: 0,
              };
              
              const voters = new Set();
              
              collector.on('collect', async inter => {
                // check if the user has already voted
                if (voters.has(inter.user.id)) {
                  console.log(inter)
                  await inter.reply({
                    content: 'You have already voted!',
                    ephemeral: true
                  });
                  return;
                }
              
                // add the user to the set of voters
                voters.add(inter.user.id);
              
                // increment the corresponding vote counter
                if (inter.customId === '0') {
                  votes.yes++;
                } else if (inter.customId === '1') {
                  votes.no++;
                }
              
                // update the message with the current vote counts
                try{
                const embed = new EmbedBuilder()
                  .setColor('DarkOrange')
                  .setTitle('@everyone Vote to skip!')
                  .setDescription('Choose whether you want to skip or not the current track')
                   }catch(error){
                    console.error(error)
                   }          
                await inter.update({
                  embeds: [embed],
                  components: components
                });
              });
              
              collector.on('end', async collected => {
                // determine if the vote passed (at least half of the voters voted 'yes')
                const totalVotes = collected.size;
                const requiredVotes = Math.ceil(totalVotes / 2);
              
                const passed = votes.yes >= requiredVotes;
              
                // update the message with the final result
                const embed = new EmbedBuilder()
                  .setColor(passed ? 'DarkGreen' : 'DarkRed')
                  .setTitle(passed ? 'Track skipped!' : 'Track not skipped')
                  .setDescription(`${votes.yes} voted to skip, ${votes.no} voted not to skip`);
              
                await message.edit({
                  embeds: [embed],
                  components: []
                });
                setTimeout(() => {
                    if (!collector.ended) {
                      collector.stop();
                    }
                  }, 1200000);

                if(votes.yes >= votes.no && votes.yes !== 0){
                    if (!queue || !queue.isPlaying()) await inter.editReply({ content:`No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });
        
                    const success = queue.node.skip();
            
                    //Integrate vote to skip.
                   await inter.editReply({ content: success ? `Current music ${queue.currentTrack.title} skipped ✅` : `Something went wrong ${inter.member}... try again ? ❌`});
                }
                else if(votes.yes < votes.no){
                    await inter.editReply('The majority wanted to keep the track!')
                }
                else if(votes.yes === votes.no){
                  await inter.editReply('Draw! Je ne ferais donc rien...')
                }
                else{
                  await inter.editReply('Parameter does not exist');
                }
              });

            } break;
            case 'voting_disable': {

                if (!queue || !queue.isPlaying()) return inter.reply({ content:`No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });
        
                const success = queue.node.skip();
        
                //Integrate vote to skip.
               return inter.editReply({ content: success ? `Current music ${queue.currentTrack.title} skipped ✅` : `Something went wrong ${inter.member}... try again ? ❌`});
            } break;
            default: console.error('Parameter does not exist')
        }
}
else{
    inter.editReply({content: 'No music currently playing, Try again?', ephemeral: true})
}
    },
};