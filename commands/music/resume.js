module.exports = {
	name : "resume",
	description: "Resume the current music",
	async execute(bot, message, args) {

		if (!message.member.voice.channel) return message.reply('You\'re not in a voice channel')
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply('You are not in the same voice channel')
        if (!bot.player.getQueue(message)) return message.reply('There\'s no music playing')
        if (bot.player.getQueue(message).paused) return message.reply('The music is already playing')

        const success = bot.player.resume(message)
        if (success) message.channel.send('Song resumed')
	}
}