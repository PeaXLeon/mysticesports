const Discord = require('discord.js')
const eco = require("discord-economy")
const djs = require("djs-economy")
const { prefix, logo } = require("../config.json")
const color = require("../colors.json")

module.exports = {
    name: 'add-money',
    description: 'Add money to a user',
    aliases: ['addmoney', 'givemoney', 'give-money'],
    usage: `${prefix}add-money [amount] [bank | wallet] [user]`,
    async execute(bot, message, args) {

        if (!message.member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send('You don\'t have permission to use this command.')
        }

        let user = message.mentions.users.first()

        if (!user) return message.channel.send("Please specify a user.")
        if (!args[0]) return message.channel.send('Please specify an amount to add.')
        if (!args[1]) return message.channel.send('Please specify if you want to add it to the bank or the wallet.')
        if (isNaN(args[0])) return message.reply('That\'s not a valid number!')

        if (args[1] === "bank") {

            djs.AddCash(user.id, args[0])
            let bank = await djs.GetCash(user.id)

            let embedbank = new Discord.MessageEmbed()
                .setAuthor(`Added money to ${user.username}'s bank!`, message.author.displayAvatarURL)
                .addField(`Amount`, `${args[0]}`, true)
                .addField(`New Balance`, bank.cash, true)
                .setColor(color.green)
                .setFooter("#StayMystic", logo)
                .setTimestamp()
            message.channel.send(embedbank)

        } else if (args[1] === "wallet") {

            eco.AddToBalance(user.id, args[0])
            let wallet = await eco.FetchBalance(user.id)

            let embedwallet = new Discord.MessageEmbed()
                .setAuthor(`Added money to ${user.username}'s wallet!`, message.author.displayAvatarURL)
                .addField(`Amount`, `${args[0]}`, true)
                .addField(`New Balance`, wallet.balance, true)
                .setColor(color.green)
                .setFooter("#StayMystic", logo)
                .setTimestamp()
            message.channel.send(embedwallet)
        }
    }
}