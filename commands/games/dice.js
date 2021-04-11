const Discord = require("discord.js")
const eco = require("discord-economy")
const db = require("quick.db")
const ms = require("parse-ms")
const color = require("../../colors.json")
const { prefix, logo, emojiID } = require("../../config.json")

module.exports = {
    name: 'dice',
    description: 'Roll the dice for a chance to win money',
    aliases: ['roll', 'bet'],
    usage: `${prefix}dice [amount]`,
    async execute(bot, message, args) {

        const emoji = message.guild.emojis.cache.find(emoji => emoji.id === emojiID)
        let user = message.author

        let wallet = await eco.FetchBalance(user.id)
        
        let amount = args[0]
        if (!amount) return message.reply("Please specify the amount of coins you want to bet")
        if (amount > 50000) return message.reply(`You can't bet more than 50.000 ${emoji} at a time`)
        if (amount > wallet.balance) return message.reply("You don't have that much money")
        if (amount.includes("-")) return message.reply("You can't bet negative money")
        if (isNaN(amount)) return message.reply("That's not a number")

        let userboard = Math.floor(Math.random() * 6) + 1
        let botboard = Math.floor(Math.random() * 6) + 1

        let dice = db.fetch(`dice_${user.id}`)
        let timeout = 10000

        if (dice !== null && timeout - (Date.now() - dice) > 0) {
            let time = ms(timeout - (Date.now() - dice));

            message.reply(`Woah, slow down. You have to wait \`${time.seconds}s\``)
        } else {


            const embed = new Discord.MessageEmbed()
                .setAuthor("#StayMystic", logo)
                .setTitle("🎲 Roll the Dice 🎲")
                .setDescription(`You rolled a \`${userboard}\`!\nI rolled a \`${botboard}\`!`)

            if (userboard > botboard) {
                embed
                    .addField("Congratulations", `You won ${amount} ${emoji}!`)
                    .setColor(color.green)
                eco.AddToBalance(user.id, amount)
                db.set(`dice_${user.id}`, Date.now())

            } else if (userboard < botboard) {
                embed
                    .addField("Not so lucky", `You lost ${amount} ${emoji}!`)
                    .setColor(color.red)
                eco.SubtractFromBalance(user.id, amount)
                db.set(`dice_${user.id}`, Date.now())

            } else if (userboard = botboard) {
                embed
                    .addField("It's a tie", `You didn't lose or win any coins!`)
                    .setColor(color.gold)
                db.set(`dice_${user.id}`, Date.now())
            }

            message.channel.send(embed)
        }
    }
}