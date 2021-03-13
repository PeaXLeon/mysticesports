const Discord = require('discord.js')
const eco = require("discord-economy")
const djs = require("djs-economy")
const color = require("../colors.json")
const { prefix, logo } = require("../config.json")

module.exports = {
    name: 'balance',
    description: 'Shows your balance',
    aliases: ['bal'],
    usage: `${prefix}balance [user]`,
    async execute(bot, message, args) {

        let user = message.mentions.users.first() || message.author;

        let bal = await eco.FetchBalance(user.id)
        if (bal === null) bal = 0;

        let bank = await djs.GetCash(user.id)
        if (bank === null) bank = 0;

        let moneyEmbed = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setTitle(`${user.username}'s Balance`)
            .setDescription(`**Wallet:** ${bal.balance}\n**Bank:** ${bank.cash}\n**Net Worth:** ${bal.balance + bank.cash}`)
            .setColor(color.blue)
            .setFooter("#StayMystic", logo)
            .setTimestamp()
        message.channel.send(moneyEmbed)
    }
}