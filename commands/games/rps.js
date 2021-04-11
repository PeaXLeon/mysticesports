const Discord = require("discord.js");
const color = require("../../colors.json")
const { logo } = require("../../config.json")

const chooseArr = ["🪨", "📰", "✂"];

module.exports = {
    name: "rps",
    description: "Play a game of Rock, Paper, Scissor.",
    async execute(bot, message, args) {

        const embed = new Discord.MessageEmbed()
            .setAuthor("#StayMystic", logo)
            .setDescription("Add a reaction to one of these emojis to play the game!")
            .setColor(color.gold)

            async function promptMessage(message, author, time, validReactions) {
                // We put in the time as seconds, with this it's being transfered to MS
                time *= 1000;
            
                // For every emoji in the function parameters, react in the good order.
                for (const reaction of validReactions) await message.react(reaction);
            
                // Only allow reactions from the author, 
                // and the emoji must be in the array we provided.
                const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
            
                // And ofcourse, await the reactions
                return message
                    .awaitReactions(filter, { max: 1, time: time})
                    .then(collected => collected.first() && collected.first().emoji.name);
            }
        m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        const result = await getResult(reacted, botChoice);
        await m.reactions.removeAll();

        embed
            .setDescription("")
            .setTitle("🪨 Rock, Paper, Scissor ✂")
            .addField(result, `You ${reacted} - ${botChoice} Me`)

        m.edit(embed);

        function getResult(me, clientChosen) {
            if ((me === "🪨" && clientChosen === "✂") ||
                (me === "📰" && clientChosen === "🪨") ||
                (me === "✂" && clientChosen === "📰")) {
                    return "You won!";
            } else if (me === clientChosen) {
                return "It's a tie!";
            } else {
                return "You lost!";
            }
        }
    }
}