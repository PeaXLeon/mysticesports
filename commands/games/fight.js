const Discord = require("discord.js")
const minigames = require("discord-minigames")
const { prefix, logo, emojiID } = require("../../config.json")

module.exports = {
    name: 'fight',
    description: 'Fight against another player for money',
    aliases: ['battle', 'challenge'],
    usage: `${prefix}duel [amount] [@opponent]`,
    async execute(bot, message, args) {

        let member = message.mentions.members.first()
        if (!member) return message.reply("Please mention the person you want to fight")
        minigames.startBattle(member, message)
    }        
}