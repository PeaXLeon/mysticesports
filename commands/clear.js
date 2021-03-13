const { MessageEmbed } = require('discord.js');
const { prefix } = require("../config.json");
module.exports = {
    name: "clear",
    aliases: ['purge', 'del', 'delete'],
    description: "Cleares a certain amount of messages",
    usage: `${prefix}clear [amount]`,
    async execute(bot, message, args) {

        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.channel.send(`You don't have permission to use that command`);
        if (!args[0]) {
            return message.channel.send(`Please enter a amount 1 to 100`)
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100 ) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        await message.channel.bulkDelete(deleteAmount, true);

        let msg = "messages";
        if (deleteAmount === 1) {
            msg = "message"
        }
        await message.channel.send(`Deleted ${deleteAmount} ${msg}`).then(m => {
            m.delete({ timeout: 3000 })
        })
    }
}