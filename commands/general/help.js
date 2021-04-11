const Discord = require('discord.js');
const { ReactionCollector } = require("discord.js-collector");
const { prefix, logo, emojiID } = require("../../config.json")

module.exports = {
    name: 'help',
    description: 'Sends a list of all my commands',
    async execute(bot, message, args) {

        const emoji = message.guild.emojis.cache.find(emoji => emoji.id === emojiID)

        const data = [];
        const { commands } = message.client;
        
    if (!args.length) {
        
        const botMessage = await message.channel.send(`⁣ `);
        ReactionCollector.paginator({
            botMessage,
            user: message.author,
            collectorOptions: {
                time: 60000
            },
            reactions: {
                // '⏪': async (_reaction, _collector, botMessage, pages) => {
                //     pages.index = 0;
                //     await botMessage.edit({ embed: pages[pages.index] });
                // },
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
                // '⏩': async (_reaction, _collector, botMessage, pages) => {
                //     pages.index = pages.length - 1;
                //     await botMessage.edit({ embed: pages[pages.index] });
                // },
                // '❌': async (_reaction, collector, _botMessage, _pages) => {
                //     collector.stop();
                // }
            },
            pages: [

                new Discord.MessageEmbed()
                    .setTitle('Mystic Esports Commands\n⚔️ General ⚔️')                    
                    .setAuthor('#StayMystic', logo)
                    .setDescription(`Use \`${prefix}help [command]\` for more info`)
                    .addFields(
                        { name: '⚔️ `help`', value: 'Sends this message' },
                        { name: '⚔️ `ping`', value: 'Test my connection speed' },
                        { name: '⚔️ `8ball`', value: 'Ask a question to the mighty 8ball' },
                        { name: '⚔️ `meme`', value: 'Get a meme from r/memes' },
                        { name: '⚔️ `socials`', value: 'All of the Mystic Social Media' },
                        { name: '⚔️ `invite`', value: 'The invite to the Mystic Esports Discord Server' }
                    )
                    .setColor('#8098EA')
                    .setFooter('Use the reactions to navigate • 📖 Page 1/11')
                    .setThumbnail(bot.user.displayAvatarURL()),


                new Discord.MessageEmbed()
                    .setTitle('Mystic Esports Commands\nℹ️ Information ℹ️')
                    .setAuthor('#StayMystic', logo)
                    .setDescription(`Use \`${prefix}help [command]\` for more info`)
                    .addFields(
                        { name: 'ℹ️ `avatar`', value: "Gets a member's avatar" },
                        { name: 'ℹ️ `whois`', value: "All the information about a member" },
                        { name: 'ℹ️ `server-info`', value: "Gets info about this server" },
                        { name: 'ℹ️ `roleinfo`', value: "Gets info about a role" },
                        { name: 'ℹ️ `urban`', value: "Search up a word on the urban dictionary" },
                        { name: 'ℹ️ `youtube`', value: "Search for a video on youtube" },
                        { name: 'ℹ️ `gif`', value: "Search up a gif on tenor.com" },
                        { name: 'ℹ️ `image`', value: "Search an image on Google Images" },
                        { name: 'ℹ️ `roll`', value: 'Roll a random number from 1 to 100'},
                        { name: 'ℹ️ `choose`', value: 'Let the bot choose between 2 things'},
                        { name: 'ℹ️ `poll`', value: 'Create a quick yes/no poll'},
                        { name: 'ℹ️ `suggest`', value: 'Suggest a new command or feature to add to me'}
                    )
                    .setColor('#8098EA')
                    .setFooter('Use the reactions to navigate • 📖 Page 2/11')
                    .setThumbnail(bot.user.displayAvatarURL()),
                
				new Discord.MessageEmbed()
                    .setTitle('Mystic Esports Commands\n📷 Vanity 📷')                    
                    .setAuthor('#StayMystic', logo)
                    .setDescription(`Use \`${prefix}help [command]\` for more info`)
                    .addFields(
                        { name: '📷 `blur`', value: 'Blur out someone\'s avatar' },
                        { name: '📷 `gay`', value: 'Someone is looking kinda gay' },
                        { name: '📷 `greyscale`', value: 'Remove the color from someone\'s avatar' },
                        { name: '📷 `invert`', value: 'Invert the colors on someone\'s avatar' },
                        { name: '📷 `triggered`', value: 'Someone is really triggered' },
                        { name: '📷 `ad`', value: 'Always these stupids ads' },
                        { name: '📷 `affect`', value: 'No, it doesn\'t affect my child' },
                        { name: '📷 `slap`', value: 'Slap someone in the face' },
                        { name: '📷 `delete`', value: 'Delete that trash person' },
                        { name: '📷 `hitler`', value: 'Someone is even worse than Hitler' },
                        { name: '📷 `jail`', value: 'Send someone to jail' },
                        { name: '📷 `kiss`', value: 'Love is in the air' },
                        { name: '📷 `putin`', value: 'Putin has an idol?' },
                        { name: '📷 `rip`', value: 'R.I.P.' },
                        { name: '📷 `spank`', value: 'Spank someone for being bad' },
                        { name: '📷 `stonks`', value: 'Easy stonks' },
                        { name: '📷 `trash`', value: 'I just see trash there' },
                        { name: '📷 `wanted`', value: 'Someone is wanted... and there is a reward?' },
                        { name: '📷 `circle`', value: 'Make a circle out of someone\'s avatar' },
                        { name: '📷 `color`', value: 'Get a color out of a HEX code' },
                    )
                    .setColor('#8098EA')
                    .setFooter('Use the reactions to navigate • 📖 Page 3/11')
                    .setThumbnail(bot.user.displayAvatarURL()),

                new Discord.MessageEmbed()
                    .setTitle('Mystic Esports Commands\n🛠️ Moderation 🛠️')                    
                    .setAuthor('#StayMystic', logo)
                    .setDescription(`Use \`${prefix}help [command]\` for more info`)
                    .addFields(
                        { name: '🛠️ `ban`', value: "Bans a member" },
                        { name: '🛠️ `unban`', value: "Unbans a user" },
                        { name: '🛠️ `kick`', value: "Kicks a member" },
                        { name: '🛠️ `mute`', value: "Mutes a member" },
                        { name: '🛠️ `unmute`', value: 'Unmutes a member' },
                        { name: '🛠️ `warn`', value: "Warns a member" },
                        { name: '🛠️ `warnings`', value: 'See how many warnings a member has' },
                        { name: '🛠️ `reset-warns`', value: 'Reset the warnings of a member' },
                        { name: '🛠️ `role`', value: "Gives/removes a role from a member" },
                        { name: '🛠️ `clear`', value: "Deletes a certain amount of messages" }
                    )
                    .setColor('#8098EA')
                    .setFooter('Use the reactions to navigate • 📖 Page 4/11')
                    .setThumbnail(bot.user.displayAvatarURL()),


                new Discord.MessageEmbed()
                    .setTitle('Mystic Esports Commands\n💰 Economy 💰')                    
                    .setAuthor('#StayMystic', logo)
                    .setDescription(`Use \`${prefix}help [command]\` for more info`)
                    .addFields(
                        { name: '💰 `balance`', value: 'Shows your or someone else\'s balance' },
                        { name: '💰 `withdraw`', value: "Withdraw your money from your bank" },
                        { name: '💰 `deposit`', value: "Deposit your money into your bank" },
                        { name: '💰 `payday`', value: "Get your payday money" },
                        { name: '💰 `weekly`', value: "Get your weekly reward" },
                        { name: '💰 `leaderboard`', value: "Who is the best of the best?" },
                        { name: '💰 `rob`', value: "Rob someone" },
                        { name: '💰 `beg`', value: "Beg for money" },
                        { name: '💰 `sports`', value: 'Play to earn money' },
                        { name: '💰 `work`', value: "Work to earn easy money" },
                        { name: '💰 `share`', value: "Share your money with others" },
                        { name: '💰 `store`', value: 'Open up the shop'},
                        { name: '💰 `buy`', value: 'Buy an item from the shop'},
                        { name: '💰 `remove-money`', value: 'Remove money from a user (Admin Only)' },
                        { name: '💰 `add-money`', value: 'Give money to a user (Admin Only)' }
                    )
                    .setColor('#8098EA')
                    .setFooter('Use the reactions to navigate • 📖 Page 5/11')
                    .setThumbnail(bot.user.displayAvatarURL()),


                new Discord.MessageEmbed()
                    .setTitle('Mystic Esports Commands\n🎲 Games 🎲')                    
                    .setAuthor('#StayMystic', logo)
                    .setDescription(`Use \`${prefix}help [command]\` for more info`)
                    .addFields(
                        { name: '🎲 `slots`', value: 'Bet your money in a game of slots' },
                        { name: '🎲 `dice`', value: 'Roll the dice for a chance to win money' },
                        { name: '🎲 `coinflip`', value: 'Flip the coin and try to guess the outcome' },
                        { name: '🎲 `rps`', value: 'Play a game of Rock, Paper, Scissor against the bot'},
                        { name: '🎲 `hangman`', value: 'Play hangman against the bot'},
                        { name: '🎲 `tictactoe`', value: 'Play some tictactoe against another player'},
                        { name: '🎲 `fight`', value: 'Who will win in an epic fight?'},
                        { name: '🎲 `trivia`', value: 'Show them who is the smartest one'}
                    )
                    .setColor('#8098EA')
                    .setFooter('Use the reactions to navigate • 📖 Page 6/11')
                    .setThumbnail(bot.user.displayAvatarURL()),


                new Discord.MessageEmbed()
                    .setTitle('Mystic Esports Commands\n🎵 Music 🎵')                    
                    .setAuthor('#StayMystic', logo)
                    .setDescription(`Use \`${prefix}help [command]\` for more info`)
                    .addFields(
                        { name: '🎵 `play`', value: 'Play Music from YT or given URL' },
                        { name: '🎵 `now-playing`', value: 'Check the music I\'m playing' },
                        { name: '🎵 `stop`', value: 'Stop the music and disconnect me' },
                        { name: '🎵 `queue`', value: 'Check the current queue' },
                        { name: '🎵 `clear-queue`', value: 'Clear the queue' },
                        { name: '🎵 `skip`', value: 'Skip to the next music in the queue' },
                        { name: '🎵 `shuffle`', value: 'Shuffle the queue' },
                        { name: '🎵 `pause`', value: 'Pause the current music' },
                        { name: '🎵 `resume`', value: 'Resume the current music' },
                        { name: '🎵 `loop`', value: 'Loop the current queue/song' },
                    )
                    .setColor('#8098EA')
                    .setFooter('Use the reactions to navigate • 📖 Page 7/11')
                    .setThumbnail(bot.user.displayAvatarURL()),
                
                	new Discord.MessageEmbed()
                    .setTitle('Mystic Esports Commands\n🎉 Giveaways 🎉')                    
                    .setAuthor('#StayMystic', logo)
                    .setDescription(`Use \`${prefix}help [command]\` for more info`)
                    .addFields(
                        { name: '🎉 `start-giveaway`', value: 'Start a giveaway' },
                        { name: '🎉 `end-giveaway`', value: 'End a giveaway' },
                        { name: '🎉 `reroll-giveaway`', value: 'Reroll a giveaway' }
                    )
                    .setColor('#8098EA')
                    .setFooter('Use the reactions to navigate • 📖 Page 8/11')
                    .setThumbnail(bot.user.displayAvatarURL()),
                
              	new Discord.MessageEmbed()
                    .setTitle('Mystic Esports Commands\n💠 Boosters 💠')                    
                    .setAuthor('#StayMystic', logo)
                    .setDescription(`Use \`${prefix}help [command]\` for more info`)
                    .addFields(
                        { name: '💠 `snipe`', value: 'Snipe the last deleted message' },
                        { name: '💠 `boosterdaily`', value: 'Daily Mystic coins reward' },
                        { name: '💠 `monthly`', value: 'Monthly Mystic coins reward' }
                    )
                    .setColor('#8098EA')
                    .setFooter('Use the reactions to navigate • 📖 Page 9/11')
                    .setThumbnail(bot.user.displayAvatarURL()),

                new Discord.MessageEmbed()
                    .setTitle('Mystic Esports Commands\n🔥 Exclusive Commands 🔥')                    
                    .setAuthor('#StayMystic', logo)
                    .setDescription(`Use \`${prefix}help [command]\` for more info`)
                    .addFields(
                        { name: '🔥 `skiller`', value: 'The code you should be using in the Brawl Stars shop' },
                        { name: '🔥 `joke`', value: 'Sends a random joke' },
                        { name: '🔥 `dadjoke`', value: 'Sends a *funny* dad joke' },
                        { name: '🔥 `yomamajoke`', value: 'Get the best yo mama jokes' },
                        { name: '🔥 `mysticpfps`', value: 'All the Mystic Esports profile pictures available'},
                        { name: '🔥 `chatrewards`', value: 'A quick explanation of Mystic\'s chat rewards'},
                        { name: '🔥 `potato`', value: 'Search a potato image on Google Images' }
                    )
                    .setColor('#8098EA')
                    .setFooter('Use the reactions to navigate • 📖 Page 10/11')
                    .setThumbnail(bot.user.displayAvatarURL()),

                new Discord.MessageEmbed()
                    .setTitle('Mystic Esports Random Chat Events')
                    .setAuthor('#StayMystic', logo)
                    .setDescription(`All these events have a reward of 1500 ${emoji} for the winner`)
                    .addFields(
                        { name: "Guess the Word", value: "The word you have to guess will be scrambled. Can you guess the word?"},
                        { name: "Guess the Number", value: "You will have 10s to try to guess the right number between 1-20"},
                        { name: "Quiz Game", value: "This Quiz has some Mystic-themed questions. Do you know Mystic better than the others?"}
                    )
                    .setColor('#8098EA')
                    .setFooter('Use the reactions to navigate • 📖 Page 11/11')
                    .setThumbnail(bot.user.displayAvatarURL()),

                new Discord.MessageEmbed()
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
                    .setFooter('Thanks to all of these people!')
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