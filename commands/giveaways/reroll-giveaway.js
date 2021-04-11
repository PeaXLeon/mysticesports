const ms = require('ms');
const config = require("../../config.json")

module.exports = {
    name: 'reroll-giveaway',
    description: 'Reroll a giveaway',
    aliases: ['gaw-reroll', 'reroll-gaw', 'greroll'],
    usage: `${config.prefix}reroll-giveaway [messageID]`,
 async execute(bot, message, args) {

    if(!message.member.hasPermission("ADMINISTRATOR")) return

    if(!args[0]) return message.reply('You have to specify a valid message ID!')

    let giveaway = 
    bot.giveaways.giveaways.find((g) => g.prize === args.join(' ')) ||
    bot.giveaways.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.reply('I was unable to find a giveaway for `'+ args.join(' ') +'`.');
    }

    bot.giveaways.reroll(giveaway.messageID)
    .then(() => {
        message.reply('Giveaway rerolled!');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} hasn't ended.`)){
            message.reply('This giveaway hasn\'t ended!');
        } else {
            console.error(e);
            message.reply('An error occured...');
        }
    });

}
}