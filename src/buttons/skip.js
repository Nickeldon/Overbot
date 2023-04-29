module.exports = async ({  inter, queue }) => { 
    if (!queue) return inter.reply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });
    
    const success = queue.node.skip();

    return inter.reply({ content: success ? `Current music ${queue.currentTrack} skipped ✅` : `Something went wrong ${inter.member}... try again ? ❌`, ephemeral: true});
}