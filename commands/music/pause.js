module.exports = {
	name : "pause",
	description: "Pause the current music",
	async execute(bot, message, args) {

		if (!message.member.voice.channel) return message.reply('You\'re not in a voice channel');
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.sendreply('You are not in the same voice channel');
        if (!bot.player.getQueue(message)) return message.reply('There\'s no music playing');
        if (bot.player.getQueue(message).paused) return message.reply('The music is already paused');

        const success = bot.player.pause(message);
        if (success) message.channel.send('Song paused');
	}
}