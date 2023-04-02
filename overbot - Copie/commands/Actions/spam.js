const {ApplicationCommandOptionType} = require('discord.js');
const {fs} = require('fs');

module.exports = {
    name: 'spammeur',
    description: 'Jouez un tour a l\'un de vos amis',
    options : [
        {
            name: 'cible',
            description: 'qui souhaitez vous donc viser?',
            required: true,
            type: ApplicationCommandOptionType.User,
        },
        {
            name: 'contenu',
            description: 'Que voulez vous envoyer?',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'facteur',
            description: 'Combien de fois voulez vous envoyer ce message? (default: undefined)',
            required: false,
            type: ApplicationCommandOptionType.Integer,
        },
        {
            name: 'direction',
            description: 'lieu de l\'attaque (default: guild)',
            required: false,
            type: ApplicationCommandOptionType.String,
            choices: [
                {name: 'serveur', value: 'guild_target'},
                {name: 'Messages Privés', value: 'private_target'}
            ],
        }
    ],
    async execute ({ inter }){
            const content = inter.options.getString('contenu');
            const target = inter.options.getUser('cible');
            const reps = inter.options.getInteger('facteur');
            const choice = inter.options.getString('direction');

            switch(choice){
                case 'guild_target' : {
                    try{
                    inter.reply(content)
                    for(let i = 0; i < reps; i++){
                    inter.followUp(content)}
                }catch{
                    inter.reply({content: 'failed to create fork', ephemeral: true})
                }} break;
                case 'private_target': {
                    try{
                    for(let i = 0; i < reps; i++){                    
                    target.send(content)}
                }catch{
                    inter.reply({content: 'failed to create fork', ephemeral: true})
                }} break;
            }
            
    }
}