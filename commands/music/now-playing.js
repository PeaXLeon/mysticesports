const color = require("../../colors.json")

module.exports = {
	name : "now-playing",
	description: "Check the music I'm playing",
	aliases : ["np", "nowplaying"],
	async execute(bot, message, args) {

		if (!message.member.voice.channel) return message.reply('You\'re not in a voice channel');

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply('You are not in the same voice channel');

        if (!bot.player.getQueue(message)) return message.reply(' There\'s no music playing');

        const track = bot.player.nowPlaying(message);
        const filters = [];

        Object.keys(bot.player.getQueue(message).filters).forEach((filterName) => bot.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

        let mode;
        if (bot.player.getQueue(message).repeatMode) mode = 'Looping Song'
        else if (bot.player.getQueue(message).loopMode) mode = 'Looping Queue'
        else mode = 'None'
        
        message.channel.send({
            embed: {
                color: color.red,
                author: { 
                    name: track.title,
                    url: track.url
                },
                fields: [    
                    { name: 'Requested by', value: `<@${track.requestedBy.id}>` },
					{ name: 'Channel', value: track.author },
                    { name: 'Views', value: track.views },
                    { name: 'Duration', value: track.duration },
                    { name: 'Volume', value: bot.player.getQueue(message).volume },
                    { name: 'Loop Mode', value: mode },
                    { name: 'Currently paused', value: bot.player.getQueue(message).paused ? 'Yes' : 'No' },

                    { name: 'Progress bar', value: bot.player.createProgressBar(message, { timecodes: true }) }
                ],
                timestamp: new Date()
            }
        })
	}
}