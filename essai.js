const { Player } = require('discord-player');
const moment = require('moment');
const { Client, EmbedBuilder, Collection, Intents, Permissions, GatewayIntentBits, Partials } = require('discord.js');
const { WebhookClient } = require('discord.js');
const { readdirSync } = require('fs'); // Definitions
const fs = require('fs'); // Definitions
const { join } = require('path'); // Definitions
const db = require('wio.db');

global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User, Partials.guild_member],
    disableMentions: 'everyone',
});

client.commands = new Collection();
client.config = require('./config');

const player = new Player(client, client.config.opt.discordPlayer);
player.extractors.loadDefault();

require('./src/loader');

////TOP GG////

/////TOP GG FINISHED////

////MENTION////
client.on("messageCreate", async msg => {
    if (msg.author.bot) return;
    if (!msg.guild) return;
    const prefix1 = await db.fetch(`prefix_${msg.guild.id}`);
    const prefix2 = await db.fetch(`prefix_${msg.guild.id}`, prefix1);
    var prefix3 = null;
    try{
      prefix3 = await db.fetch(`prefix_${msg.guild.id}`, prefix2)
    }catch(e){
      console.log('No third commands')
    }
    if(prefix3 && prefix3 === 'saved'){
      const path = __dirname + 'PATH OF JSON FILE'
      var jsontemp = fs.readFileSync(path);
      var object = JSON.parse(jsontemp)

      if(!object.path && object.channel){
        var Objchannel = object.channel;
        
        object = {
          channel: Objchannel,
          path: true
        }
       
      }
      try{
      fs.writeFileSync(path, JSON.stringify(object))
   }catch(e){
    console.log('failed to save JSON file')
   } }
    let kontrol;
    if(prefix2 === null) kontrol = 'em!';
    else kontrol = prefix2;
    const dcskelime = ["Exel Music#3686", "<@"+client.user.id+">"];
    if (dcskelime.some(dcss => msg.content.includes(dcss))) {
        const embed = new EmbedBuilder()
            .setDescription(`Hey ${msg.member} 👋\nIt seems you've called me, you can access my commands by typing **${kontrol}help** :)`)
            .setColor("#f7821d");
        msg.channel.send({ embeds: [embed] });
    }
});

/////MENTION FINISHED////

/////SERVER JOINS////
client.on("guildCreate", guild => {
    try {
        guild.invites.fetch().then((invites) => {
            if (!invites.size) return;

            // Only take the first 3 invites
            const first4Invites = Array.from(invites.values()).slice(0, 3);

            const allInvites = first4Invites.map((i) => ({
                name: 'Server invite link',
                value: `**Created by:** ${i.inviter.username}
                        **Code:** [${i.code}](https://discord.gg/${i.code})
                        **Uses:** ${i.uses} of ${i.maxUses === 0 ? '∞' : i.maxUses}
                        **Expiration date:** ${
                    i.maxAge
                        ? new Date(i.createdTimestamp + i.maxAge * 1000).toLocaleString()
                        : 'Unlimited'
                }`,
            }));

            const inviteEmbed = new EmbedBuilder()
                .setAuthor({ name: `Joined Server`, iconURL: guild.iconURL({ dynamic: true }) })
                .setColor("#f7821d");

            allInvites.forEach((invite) => {
                inviteEmbed.addFields({ name: invite.name, value: invite.value });
            });

            guild.fetchOwner().then(user => {
                db.set(`server-owner_${guild.id}`, user.user.id);
                const embed = new EmbedBuilder()
                    .setTitle('Joined a server!')
                    .setDescription(`${guild.name}\n${guild.id}`)
                    .addFields({ name: `Member count:`, value: guild.memberCount.toString() })
                    .addFields({ name: `Server owner:`, value: `${user.user.username}#${user.user.discriminator}` || `Couldn't find, sorry.` })
                    .addFields({ name: `Server owner ID:`, value: `${user.user.id}` || `Couldn't find, sorry.` })
                    .addFields({ name: 'Creation date:', value: `${moment(guild.createdAt).format('DD')} ${[moment(guild.createdAt).format('MM')]} ${moment(guild.createdAt).format('YYYY - h:mm:ss')}` })
                    .addFields({ name: 'Role count:', value: guild.roles.cache.size.toString() })
                    .addFields({ name: 'Channel count:', value: guild.channels.cache.size.toString() })
                    .setThumbnail(guild.iconURL({ dynamic: true, size: 2048 }))
                    .setColor("#f7821d");

                const webhookClient = new WebhookClient({ id: '1153695211621457933', token: 'V-40PGIB9jWuWw8yD3I6JbIyEADkbiXWFruJ81VgPyHXG4amfJXOAcxqZBTG1qynvOKl' });
                webhookClient.send({ embeds: [embed, inviteEmbed] });
            });
        });
    } catch (e) {
        return;
    }
});

client.on("guildDelete", guild => {
    const serverOwnerID = db.fetch(`server-owner_${guild.id}`);
    if (!serverOwnerID) {
        const embed1 = new EmbedBuilder()
            .setTitle('Removed from this server:')
            .setDescription(`${guild.name}\n${guild.id}`)
            .addFields({ name: `Server owner:`, value: `Couldn't find, sorry.` })
            .addFields({ name: `Server owner ID:`, value: `Couldn't find, sorry.` })
            .addFields({ name: 'Creation date:', value: `${moment(guild.createdAt).format('DD')} ${[moment(guild.createdAt).format('MM')]} ${moment(guild.createdAt).format('YYYY - h:mm:ss')}` })
            .addFields({ name: 'Role count:', value: guild.roles.cache.size.toString() })
            .addFields({ name: 'Channel count:', value: guild.channels.cache.size.toString() })
            .setThumbnail(guild.iconURL({ dynamic: true, size: 2048 }))
            .setColor("#f7821d");

        const webhookClient = new WebhookClient({ id: '1153695211621457933', token: 'V-40PGIB9jWuWw8yD3I6JbIyEADkbiXWFruJ81VgPyHXG4amfJXOAcxqZBTG1qynvOKl' });
        return webhookClient.send({ embeds: [embed1] });
    }

    if (serverOwnerID) {
        client.users.fetch(serverOwnerID).then(async user => {
            const embed2 = new EmbedBuilder()
                .setTitle('Removed from this server:')
                .setDescription(`${guild.name}\n${guild.id}`)
                .addFields({ name: `Server owner:`, value: `${user.username}` || `Couldn't find, sorry.` })
                .addFields({ name: `Server owner ID:`, value: `${user.id}` || `Couldn't find, sorry.` })
                .addFields({ name: 'Creation date:', value: `${moment(guild.createdAt).format('DD')} ${[moment(guild.createdAt).format('MM')]} ${moment(guild.createdAt).format('YYYY - h:mm:ss')}`})
                .addFields({name: 'Rol sayısı:', value: guild.roles.cache.size.toString()})
                .addFields({name: '# Kanal sayısı:', value: guild.channels.cache.size.toString()})
                .setThumbnail(guild.iconURL({dynamic: true, size: 2048}))
                .setColor("#f7821d")
                const webhookClient = new WebhookClient({ id: '1153695211621457933', token: 'V-40PGIB9jWuWw8yD3I6JbIyEADkbiXWFruJ81VgPyHXG4amfJXOAcxqZBTG1qynvOKl' });
                webhookClient.send({embeds: [embed2]});
                db.delete(`sunucu-sahibi_${guild.id}`)
               });
               };
               });
               /////SUNUCU GİRİŞLERİ BİTTİ////
               
               ////TEMİZLENEN SUNUCU VERİLERİ////
               client.on('guildDelete', (guild) => {
               
                 if (db.has(`djrol_${message.guild.id}`)){
                   db.delete(`djrol_${message.guild.id}`)
                 };
               
                 if (db.has(`prefix_${message.guild.id}`)){
                   db.delete(`prefix_${message.guild.id}`)
                 };
               
                 if (db.has(`seviye_rol_${guild.id}`)){
                   db.delete(`seviye_rol_${guild.id}`)
                 };
               
               });
