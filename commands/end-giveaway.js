const ms = require('ms');
const config = require("../config.json")

module.exports = {
    name: 'end-giveaway',
    description: 'End a running giveaway',
    usage: `${config.prefix}end-giveaway [message ID]`,
    aliases: ['endgaw', 'end-gaw', 'gaw-end'],
    async execute(bot, message, args) {

        if (!message.member.roles.cache.some((r) => r.name === "⤷ Events Manager")) {
            return message.channel.send('You need to have the Events Manager role to end giveaways.');
        }

        if (!args[0]) {
            return message.channel.send('You have to specify a valid message ID!');
        }

        let giveaway =
            bot.giveaways.giveaways.find((g) => g.prize === args.join(' ')) ||
            bot.giveaways.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) {
            return message.channel.send('I was unable to find a giveaway for `' + args.join(' ') + '`.');
        }

        bot.giveaways.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        })
            .then(() => {
                message.channel.send('Giveaway will end in less than ' + (bot.giveaways.options.updateCountdownEvery / 1000) + ' seconds...');
            })
            .catch((e) => {
                if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)) {
                    message.channel.send('This giveaway is already ended!');
                } else {
                    console.error(e);
                    message.channel.send('An error occured...');
                }
            });

    }
}
