const Discord = require("discord.js")
const color = require("../../colors.json")
const eco = require("discord-economy")
const { logo, emojiID } = require("../../config.json")
const { ReactionCollector } = require("discord.js-collector")

module.exports = {
    name: 'cups',
    description: 'Try to guess what cup contains the coins',
    async execute(bot, message, args) {

        const emoji = message.guild.emojis.cache.find(emoji => emoji.id === emojiID)
        const random = Math.floor(Math.random() * 3) + 1
        let choice = new Number
        let amount = 200

        let cups = db.fetch(`cups_${message.author.id}`)
        let timeout = 7000

        if (cups !== null && timeout - (Date.now() - cups) > 0) {
            let time = ms(timeout - (Date.now() - cups));

            message.reply(`Woah, slow down. You have to wait \`${time.seconds}s\``)
        } else {
        const embed = new Discord.MessageEmbed()
            .setAuthor("#StayMystic", logo)
            .setTitle("Cups Game")
            .setDescription("• 🥤 🥤 🥤 •")
            .setFooter("Where do you think the coins are?")
            .setColor(color.blue)

        let botMessage = await message.channel.send(embed)
        ReactionCollector.question({
            botMessage,
            user: message.author,
            reactions: {
                '1️⃣': async (reaction) => {
                    choice = 1
                    if (choice === random) {
                        embed
                            .addField("Congratulations", `You won ${amount} ${emoji}`)
                        eco.AddToBalance(message.author.id, amount)
                    } else {
                        embed
                            .addField("Try again", "The coins weren't hidden there")
                    }
                    botMessage.edit(embed)
                },
                '2️⃣': async (reaction) => {
                    choice = 2
                    if (choice === random) {
                        embed
                            .addField("Congratulations", `You won ${amount} ${emoji}`)
                        eco.AddToBalance(message.author.id, amount)
                    } else {
                        embed
                            .addField("Try again", "The coins weren't hidden there")
                    }
                    botMessage.edit(embed)
                },
                '3️⃣': async (reaction) => {
                    choice = 3
                    if (choice === random) {
                        embed
                            .addField("Congratulations", `You won ${amount} ${emoji}`)
                        eco.AddToBalance(message.author.id, amount)
                    } else {
                        embed
                            .addField("Try again", "The coins weren't hidden there")
                    }
                    botMessage.edit(embed)
                }
            }
        })
       }
    }
}