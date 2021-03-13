const ms = require('ms');
const config = require("../config.json")

module.exports = {
    name: 'reroll-giveaway',
    description: 'Reroll a giveaway',
    aliases: ['gaw-reroll', 'reroll-gaw', 'greroll'],
    usage: `${config.prefix}reroll-giveaway [messageID]`,
 async execute(bot, message, args) {

    if(!message.member.roles.cache.some((r) => r.name === "⤷ Events Manager")){
        return message.channel.send('You need to have the Events Manager role to reroll giveaways.');
    }

    if(!args[0]){
        return message.channel.send('You have to specify a valid message ID!');
    }

    let giveaway = 
    bot.giveaways.giveaways.find((g) => g.prize === args.join(' ')) ||
    bot.giveaways.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.channel.send('I was unable to find a giveaway for `'+ args.join(' ') +'`.');
    }

    bot.giveaways.reroll(giveaway.messageID)
    .then(() => {
        message.channel.send('Giveaway rerolled!');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} hasn't ended.`)){
            message.channel.send('This giveaway hasn\'t ended!');
        } else {
            console.error(e);
            message.channel.send('An error occured...');
        }
    });

}
}