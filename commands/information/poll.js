const Discord = require("discord.js")
const color = require("../../colors.json")
const { prefix, logo } = require("../../config.json")

module.exports = {
    name: 'poll',
    description: 'Create a quick yes/no poll',
    usage: `${prefix}poll [question]`,
    async execute(bot, message, args) {

        let question = args.join(" ")
        if(!question) return message.channel.send("Please provide a question")

        const embed = new Discord.MessageEmbed()
            .setAuthor("#StayMystic", logo)
            .setTitle('New Poll!')
            .addFields(
                { name: 'Question:', value: question },
                { name: 'Author:', value: message.author }
            )
            .setColor(color.blue)
        let msg = await message.channel.send(embed)
        await msg.react("👍")
        await msg.react("👎")
        
    }
}