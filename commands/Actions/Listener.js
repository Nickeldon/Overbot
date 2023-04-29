const { createAudioResource } = require('@discordjs/voice');
const fetch = require('node-fetch');
const witAiApiKey = '533721492286296Z';
const {Wit, log} = require('node-wit');

module.exports = {
    name:'ecoute',
    description:'Enable speech to text functionality to the voice channel!',
    voiceChannel: true,

    async execute({ inter }){

    }
}