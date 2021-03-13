const ms = require('ms');
const Discord = require("discord.js")
const config  = require("../config.json")
const color = require("../colors.json")


module.exports = {
name: "start-giveaway",
description: "Start a giveaway",
usage: `${config.prefix}start-giveaway [#channel] [duration] [amount of winners] [prize]`,
aliases: ["gaw", "startgaw", "giveaway"],
async execute(bot, message, args) {

    if(!message.member.roles.cache.some(r => r.name === "⤷ Events Manager")){
        return message.channel.send('You need to have the Events Manager role to start giveaways.');
    }

    let giveawayChannel = message.mentions.channels.first();
    if(!giveawayChannel){
        return message.channel.send('You have to mention a valid channel!');
    }

    let giveawayDuration = args[1];
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send('You have to specify a valid duration!');
    }

    let giveawayNumberWinners = args[2];
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send('You have to specify a valid number of winners!');
    }

    let giveawayPrize = args.slice(3).join(' ');
    if(!giveawayPrize){
        return message.channel.send('You have to specify a valid prize!');
    }

    bot.giveaways.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: giveawayNumberWinners,
        hostedBy: config.hostedBy ? message.author : null,
        messages: {
            giveaway: "🎉 **GIVEAWAY** 🎉",
            giveawayEnded: "🎉 **GIVEAWAY ENDED** 🎉",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with 🎉 to participate!",
            winMessage: `Congratulations, {winners}! You won **{prize}**!`,
            embedFooter: "Mystic Giveaways",
            noWinner: "Giveaway cancelled, no valid participations.",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`Giveaway started in ${giveawayChannel}!`);

    }
}