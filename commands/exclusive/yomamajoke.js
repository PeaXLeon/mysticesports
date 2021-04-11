const yoMamma = require("yo-mamma").default

module.exports = {
    name: 'yomamajoke',
    description: 'Get the best your mama jokes',
    aliases: ['yomama', 'yourmama'],
    async execute(bot, message, args) {

        let insult;
        insult = yoMamma()

        message.channel.send(insult)
    }
}