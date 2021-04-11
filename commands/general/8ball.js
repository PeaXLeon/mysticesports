const eightball   = [ // sets the answers to an eightball
    "Yes!",
    "No...",
    "Maybe",
    "Probably",
    "I don't think so",
    "Never!",
    "You can try...",
    "Only you can answer that question!",
    "It has great chances to be a yes!",
    "I have to think about that",
    "I suppose yes",
    "I'm a bot, do you think I know that?"
]
const { prefix } = require("../../config.json");

module.exports = {
    name: '8ball',
    aliases: ['ask'],
    description: 'Ask the mighty 8ball',
    usage: `${prefix}8ball [question]`,
    execute(bot, message, args) {
        
        let rand = Math.floor(Math.random() * eightball.length)
        
        if (args[1] != null) message.reply(eightball[rand])
        else message.reply("What do you pretend to ask?")
    }
}