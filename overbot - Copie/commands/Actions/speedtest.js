const { ApplicationCommandOptionType } = require('discord.js');
const speedTest = require('speedtest-net');
const {fs} = require('fs');
const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'speedtest',
    description: 'Verify the host\'s internet bandwidth, ping, and speed.',
    options: [
        {
    name: 'bonus',
    description: 'yes',
    type: ApplicationCommandOptionType.String,
    required: false,
        }
    ],
    async execute({ inter }){
        const bonus = inter.options.getString('bonus');
        await inter.deferReply();
 try {
    await speedTest({ acceptLicense: true, maxTime: 5000}).then(result => {
        const pingSpeed = result.ping.latency;
        const infourl = result.result.url;
        var downloadSpeed = (result.download.bytes / 1000000).toFixed(2);
        var uploadSpeed = (result.upload.bytes / 1000000).toFixed(2);
        var measurement = "Mbps";
        if(bonus === "MBps is not Mbps"){
            downloadSpeed/=8;
            uploadSpeed/=8;
            measurement = "MBps"
        }
    const embed = new EmbedBuilder()
      .setColor('DarkRed')
      .setTitle('🌐 Internet Speed Test Results:')
      .setDescription(`Ping Speed: ${pingSpeed} ms\nDownload Speed: ${downloadSpeed} ${measurement}\nUpload Speed: ${uploadSpeed} ${measurement}\n\nTo have more information about your Wifi connection, go to ${infourl} `);

    inter.editReply({ embeds: [embed], ephemeral: false });
    }
    )

  } catch (error) {
    console.error(error);
    inter.reply({ content: 'Error: The speed test failed to complete.', ephemeral: true });
  }
}


    }
