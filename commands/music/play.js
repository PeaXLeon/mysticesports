const { prefix } = require("../../config.json")

module.exports = {
    name: "play",
    description: 'Play music on a voice channel',
  	aliases: ['p'],
    usage: `${prefix}play [query | link]`,
    async execute(bot, message, args) {
        
		const name = args.join(" ");
		if(!name) return message.reply("Please enter a search query or link")
			
		const voice = message.member.voice.channel;
		if(!voice) return message.reply("You need to be in a voice channel to play music")

		const perms = voice.permissionsFor(bot.user);
		if(!perms.has("CONNECT") || !perms.has("SPEAK")) return message.reply("I don't have permission to play music on that voice channel")

		await bot.player.play(message, name);
	}
}
