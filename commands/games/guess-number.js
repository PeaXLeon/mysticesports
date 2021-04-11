module.exports = {
    name: 'guess-number',
    aliases: ['gtn', 'guessnumber'],
    async execute(bot, message, args) {

        const number = '4718'
        if (message.channel.id !== "811049390834843688") return
        if (message.author.id !== "457655635748847627") return

        message.channel.send(`**Guess The Number!**\nGuess the right number between 1 and 10000 and win the $15 cash prize!`)

        const { author } = (await message.channel.awaitMessages(
          msg => msg.content === number,
          { max: 1}
        )).first()

        await message.channel.send(`**Congratulations <@${author.id}>! You have guessed the right number and won the $15 cash prize and the Mystic Guess the Number event.**`)
    }
}