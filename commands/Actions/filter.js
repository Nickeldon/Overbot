const { ApplicationCommandOptionType } = require('discord.js');
const { AudioFilters } = require('discord-player');

module.exports = {
    name: 'filter',
    description: 'add a filter to your track',
    voiceChannel: true,
    options: [
        {
            name: 'filter',
            description: 'filter you want to add',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [...Object.keys(AudioFilters.filters).map(m => Object({ name: m, value: m })).splice(0, 25)],
        }
    ],


    async execute({ inter, client }) {
        await inter.deferReply();
        try{
        const queue = player.nodes.get(inter.guildId);

        if (!queue) return await inter.editReply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });

        const actualFilter = queue.filters.ffmpeg.getFiltersEnabled()[0];

        const infilter = inter.options.getString('filter');

        const filters = [];

        queue.filters.ffmpeg.getFiltersEnabled().map(x => filters.push(x));
        queue.filters.ffmpeg.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === infilter.toLowerCase());

        if (!filter) return await inter.editReply({ content: `This filter doesn't exist ${inter.member}... try again ? ❌\n${actualFilter ? `Filter currently active : ${actualFilter}.\n` : ''}List of available filters : ${filters.map(x => `**${x}**`).join(', ')}.`, ephemeral: true });
            try{
        queue.filters.ffmpeg.toggle(filter.toString())
}catch(error){
    await inter.editReply({content: 'The activation was unsucessful', ephemeral: true});
}
       await inter.editReply({ content: `The filter ${filter} is now **${queue.filters.ffmpeg.getFiltersEnabled().includes(filter) ? 'enabled' : 'disabled'}** ✅\n*Reminder the longer the music is, the longer this will take.*` });}
        catch(error){
            await inter.editReply({content: 'music filtering could not resolve', ephemeral: true})
        }
    },
};