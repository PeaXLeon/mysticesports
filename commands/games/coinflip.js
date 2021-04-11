const Discord = require("discord.js")
const eco = require("discord-economy")
const db = require("quick.db")
const ms = require("parse-ms")
const color = require("../../colors.json")
const { prefix, logo, emojiID } = require("../../config.json")

module.exports = {
    name: 'coinflip',
    description: 'Flip the coin and try to guess the outcome',
    aliases: ['cf', 'flip'],
    usage: `${prefix}coinflip [heads | tails]`,
    async execute(bot, message, args) {

        const emoji = message.guild.emojis.cache.find(emoji => emoji.id === emojiID)
        let user = message.author

        let flip = args[0]
        let amount = 50
        let loseamount = 50

        if (!flip || !['heads', 'tails'].includes(flip)) return message.reply('Please specify the flip, either `heads` or `tails`')

        const headOrTail = ['heads', 'tails']
        const rand = headOrTail[Math.floor(Math.random() * headOrTail.length)]

        let cf = db.fetch(`cf_${user.id}`)
        let timeout = 15000

        if (cf !== null && timeout - (Date.now() - cf) > 0) {
            let time = ms(timeout - (Date.now() - cf));

            message.reply(`Woah, slow down. You have to wait \`${time.seconds}s\``)
        } else {

            const embed = new Discord.MessageEmbed()
                .setAuthor("#StayMystic", logo)
                .setTitle("🪙 Coinflip 🪙")
                .setDescription("The coin landed on **" + rand + "**!")

            if (flip === rand) {
                embed
                    .addField("Congratulations", `You won ${amount} ${emoji}`)
                    .setColor(color.green)

                eco.AddToBalance(user.id, amount)
                db.set(`cf_${user.id}`, Date.now())
            } else if (flip !== rand) {
                embed
                    .addField("Not so lucky", `You lost ${loseamount} ${emoji}`)
                    .setColor(color.red)

                eco.SubtractFromBalance(user.id, loseamount)
                db.set(`cf_${user.id}`, Date.now())
            }
            message.channel.send(embed)
        }
    }
}