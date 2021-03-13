const { MessageEmbed } = require('discord.js');
const { ReactionCollector } = require("discord.js-collector");
const { prefix, logo } = require("../config.json")

module.exports = {
    name: 'help',
    description: 'Sends a list of all my commands',
    async execute(bot, message, args) {

        const data = [];
        const { commands } = message.client;
        
    if (!args.length) {
        
        const botMessage = await message.channel.send(`⁣ `);
        ReactionCollector.paginator({
            botMessage,
            user: message.author,
            deleteAllOnEnd: false,
            collectorOptions: {
                time: 30000
            },
            reactions: {
            '⏪': async (_reaction, _collector, botMessage, pages) => {
                pages.index = 0;
                await botMessage.edit({ embed: pages[pages.index] });
            },
            '◀️': async (_reaction, _collector, botMessage, pages) => {
                pages.index--;
                if (pages.index <= 0) pages.index = 0;
                await botMessage.edit({ embed: pages[pages.index] });
            },
            '▶️': async (_reaction, _collector, botMessage, pages) => {
                pages.index++;
                if (pages.index >= pages.length) pages.index = pages.length - 1;
                await botMessage.edit({ embed: pages[pages.index] });
            },
            '⏩': async (_reaction, _collector, botMessage, pages) => {
                pages.index = pages.length - 1;
                await botMessage.edit({ embed: pages[pages.index] });
            },
            '❌': async (_reaction, collector, _botMessage, _pages) => {
                collector.stop();
            }
        },
            pages: [

                new MessageEmbed()
                    .setTitle('Mystic Esports Commands\n✨ Fun ✨')                    
                    .setAuthor('#StayMystic', logo)
                    .setDescription(`Use \`${prefix}help [command]\` for more info`)
                    .addFields(
                        { name: '`help`', value: 'Sends this message' },
                        { name: '`ping`', value: 'Test your internet connection' },
                        { name: '`8ball`', value: 'Ask a question to the mighty 8ball' },
                        { name: '`meme`', value: 'Get a meme from r/dankmemes' }
                    )
                    .setColor('#8098EA')
                    .setFooter('Use the reactions to navigate between pages • 📖 Page 1/5')
                    .setThumbnail(bot.user.displayAvatarURL()),

                new MessageEmbed()
                    .setTitle('Mystic Esports Commands\nℹ️ Information ℹ️')
                    .setAuthor('#StayMystic', logo)
                    .setDescription(`Use \`${prefix}help [command]\` for more info`)
                    .addFields(
                        { name: '`avatar`', value: "Gets a member's avatar" },
                        { name: '`whois`', value: "All the information about a member" },
                        { name: '`server-info`', value: "Gets info about this server" },
                        { name: '`roleinfo`', value: "Gets info about a role" },
                        { name: '`verify`', value: "Verify a user! (Only for Staff)" }
                    )
                    .setColor('#8098EA')
                    .setFooter('Use the reactions to navigate between pages • 📖 Page 2/5')
                    .setThumbnail(bot.user.displayAvatarURL()),

                new MessageEmbed()
                    .setTitle('Mystic Esports Commands\n🛠️ Moderation 🛠️')                    
                    .setAuthor('#StayMystic', logo)
                    .setDescription(`Use \`${prefix}help [command]\` for more info`)
                    .addFields(
                        { name: '`ban`', value: "Bans a member" },
                        { name: '`unban`', value: "Unbans a user" },
                        { name: '`kick`', value: "Kicks a member" },
                        { name: '`mute`', value: "Mutes a member" },
                        { name: '`unmute`', value: 'Unmutes a member' },
                        { name: '`warn`', value: "Warns a member" },
                        { name: '`warnings`', value: 'See how many warnings a member has' },
                        { name: '`reset-warns`', value: 'Reset the warnings of a member' },
                        { name: '`role`', value: "Gives/removes a role to/from a member" },
                        { name: '`clear`', value: "Deletes a certain amount of messages" }
                    )
                    .setColor('#8098EA')
                    .setFooter('Use the reactions to navigate between pages • 📖 Page 3/5')
                    .setThumbnail(bot.user.displayAvatarURL()),

                new MessageEmbed()
                    .setTitle('Mystic Esports Commands\n💰 Economy 💰')                    
                    .setAuthor('#StayMystic', logo)
                    .setDescription(`Use \`${prefix}help [command]\` for more info`)
                    .addFields(
                        { name: '`balance`', value: 'Shows your or someone else\'s balance' },
                        { name: '`withdraw`', value: "Withdraw your money from your bank" },
                        { name: '`deposit`', value: "Deposit your money into your bank" },
                        { name: '`daily`', value: "Get your daily reward" },
                        { name: '`weekly`', value: "Get your weekly reward" },
                        { name: '`leaderboard`', value: "Who is the best of the best?" },
                        { name: '`rob`', value: "Rob someone" },
                        { name: '`beg`', value: "Beg for money" },
                        { name: '`sports`', value: 'Play to earn money' },
                        { name: '`work`', value: "Work to earn easy money" },
                        { name: '`share`', value: "Share your money with others" },
                        { name: '`store`', value: 'Open up the shop'},
                        { name: '`buy`', value: 'Buy an item from the shop'},
                        { name: '`remove-money`', value: 'Remove money from a user (Admin Only)' },
                        { name: '`add-money`', value: 'Give money to a user (Admin Only)' }
                    )
                    .setColor('#8098EA')
                    .setFooter('Use the reactions to navigate between pages • 📖 Page 4/5')
                    .setThumbnail(bot.user.displayAvatarURL()),

                    new MessageEmbed()
                    .setTitle('Mystic Esports Commands\n🎉 Giveaways 🎉')                    
                    .setAuthor('#StayMystic', logo)
                    .setDescription(`Use \`${prefix}help [command]\` for more info`)
                    .addFields(
                        { name: '`start-giveaway`', value: 'Start a giveaway' },
                        { name: '`end-giveaway`', value: 'End a giveaway' },
                        { name: '`reroll-giveaway`', value: 'Reroll a giveaway' }
                    )
                    .setColor('#8098EA')
                    .setFooter('Use the reactions to navigate between pages • 📖 Page 5/5')
                    .setThumbnail(bot.user.displayAvatarURL()),

                    new MessageEmbed()
                    .setTitle('Mystic Esports Credits')
                    .setAuthor('#StayMystic', logo)
                    .setDescription('A special thanks to these amazing people:')
                    .addField("My creator", "RocketFlashXD", true)
                    .addField("Mystic Esports Owner", "Mystic Winter✨", true)
                    .addFields(
                        { name: "And to the people who helped out:", 
                        value: 
                        `*BlueDragon*, *Waffles*, *Nik0*,\n*Comy*, *I am BOSS*, *Dark Dare Devil*`}
                    )
                    .setColor('#8098EA')
                    .setFooter('Thanks to these people!')
                    .setThumbnail(bot.user.displayAvatarURL())
            ]
        });
    } else {
        const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('That\'s not a valid command!');
		}

        data.push(`**Name:** ${command.name}`)
        
		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${command.usage}`);

		message.channel.send(data, { split: true });
        }
    }      
};