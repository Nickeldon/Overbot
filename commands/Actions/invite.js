const { ApplicationCommandOptionType } = require('discord.js');
const fs  = require('fs'); 
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');


module.exports = {
    name: 'invite',
    description: 'generate an invite link for this server',
    options: [
        {
            name: 'limit_time',
            description: 'specify the time for which the invite link stays valid (default 1h)',
            type: ApplicationCommandOptionType.Number,
            required: false,
            choices: [
                {name: '1h', value: 3600},
                {name: '3h', value: 10800},
                {name: '5h', value: 18000},
                {name: '10h', value: 36000},
                ]
        },
        {
            name: 'limit_uses',
            description: 'specify how many times the invite link can be used  (default 10)',
            type: ApplicationCommandOptionType.Number,
            required: false,
            choices: [
                {name: '1', value: 1},
                {name: '5', value: 5},
                {name: '30', value: 30}
                ]
        },
        
    ],
    async execute({inter, client}){
        await inter.deferReply()
        var maxuse = inter.options.getNumber('limit_uses')
        var maxtime = inter.options.getNumber('limit_time')

        if(!maxtime) maxtime = 3600
        if(!maxuse)  maxuse = 10

      var cache = await client.channels.cache.filter(c => typeof c.createInvite !== "undefined")
        const channels = [...cache.keys()]
        /*console.log(channels.length)*/
        var channel
        var channelnames = '';
        var channeltemp = '';

        for(let i = 0; i < channels.length; i++){
            channel = await client.channels.fetch(channels[i])
            channelnames += `${channel.guild.name}-=-`
            channeltemp += `${channel}-=-`}
               
        channelnames = channelnames.split('-=-')
        let finalnames = []
        channeltemp = channeltemp.split('-=-')
        for(let i = 0; i< channelnames.length; i++){
            if(i !== channelnames.length){
                if(channelnames[i] !== channelnames[i + 1]){
            finalnames.push(channelnames[i]);
                }
            }
        }
        let chosennum
        /*console.log(channel)*/

            const components = [];

            const embed = new EmbedBuilder()
            .setColor('#660000')
            .setDescription('Please choose which server do you wish to create an invite link')

            for(let i = 0; i<finalnames.length; i++){
                if(finalnames[i] === '' || finalnames[i] === ' ' || !finalnames[i]){
                    delete finalnames[i]
                }
                if(finalnames[i]){
                    /*console.log(finalnames)*/
                const button = new ButtonBuilder()
                    .setCustomId(String(i))
                    .setLabel(finalnames[i])
                    .setStyle(ButtonStyle.Secondary);
            
                const row = new ActionRowBuilder()
                    .addComponents(button);
            
                components.push(row);}
            }

            await inter.editReply({ embeds: [embed], components: components});
            const collector = inter.channel.createMessageComponentCollector({
                time: 60000,
                max: 1,
                filter: (inter) => {
                    return inter.user.id === inter.user.id && inter.isButton();
                }
            });

            collector.on('collect', async(inter) => {
                chosennum = parseInt(inter.customId);
                let chosenchannel;
                let k = 0;
                do{
                    channel = await client.channels.fetch(channels[k])
                    if(channel.guild.name === finalnames[chosennum]){
                        chosenchannel = channel
                    }
                    k++
                }while(!chosenchannel && k<channels.length)
                /*console.log(chosenchannel)*/
                let invitelink = await chosenchannel.createInvite({
                    maxAge: maxtime,
                    maxUses: maxuse,
                });
                /*console.log(`discord.gg/${invitelink.code}`)*/
        await inter.reply({content: `discord.gg/${invitelink.code}`})
            })

            collector.on('end', collected => {
                if (collected.size === 0) {
                    inter.editReply('No choices have been made');
                }
            });
                      
        
        /*console.log(channel)*/
        
    }
}