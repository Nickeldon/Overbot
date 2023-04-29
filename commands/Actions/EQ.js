const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { EqualizerConfigurationPreset, useQueue, AudioFilters } = require('discord-player');

module.exports = {
    name: 'equalizer',
    description: 'adjust and equalize the audio properties',
    voiceChannel: true,
    options: [
        {
            name: 'preset',
            description: 'the setting to assign to the present audio track',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: Object.keys(EqualizerConfigurationPreset).map((m) => ({
                name: m,
                value: m
            }))
        }
    ],

    async execute({ inter }) {
        await inter.deferReply();
        const queue = useQueue(inter.guildId);

        if (!queue?.currentTrack) await inter.editReply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });
        if (!queue.filters.equalizer) await inter.editReply({
            content: '❌ Equalizer is not available for this track.'
        });

        const preset = inter.options.getString('preset');

        queue.filters.equalizer.setEQ(EqualizerConfigurationPreset[preset]);
        queue.filters.equalizer.enable();

        const EqEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: `Equalizer config set to ${preset}!` });

        await inter.editReply({ embeds: [EqEmbed] });
    },
};