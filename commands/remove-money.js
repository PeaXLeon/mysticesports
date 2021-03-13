const Discord = require('discord.js')
const eco = require("discord-economy")
const djs = require("djs-economy")
const { prefix, logo } = require("../config.json")
const color = require("../colors.json")

module.exports = {
    name: 'remove-money',
    description: 'Remove money from a user',
    aliases: ['takemoney', 'take-money', 'removemoney'],
    usage: `${prefix}remove-money [amount] [bank | wallet] [user]`,
    async execute(bot, message, args) {

        if (!message.member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send('You don\'t have permission to use this command.')
        }

        let user = message.mentions.users.first();

        let bal = await eco.FetchBalance(user.id)
        let bank = await djs.GetCash(user.id)

        if(bal === null) bal = 0;
        if(bank === null) bank = 0;

        if (!user) return message.channel.send("Please specify a user.")
        if (!args[0]) return message.channel.send('Please specify an amount to remove.')
        if (!args[1]) return message.channel.send('Please specify if you want to remove it from the bank or the wallet.')
        

        if (args[1] === "bank") {

            if (bank === 0) {

                return message.channel.send('That user has no coins in the bank')
            } else if (args[0] > bank) {

                return message.channel.send('That user doesn\'t have that many coins in the bank')
            } else if (args[0] === "all") {

                djs.SetCash(user.id, 0)

                let embedall = new Discord.MessageEmbed()
                    .setAuthor(`Removed all the coins from ${user.username}'s bank!`, message.author.displayAvatarURL)
                    .addField(`Amount`, `${bank.cash}`)
                    .setColor(color.red)
                    .setFooter("#StayMystic", logo)
                    .setTimestamp()
                message.channel.send(embedall)

            } else if (isFinite(args[0])) {

                djs.SubCash(user.id, args[0])
                let bank = await djs.GetCash(user.id)

                let embedbank = new Discord.MessageEmbed()
                    .setAuthor(`Removed money from ${user.username}'s bank!`, message.author.displayAvatarURL)
                    .addField(`Amount`, `${args[0]}`)
                    .addField(`New Balance`, `${bank.cash}`)
                    .setColor(color.red)
                    .setFooter("#StayMystic", logo)
                    .setTimestamp()
                message.channel.send(embedbank)

            } else if (isNaN(args[0])) {

                return message.channel.send('That\'s not a valid number')
            }

        } else if (args[1] === "wallet") {

            if (bal === 0) {

                return message.channel.send('That user has no coins in the wallet')
            } else if (args[0] > bal) {

                return message.channel.send('That user doesn\'t have that many coins in the wallet')
            } else if (args[0] === "all") {

                eco.SetBalance(user.id, 0)

                let embedall = new Discord.MessageEmbed()
                    .setAuthor(`Removed all the coins from ${user.username}'s wallet!`, message.author.displayAvatarURL)
                    .addField(`Amount`, `${bal.balance}`)
                    .setColor(color.red)
                    .setTimestamp()
                message.channel.send(embedall)

            } else if (isFinite(args[0])) {

                eco.SubtractFromBalance(user.id, args[0])
                let bal = await eco.FetchBalance(user.id)

                let embedwallet = new Discord.MessageEmbed()
                    .setAuthor(`Removed money from ${user.username}'s wallet!`, message.author.displayAvatarURL)
                    .addField(`Amount`, `${args[0]}`)
                    .addField(`New Balance`, `${bal.balance}`)
                    .setColor(color.red)
                    .setTimestamp()
                message.channel.send(embedwallet)

            } else if (isNaN(args[0])) {
                return message.channel.send('That\'s not a valid number')
            }
        }
    }
}