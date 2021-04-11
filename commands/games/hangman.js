const Discord = require("discord.js")
const hangman = require("discord-hangman")
const eco = require("discord-economy")
const color = require("../../colors.json")
const { prefix, logo, emojiID } = require("../../config.json")

module.exports = {
    name: 'hangman',
    description: 'Play a game of hangman!',
    usage: `${prefix}hangman [solo | party]`,
    async execute(bot, message, args) {

        if (!args[0]) return message.channel.send("Please specify if you want to play against the bot (solo) or play party mode (party)")

        if (args[0] === "solo") {

            hangman.create(message.channel, 'random', {
                displayWordOnGameOver: false,
                messages: {
                    createNoPlayers: 'Maybe another time... no one joined the game',

                    gatherPlayersMsg: 'Write "join" in the chat or react with 📒 to participate in this game! You have 10 seconds.',

                    misses: 'Misses',
                    won: 'Congratulations! You won!',
                    gameOver: 'Game over!',
                    gameOverMsg: 'The word was {word}'
                }
            }).then(data => {

                if (!data.game) return;

                if (data.game.status === 'won') {

                    message.channel.send('Congratulations you found the word!');
                }
                else if (data.game.status === 'lost') {

                    message.channel.send(`You lost! The word was \`${data.game.word}\`.`);
                }
                else {
                    message.channel.send('15 minutes have passed! The game is over.'); // If no one answers for 15 minutes
                }
            })
        }

        if (args[0] === "party") {

            hangman.create(message.channel, 'custom', {
                displayWordOnGameOver: false,
                messages: {
                    createNoPlayers: 'Maybe in another time... no one joined the game',

                    customNotEnoughPlayers: 'There has to be at least 2 players for a party game, ',
                    customInitMessage: '{players} players have joined. Selecting a player to choose the word. Waiting for one of you to respond. Check your DMs!!',
                    customNoMoreWords: 'We ran out of players... Try again, I\'m sure you can do it better.',

                    gatherPlayersMsg: 'Write "join" in the chat or react with 📒 to participate in this game! You have 10 seconds.',

                    getWordFromPlayersDm: 'You are the chosen one!! Just write the word of your choice. You have 30 seconds. And remember, you can\'t participate in the game',
                    timesUpDm: 'Time\'s up sorry, you are disqualified.',
                    timesUpMsg: 'The chosen one didn\'t answser... selecting ANOTHER ONE',
                    wordSuccess: 'Nice word! Going back to the server...',
                    invalidWord: 'Thats not a valid word. No spaces, at least 3 characters.',
                    tooManyInvalidsWords: 'Sorry, too many invalid words, try again next game. You are disqualified.',

                    misses: 'Misses',
                    won: 'Congratulations! You won!',
                    gameOver: 'Game over!',
                    gameOverMsg: 'The word was {word}'
                }
            }).then(data => {

                if (!data.game) return;

                if (data.game.status === 'won') {
                    if (data.selector) message.channel.send(`Congratulations, you found the word! ${data.selector.username}, you should provide a more complicated word next time!`)
                    else message.channel.send('Congratulations you found the word!');
                }
                else if (data.game.status === 'lost') {
                    if (data.selector) message.channel.send(`${data.selector.username} has beaten you all! The word was ${data.game.word}.`);
                    else message.channel.send(`You lost! The word was \`${data.game.word}\`.`);
                }
                else {
                    message.channel.send('15 minutes have passed! The game is over.'); // If no one answers for 15 minutes
                }
            })
        }
    }
}