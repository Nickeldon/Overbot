const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');


player.events.on('error', (queue, error) => {
    console.log(`Error emitted from the queue ${error.message}`);
});

player.events.on('playerError', (queue, error) => {
    console.log(`Error emitted from the connection ${error.message}`);
});

player.events.on('playerStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    const embed = new EmbedBuilder()
    .setAuthor({name: `Je commence à faire jouer la pièce ${track.title} dans ${queue.options.guild.name}!`, iconURL: track.requestedBy.avatarURL()})
    .setColor('#13f857')

    const back = new ButtonBuilder()
    .setLabel('Back')
    .setCustomId(JSON.stringify({ffb: 'back'}))
    .setStyle('Primary')

    const skip = new ButtonBuilder()
    .setLabel('Skip')
    .setCustomId(JSON.stringify({ffb: 'skip'}))
    .setStyle('Primary')

    const resumepause = new ButtonBuilder()
    .setLabel('Resume & Pause')
    .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
    .setStyle('Danger')

    const loop = new ButtonBuilder()
    .setLabel('Loop')
    .setCustomId(JSON.stringify({ffb: 'loop'}))
    .setStyle('Secondary')
    
    const queuebutton = new ButtonBuilder()
    .setLabel('Queue')
    .setCustomId(JSON.stringify({ffb: 'queue'}))
    .setStyle('Secondary')

    const row1 = new ActionRowBuilder().addComponents(back, loop, resumepause, queuebutton, skip)
    queue.metadata.channel.send({ embeds: [embed], components: [row1] })
});

player.events.on('audioTrackAdd', (queue, track) => {
   
    queue.metadata.channel.send(`La requête pour la musique dont le nom est ${track.title} est ajouté à la liste! Ikuzo!`);
});

player.events.on('disconnect', (queue) => {
    queue.metadata.channel.send('Vous êtes prêt même à vendre vos propres amis pour assouvir vos besoins!? *Il est pathétique que lon me rejette ainsi...*');
});

player.events.on('emptyChannel', (queue) => {
    queue.metadata.channel.send('Personne... Plus personne! *Oui...* je suis seul. Seul au monde, abandonné et rejeté de tous... *Je quitte...*');
});

player.events.on('emptyQueue', (queue) => {
    queue.metadata.channel.send('Toutes mes obligations sont vaines! ✅');
});

player.events.on('audioTracksAdd', (queue, tracks) => {
    queue.metadata.channel.send(`Qu'on ne me donne pas d'ordres!.. *Mais bon, toutes vos requêtes furent ajoutés à la liste* ✅`);
});
player.events.on('connectionCreate', (queue) => {
    queue.connection.voiceConnection.on('stateChange', (oldState, newState) => {
      const oldNetworking = Reflect.get(oldState, 'networking');
      const newNetworking = Reflect.get(newState, 'networking');

      const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
        const newUdp = Reflect.get(newNetworkState, 'udp');
        clearInterval(newUdp?.keepAliveInterval);
      }

      oldNetworking?.off('stateChange', networkStateChangeHandler);
      newNetworking?.on('stateChange', networkStateChangeHandler);
    });
});