const Discord = require("discord.js")
const color = require("../../colors.json")
const { logo } = require("../../config.json")

module.exports = {
	name: 'chatrewards',
    description: "A quick explanation of Mystic's chat rewards",
    aliases: ['rewards', 'chatrwrds'],
    async execute(bot, message, args) {
    	
        const embed = new Discord.MessageEmbed()
        	.setAuthor("#StayMystic", logo)
            .setTitle("Mystic Chat Rewards")
            .setDescription("Every month the 2 most chatters will be rewarded with special prizes. Then, everyone's message count will be resetted and a new Chat Rewards Season begins")
            .addField("1st Place Prize", "$10 Discord Nitro")
            .addField("2nd Place Prize", "$5 Discord Nitro")
        	.setColor(color.gold)
            .setFooter("Good luck y'all")
    	message.channel.send(embed)
    }
}