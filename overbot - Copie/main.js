const { Player } = require('discord-player');
const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');
const speedTest = require('speedtest-net');
global.client = new Client({
    intents: [
      GatewayIntentBits.DirectMessageReactions,
      GatewayIntentBits.DirectMessageTyping,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.GuildBans,
      GatewayIntentBits.GuildEmojisAndStickers,
      GatewayIntentBits.GuildIntegrations,
      GatewayIntentBits.GuildInvites,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMessageTyping,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildScheduledEvents,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildWebhooks,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.MessageContent
    ],
   disableMentions: 'everyone',
});

client.config = require('./config');

player = new Player(client, client.config.opt.discordPlayer);
require('./src/loader');
require('./src/events');

const pointIncrement = 10;

global.client.on('voiceStateUpdate', (oldState, newState) => {
  const newstate = newState.channelId;
  const oldstate = oldState.channelId;
  const timestamp = new Date().toISOString();
  if (oldState.channelId !== null) { 
    const message = `VOICE --> ${timestamp} - ${oldState.member.user.tag} left ${oldState.channel.name} server: ${oldstate}`;
    fs.appendFileSync('C:/Users/nicke/Downloads/Overbot/overbot/serverlogs.txt', message + '\n \n');
  }
  else if (!oldState.channelId) {
    const timestamp = new Date().toISOString();
    const message = `VOICE --> ${timestamp} - ${newState.member.user.tag} joined ${newState.channel.name}  server: ${newstate}`;
    fs.appendFileSync('C:/Users/nicke/Downloads/Overbot/overbot/serverlogs.txt', message + '\n \n');
  }
});



global.client.on('messageCreate', message => {
    if (message.author.bot) return;
    const userID = message.author.id;
    var userjson = fs.readFileSync('C:/Users/nicke/Downloads/Overbot/overbot/levelData.json');
    var object = JSON.parse(userjson);
    if (!object.user[userID]) {
        object.user[userID] = {
          "points": 0,
          "level": 1
        };
      }
      else{
    const userPoints = object.user[userID].points
    //console.log(userPoints) Unecessary
    object.user[userID].points += pointIncrement;
    const currentLevel = Math.floor(Math.sqrt(userPoints / 50));
    var botlevel = currentLevel;
    const nextLevel = Math.floor(Math.sqrt((userPoints + pointIncrement) / 50));
    if (nextLevel > currentLevel) {
        object.user[userID].level += 1;
botlevel += 2
      message.reply(`Mes félicitations.. vous avez atteint le niveau ${currentLevel} Cependant... JAMAIS VOUS NE DÉPASSEREZ MON ULTIME NIVEAU DE ${botlevel} MISÉRABLE!!`);
         }}
    fs.writeFileSync('C:/Users/nicke/Downloads/Overbot/overbot/levelData.json', JSON.stringify(object));
  });

  /*global.client.on('guildCreate', guild => {
    // Find the main text channel of the server
    const mainChannel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT');
  
    // Send a welcome message to the main channelà
      mainChannel.send('Schneizel a déposé les armes Le Damoclès et les ogives du F.L.E.I.A sont miens.');
      mainChannel.send('Nul ne peut me résister, pas même l’ordre des chevaliers noirs.');
      mainChannel.send('Mais si quelqu’un ose me tenir tête.');

  });*/
  
  function test () {
    try{
    speedTest({ acceptLicense: true, maxTime: 5000}).then(result => {
      console.log(result)
      if(!result){
        console.error("could not fork the client")
      }
      else{
    const pingSpeed = result.ping.latency;
    const infourl = result.result.url;
    var downloadSpeed = (result.download.bytes / 8000000).toFixed(2);
    var uploadSpeed = (result.upload.bytes / 8000000).toFixed(2);
    const bandwidth  = result.download.bandwidth;

    if(bandwidth < 15){
      const message = 'INTERNET --> ALERT: Bandidth is lower than 15 Mbps, slowdowns may occur while using the application'
      fs.appendFileSync('C:/Users/nicke/Downloads/Overbot/overbot/serverlogs.txt', message + '\n \n');
      console.warn(message)
    } else if(downloadSpeed < 3){
      const message = 'INTERNET --> ALERT: Download speed value is lower than 20 MBps, slowdowns may occur while using the application' 
      fs.appendFileSync('C:/Users/nicke/Downloads/Overbot/overbot/serverlogs.txt', message + '\n \n');
      console.warn(message)
    } else{
      console.log("Connection ok")
    }
    console.log(`Ping Speed: ${pingSpeed} ms\nDownload Speed: ${downloadSpeed} MBps\nUpload Speed: ${uploadSpeed} MBps`)
    console.log('visit: ', infourl);

}
  })} catch (error){
    console.error('Connection measurment could not pursue. Error 404')
  }
}
  
  const Interval = 60 * 60 * 1000;

    setInterval(test, Interval)


client.login(client.config.app.token);