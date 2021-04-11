const Discord = require("discord.js")
const color = require("../../colors.json")
const db = require("quick.db")
const ms = require("parse-ms")
const { prefix, logo, RocketDiscordID } = require("../../config.json")

module.exports = {
    name: 'suggest',
    description: 'Suggest a new command or feature to add to me',
    usage: `${prefix}suggest [suggestion]`,
    async execute(bot, message, args) {

        let suggestion = args.join(' ')
        let rocket = message.guild.members.cache.get(RocketDiscordID)

        if (!suggestion) return message.reply("Please enter a suggestion")

        let suggest = db.fetch(`suggest_${message.author.id}`)
        let timeout = 21600000

        if (suggest !== null && timeout - (Date.now() - suggest) > 0) {
            let time = ms(timeout - (Date.now() - suggest));

            message.reply(`Woah, slow down. You have to wait \`${time.hours}h ${time.minutes}m ${time.seconds}s\``)
        } else {
            
        let rocketEmbed = new Discord.MessageEmbed()
            .setAuthor("#StayMystic", logo)
            .setTitle("A new suggestion has arrived")
            .setDescription(suggestion)
            .setFooter(`Suggestion from ${message.author.username}`)
            .setTimestamp()
            .setColor(color.green)

        let embed = new Discord.MessageEmbed()
            .setAuthor("#StayMystic", logo)
            .setTitle("Thanks for your suggestion")
            .setDescription("Your suggestion was sent to my owner")
            .addField("Your suggestion:", suggestion)
            .setTimestamp()
            .setColor(color.gold)
        
        db.set(`suggest_${message.author.id}`, Date.now())
            await message.delete().then(() => {
                rocket.user.send(rocketEmbed)
                message.channel.send(embed)
            })
        }
    }
}