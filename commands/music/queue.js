const Discord = require("discord.js")
const color = require("../../colors.json")

module.exports = {
	name : "queue",
	description: "Check the current queue",
    aliases: ['q'],
	async execute(bot, message, args) {

		if (!message.member.voice.channel) return message.reply('You\'re not in a voice channel');

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply('You are not in the same voice channel');

        const queue = bot.player.getQueue(message);
        if (!bot.player.getQueue(message)) return message.reply('There\'s no music playing');

        let fnlmsg =queue.tracks.map((track, i) => {
            return `**${i} -** ${track.title} | requested by <@${track.requestedBy.id}>`
        }).slice(1).join('\n')
        
        const embed = new Discord.MessageEmbed()
        .setAuthor("Server Queue")
        .setTitle(`Now playing: ${queue.playing.title} ${queue.playing.author}`)
        .setDescription(fnlmsg)
        .setColor(color.red)
        
        message.channel.send(embed);
	}
}