const api = require("random-stuff-api")

module.exports = {
    name: 'joke',
    description: 'Sends a random joke',
    async execute(bot, message, args) {

        const joke = await api.random.joke()
        message.channel.send(joke)
    }
}