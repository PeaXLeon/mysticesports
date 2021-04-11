module.exports = {
	name : "stop",
	description: "Stop the music and disconnect me",
	aliases : ["disconnect","dc"],
	async execute(bot, message, args) {

		if (!message.member.voice.channel) return message.reply('You\'re not in a voice channel');
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply('You are not in the same voice channel');

        if (!bot.player.getQueue(message)) return message.reply('There\'s no music playing');

        bot.player.setRepeatMode(message, false);
        const success = bot.player.stop(message);

        if (success) message.channel.send('Succesfully stopped the queue and left the voice channel. Until next time!');
	}
}