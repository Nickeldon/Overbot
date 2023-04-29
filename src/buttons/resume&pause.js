module.exports = async ({  inter, queue }) => { 
    //console.log('queue number 2', queue)
    console.log('------------------------------------------------')
    console.log(queue)
    if (!queue){
        inter.reply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });
        return 
    } 
    const success = queue.node.resume(false);
    
    if (!success) queue.node.pause(true);
    
    return inter.reply({ content: `${success ? `Current music ${queue.currentTrack} resumed ✅` : `Current music ${queue.currentTrack} paused ✅`}`, ephemeral: true});
}