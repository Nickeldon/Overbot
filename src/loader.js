const { readdirSync } = require('fs');
const { Collection } = require('discord.js');
const { dirname } = require('path');

client.commands = new Collection();
CommandsArray = [];



const events = readdirSync('./events/').filter(file => file.endsWith('.js'));

console.log(`Amorce du chargement des réactions...`);

for (const file of events) {
    const event = require(`../events/${file}`);
    console.log(`-> [Réaction chargée] ${file.split('.')[0]}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`../events/${file}`)];
};

console.log(`Amorce du chargement des commandes...`);
console.log('extraction des paramètres chargés depuis la source: ');

readdirSync('./commands/').forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`../commands/${dirs}/${file}`);
        if (command.name && command.description) {
        CommandsArray.push(command);
        console.log(`-> [Commande chargée] ${command.name.toLowerCase()}`);
        client.commands.set(command.name.toLowerCase(), command);
        delete require.cache[require.resolve(`../commands/${dirs}/${file}`)];
        } else console.log(`[Échec du chargement]  ${command.name}`)
    };
});
client.on('ready', (client) => {
 if (client.config.app.global) client.application.commands.set(CommandsArray)
  else client.guilds.cache.get(client.config.app.guild).commands.set(CommandsArray)
})
