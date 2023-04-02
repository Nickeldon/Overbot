module.exports = async (client) => {
    console.log(`Connecté au client: ${client.user.username}\n-> Prêt à mettre mon plan en valeur dans ${client.guilds.cache.size} serveurs pour un total de ${client.users.cache.size} victimes`);
    client.user.setActivity(client.config.app.playing);

    
};