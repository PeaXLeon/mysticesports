const { prefix } = require("../../config.json")

module.exports = {
	name : "loop",
	description: "Loop the current queue",
    usage: `${prefix}loop [queue|song|none]`,
	async execute(bot, message, args){

		if (!message.member.voice.channel) return message.reply('You\'re not in a voice channel');
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply('You are not in the same voice channel');
        if (!bot.player.getQueue(message)) return message.reply('There\'s no music playing')
        
        if (!args[0]) return message.reply("What do you want to loop? (queue|song|none)")
		if (args[0] === 'queue') {
                bot.player.setLoopMode(message, true)
                message.channel.send('Looping the queue')
        } else if (args[0] === 'song') {
                bot.player.setRepeatMode(message, true)
                message.channel.send('Looping the song')   
        } else if (args[0] === 'none') {
            if (bot.player.getQueue(message).repeatMode) {
                bot.player.setRepeatMode(message, false);
                message.channel.send('Loop mode disabled');
            } else if (bot.player.getQueue(message).loopMode) {
                bot.player.setLoopMode(message, false);
                message.channel.send('Loop mode disabled');
            }
        }
	}
}