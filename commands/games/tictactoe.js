const { tictactoe } = require('reconlx')
const { ReactionCollector } = require("discord.js-collector")
const { prefix } = require("../../config.json")

module.exports = {
    name: 'tictactoe',
    description: 'Play some tictactoe against another player',
    aliases: ['ttt'],
    usage: `${prefix}ttt [@opponent]`,
    async execute(bot, message, args) {

        const member = message.mentions.users.first() 
        if(!member) return  message.reply('Please specify who you want to play against')
        
        const botMessage = await message.channel.send(`<@${member.id}>, do you accept ${message.author.username}'s challenge?`)
        if (await ReactionCollector.yesNoQuestion({ user: member, botMessage})) {

            botMessage.delete()

            new tictactoe({
            player_two: member, 
            message: message
        })
        } else {
            return message.channel.send(`Unfortunately ${member.username} didn't accept the challenge...`)
        }
        
    }
}