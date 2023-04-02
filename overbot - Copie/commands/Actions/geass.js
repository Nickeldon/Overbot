const { ApplicationCommandOptionType } = require('discord.js');
const fs  = require('fs'); 
const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'geass',
    description: 'Ordonnez par le pouvoir divin',
    options: [
      {
        name: 'action',
        description: 'que dois-je faire?',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            {name: 'mute/pathetique', value: 'muted-user_enable'},
            {name: 'ban/exil/shinu', value: 'ban-user_enable'},
            {name: 'unban/nouvelle_chance', value: 'ban-user_disable'},
        ]
    },
        {
            name: 'user',
            description: 'The user you want to target',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        
        {
            name: 'time',
            description: 'only applicable for muting',
            type: ApplicationCommandOptionType.Number,
            required: false,
        },  
        {
            name: 'reason',
            description: 'give the reason for targetting this user',
            type: ApplicationCommandOptionType.String,
            required: false,
        }
        ],
        async execute({ inter }){
                const user = inter.options.getUser('user');
                const member = inter.guild.members.cache.get(user.id)
                const adminid = inter.member.guild.ownerId
                const targetid = member.user.id;
//                const mutedRole = guild.roles.cache.find(role => role.name === 'Muted');
/*                if(!mutedRole){
                    message.guild.roles.create({
                        name: 'Muted',
                        color: '#000000',
                        permissions: []
                      })
                }*/
                console.log(adminid);
                console.log(member)
                const reason = inter.options.getString('reason');
                const userID = inter.user.id;
                    var userjson = fs.readFileSync('C:/Users/nicke/Downloads/Overbot/overbot/bannedmembers.json');
                    var object = JSON.parse(userjson);
                   
                const order = inter.options.getString('action');
                const time = inter.options.getNumber('time');
                console.log(order, time)
                if(userID === targetid){
                    inter.reply({content: 'Vous... *Ne pouvez pas vous auto-sanctionner...* **sérieusement.....**'})
                }
                else{
                if(adminid === userID){
                if(typeof time === 'number' && Number.isInteger(time) || order === 'ban-user_enable'){
                    if(typeof time === 'number' && order === 'ban-user_enable'){
                        inter.reply({content: 'You cannot ban members within a time period; (Do you mean warn?)', ephemeral: true})
                      }
                      else{
                switch (order) {
                    case 'muted-user_enable': {
                    inter.reply({ content: `Lelouch Vi Britania vous ordonne de vous taire pour le restant de votre existance!... *Ahem*.. J-je veux dire ${time} heures...`, ephemeral: false });
                      console.log('');
                        // await targetid.roles.add(mutedRole)
                      break;
                    }
                    case 'ban-user_enable': {
                        const embed = new EmbedBuilder()
                        .setColor('#660000')
                        .setImage('https://media.tenor.com/KQG5JPLWBkQAAAAC/lelouch-vi-britannia-code-geass.gif')
                        .setDescription('Lelouch Vi Britania vous ordonne; Exilez vous et mouvoyez le restant de votre existance dans vos regrets et dans une amertume sans précédent')
                        await inter.reply({ embeds: [embed] });
                      console.log('pathetique, que lon me donne un ordre ayant du sens!');
                      try {
                        if (!object.blacklist[userID]) {
                            console.log('Utilisateur banni pour la première fois')
                            object.blacklist[userID] = {
                            "banned": true,
                            "recidive": 0
                            };}
                            else{
                                console.log('Utilisateur banni plus dune fois');
                                object.blacklist[userID].recidive += 1;
                                object.blacklist[userID].banned = true;
                                if(object.blacklist[userID].recidive >= 3){
                                    inter.followUp({content: `ALERT: The latter targetted user have been banned for 3 or more times.`, ephemeral: true});
                                }
                            }
                            await member.ban();
                    } catch (error) {
                        console.error(`Failed to ban member: ${error}`);
                        inter.followUp({content: 'Failed to ban member.', ephemeral: true});
                        return;
                    }
                      break;
                    }
                    case 'ban-user_disable' : {
                      const embedmute = new EmbedBuilder()
                      .setColor('DarkRed')
                      .setTitle('Qui donc souhaitez vous débannir?')
                      .setDescription()
                      // Retrieve the ID of the user to unban from your JSON file
                      const userToUnban = Object.entries(object.blacklist).find(([userId, userObj]) => {
                          return userObj.banned && userId === userID;
                      });
                      
                      if (userToUnban) {
                          const [userId, userObj] = userToUnban;
                          inter.reply({content: `The user with ID ${userId} is successfully "targeted" by an unban request`, ephemeral: true});
                          try {
                              await client.users.unban(guildId, userId);
                              // Update your JSON file to mark the user as unbanned
                              userObj.banned = false;
                              userObj.recidive = 0;
                          } catch (error) {
                              console.error(`Failed to unban member: ${error}`);
                              //inter.followUp({content: 'Failed to unban member.', ephemeral: true});
                              return;
                          }
                      } else {
                          inter.reply({content: `No banned user with ID ${userID} found.`, ephemeral: true});
                      }
                      break;
                  }
                  
                    default: {
                      inter.reply('Action invalide.');
                      console.log('Action invalide.');
                      break;
                    }
                  }
                  fs.writeFileSync('C:/Users/nicke/Downloads/Overbot/overbot/bannedmembers.json', JSON.stringify(object));
                }}
                  else{
                    inter.reply({content: 'Please provide a valid and positive integer', ephemeral: true});
                  }}
                  else{
                    inter.reply({content: '**Petit impertinent! Seul mon maître se voit le droit de me contrôler!** *pff*'})
                  }}
              }


    }