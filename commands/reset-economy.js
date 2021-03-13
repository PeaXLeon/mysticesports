const Discord = require("discord.js")
const config = require("../config.json")
const db = require("quick.db")
const { ReactionCollector } = require("discord.js-collector")

module.exports = {
    name: 'reset-economy',
    description: 'Reset the whole economy',
    aliases: ['reseteconomy', 'reconomy'],
    async execute(bot, message, args) {

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You don\'t have permission to use that command')

        const botMessage = await message.channel.send("Are you sure you want to reset the whole economy?")
        if (await ReactionCollector.yesNoQuestion({
            user: message.author,
            botMessage,
            collectorOptions: {
                time: 30000
            }
        })) {
            await db.all().forEach((user) => {
                db.delete(`money_${user.id}`)
                db.delete(`bank_${user.id}`)
            })
            message.channel.send("Succesfully reset the economy!")
        } else {
            message.channel.send("Ok, operation cancelled!")
        }
    }
}