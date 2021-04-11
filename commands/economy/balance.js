const Discord = require('discord.js')
const db = require("quick.db")
const eco = require("discord-economy")
const djs = require("djs-economy")
const color = require("../../colors.json")
const { prefix, logo, emojiID } = require("../../config.json")

module.exports = {
    name: 'balance',
    description: 'Shows your balance',
    aliases: ['bal'],
    usage: `${prefix}balance [user]`,
    async execute(bot, message, args) {

        const emoji = message.guild.emojis.cache.find(emoji => emoji.id === emojiID)
        let user = message.mentions.users.first() || message.author;

        let bal = await eco.FetchBalance(user.id)
        if (bal === null) bal = 0;

        let bank = await djs.GetCash(user.id)
        if (bank === null) bank = 0;

        db.set(`net_${user.id}`, bal.balance + bank.cash)
        let net = db.fetch(`net_${user.id}`)

        let moneyEmbed = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setTitle(`${user.username}'s Balance`)
            .setDescription(`**Wallet:** ${bal.balance} ${emoji}\n**Bank:** ${bank.cash} ${emoji}\n**Net Worth:** ${net} ${emoji}`)
            .setColor(color.blue)
            .setFooter("#StayMystic", logo)
            .setTimestamp()
        message.channel.send(moneyEmbed)
    }
}