module.exports = {
    name: 'roll',
    description: 'Roll a random number from 1 to 100',
    async execute(bot, message, args) {

        let random = Math.floor(Math.random() * 100) + 1
        message.reply(random)
    }
}