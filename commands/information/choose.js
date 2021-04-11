const { prefix } = require("../../config.json")

module.exports = {
    name: 'choose',
    description: 'Choose between 2 things',
    usage: `${prefix}choose [first thing] [second thing]`,
    async execute(bot, message, args) {

        let option1 = args[0]
        let option2 = args[1]

        if (args[2]) return message.reply("Only 2 words are allowed")

        const random = Math.floor(Math.random() * 2) + 1

        if (random === 1) {
            message.reply(option1)
        } else if (random === 2) {
            message.reply(option2)
        }
    }
}