const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'dm',
    description: 'Send a message to a user!',
    options: [
        {
            name: 'user',
            description: 'The user you want to send a message to',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'message',
            description: 'The content of the message you want to send',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    async execute({ inter }) {
        const user = inter.options.getUser('user');
        const messageContent = inter.options.getString('message');
        user.send(messageContent).then(() => {
            return inter.reply({ content: `I have sent you the message by private messages ✅`, ephemeral: true });
        }).catch(error => {
            return inter.reply({ content: `Unable to send you a private message... try again ? ❌`, ephemeral: true });
        });
    },
};
