const { ApplicationCommandOptionType } = require('discord.js');
const fs = require('fs');
const { EmbedBuilder } = require('discord.js');


module.exports = {
  name: 'rank',
  description: 'See your actual rank',
  options: [
    {
      name: 'user',
      description: 'ma foi.. melez vous donc de vos affaires...',
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  async execute({ inter }) {
    var userjson = fs.readFileSync('C:/Users/nicke/Downloads/Overbot/overbot/levelData.json');    
    var object = JSON.parse(userjson);
    var userchosen = inter.options.getUser('user');
    const member = await inter.guild.members.resolve(userchosen);
    var username;
    if (!member) {
      userchosen = inter.user.id;
      console.log(userchosen);
      username = inter.user.username;
    } else {
      userchosen = member.user.id;
      username = member.user.username;
    }

    var userPoints = object.user[userchosen].points;
    var userlevel = object.user[userchosen].level;
    const pointIncrement = 10;
    const lvlnextlvl = (Math.pow((userlevel+1), 2)*50) - pointIncrement;
    var nextLevel = Math.floor(Math.sqrt((userPoints + pointIncrement) / 50));

    var progressBar = createProgressBar(userPoints, lvlnextlvl);
    if (member) {
      const rankEmbedmember = new EmbedBuilder()
        .setColor('#0099ff')
        .setAuthor({ name: `${member.user.username}'s Rank`, icon: member.displayAvatarURL() })
        .setDescription(`You are currently at level ${userlevel} with ${userPoints} points.`)
        .setThumbnail(member.displayAvatarURL())
        .addFields({ name: 'Progress', value: progressBar })
        .addFields({ name: 'Points to next level', value: `${lvlnextlvl - userPoints} points` });
      await inter.reply({ embeds: [rankEmbedmember] }); // Send the generated embed to the channel.
    } else {
      const rankEmbeduser = new EmbedBuilder()
        .setColor('#0099ff')
        .setAuthor({ name: `${inter.user.username}'s Rank`, icon: inter.user.avatarURL() })
        .setDescription(`You are currently at level ${userlevel} with ${userPoints} points.`)
        .setThumbnail(inter.user.avatarURL() )
        .addFields({ name: 'Progress', value: progressBar })
        .addFields({ name: 'Points to next level', value: `${lvlnextlvl - userPoints} points` });
      await inter.reply({ embeds: [rankEmbeduser] }); // Send the generated embed to the channel.
    }
  },
};

function createProgressBar(currentPoints, nextLevelPoints) {
  const percentage = Math.min(Math.max(currentPoints / nextLevelPoints, 0), 1);
  console.log(percentage)
  const progressChars = Math.round(10 * percentage);
  const emptyChars = 10 - progressChars;
  const progressBar = `${'▰'.repeat(progressChars)}◎${'—'.repeat(emptyChars)}`;
  return progressBar;
}
