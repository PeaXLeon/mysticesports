const Discord = require('discord.js')
const eco = require("discord-economy")
const djs = require("djs-economy")
const { prefix, logo, emojiID, RocketDiscordID } = require("../../config.json")
const color = require("../../colors.json")

module.exports = {
    name: 'add-money',
    description: 'Add money to a user',
    aliases: ['addmoney', 'givemoney', 'give-money'],
    usage: `${prefix}add-money [amount] [bank | wallet] [user]`,
    async execute(bot, message, args) {

        const emoji = message.guild.emojis.cache.find(emoji => emoji.id === emojiID)
        if (!message.member.hasPermission('MANAGE_GUILD') && message.author.id !== RocketDiscordID) return

        let user = message.mentions.users.first()

        if (!user) return message.reply("Please specify a user.")
        if (!args[0]) return message.reply('Please specify an amount to add.')
        if (!args[1]) return message.reply('Please specify if you want to add it to the bank or the wallet.')
        if (isNaN(args[0])) return message.reply('That\'s not a valid number!')

        if (args[1] === "bank") {

            djs.AddCash(user.id, args[0])
            let bank = await djs.GetCash(user.id)

            let embedbank = new Discord.MessageEmbed()
                .setAuthor(`Added money to ${user.username}'s bank!`, message.author.displayAvatarURL)
                .addField(`Amount`, `${args[0]} ${emoji}`, true)
                .addField(`New Balance`, `${bank.cash} ${emoji}`, true)
                .setColor(color.green)
                .setFooter("#StayMystic", logo)
                .setTimestamp()
            message.channel.send(embedbank)

        } else if (args[1] === "wallet") {

            eco.AddToBalance(user.id, args[0])
            let wallet = await eco.FetchBalance(user.id)

            let embedwallet = new Discord.MessageEmbed()
                .setAuthor(`Added money to ${user.username}'s wallet!`, message.author.displayAvatarURL)
                .addField(`Amount`, `${args[0]} ${emoji}`, true)
                .addField(`New Balance`, `${wallet.balance} ${emoji}`, true)
                .setColor(color.green)
                .setFooter("#StayMystic", logo)
                .setTimestamp()
            message.channel.send(embedwallet)
        }
    }
}