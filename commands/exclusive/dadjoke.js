const dadjoke = require("discord-jokes")
const { execute } = require("../general/help")

module.exports = {
    name: 'dadjoke',
    description: 'Sends a *funny* dad joke',
    async execute(bot, message, args) {

        dadjoke.getRandomDadJoke (function(joke) {
            message.channel.send(joke)
        })
    }
}