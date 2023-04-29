const { VoiceConnection } = require('@discordjs/voice');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { DiscordAPIError } = require('discord.js');
//const ytdl = require('ytdl-core-discord');
const ffmpeg = require('ffmpeg-static');
const { spawn } = require('child_process');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'stream',
    description: 'stream a media content by providing the url',
    voiceChannel: true,
    options : [
        {
            name: 'link',
            description : 'the media that you want to stream',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],  
    async execute ({ inter, client }){
       await inter.deferReply();

        console.log(inter)
const voiceChannel = inter.member.voice.channel;
const queue = player.nodes.create(inter.guild, {
  metadata: {
      channel: inter.channel,
      client: inter.guild.members.me,
      requestedBy: inter.user,
  },
  spotifyBridge: client.config.opt.spotifyBridge,
  initialVolume: client.config.opt.defaultvolume,
  leaveOnEnd: client.config.opt.leaveOnEnd,
  autoSelfDeaf: client.config.opt.autoSelfDeaf,
  leaveOnEmpty: client.config.opt.leaveOnEmpty,
  leaveOnStop: client.config.opt.leaveOnStop
});

if (voiceChannel) {
      try {
        const connection = joinVoiceChannel({
          channelId: inter.channel.id,
          guildId: inter.guild.id,
          adapterCreator: inter.guild.voiceAdapterCreator,
        });
        console.log(inter.channel.id);
        console.log(inter.guild.id);
        console.log(inter.guild.voiceAdapterCreator)
        if(connection){
          console.log("connected")
        }
        else console.log("Not connected")
        const streamUrl = inter.options.getString('link')
        const resource = createAudioResource(streamUrl, { inputType: 'url' });
        const player = createAudioPlayer();

        player.play(resource);
        connection.subscribe(player);

       // await inter.reply(`Streaming: ${streamUrl}`);
      } catch (error) {
        console.error(error);
        //await inter.reply(`Error: ${error.message}`);
      }
    } else {
      await inter.reply('You need to join a voice channel first!');
    }
/*const stageChannel = await voiceChannel.guild.channels.create('Visual Content', {
  type: 'GUILD_STAGE_VOICE',
  topic: 'Visual content sharing channel',
  reason: 'Creating a new stage channel for sharing visual content',
});

const instance = await stageChannel.createStageInstance({
    topic: 'Visual Content',
    privacyLevel: 'PUBLIC',
    discoverableDisabled: false,
    reason: 'Creating a new stage instance for sharing visual content',
  });

  await instance.setTopic('Visual Content');

await instance.createStageInstanceParticipant();

await instance.setStageInstanceParticipant(
  inter.author.id,
  {
    isSpeaker: true,
    suppress: false,
    requestToSpeakTimestamp: Date.now(),
  }
);
        const media = inter.options.getString('link');
        const res = await player.search(media, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });
        if (!res || !res.tracks.length) return inter.editReply({ content: `No results found ${inter.member}... try again ? ❌`, ephemeral: true });

        
        
        const queue = player.nodes.create(inter.guild, {
            metadata: {
                channel: inter.channel,
                client: inter.guild.members.me,
                requestedBy: inter.user,
            },
            selfDeaf: true,
            volume: client.config.opt.defaultvolume,
            leaveOnEmpty: client.config.opt.leaveOnEmpty,
            leaveOnEnd: client.config.opt.leaveOnEnd,
        });
        if (!queue.connection) await queue.connect(inter.member.voice.channel);
    
        await inter.editReply({ content:`Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧`});

       res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);

       if (!queue.isPlaying()) await queue.node.play();
       const track = await player.play(media, {
        metadata: {
          title: 'test',
          artist: 'test',
          url: 'https://www.youtube.com/watch?v=ZD-0MROz164',
        },
        createAudioResource,
      });*/
    }
}