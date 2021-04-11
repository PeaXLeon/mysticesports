const config     = require("./config.json")
const color      = require("./colors.json")
const Discord    = require("discord.js")
const YouTube    = require("simple-youtube-api")
const eco        = require("discord-economy")
const djs        = require("djs-economy")
const fs         = require("fs")
const db         = require("quick.db")
const scramble   = require("wordscramble")
const { Player } = require("discord-player")

const bot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
bot.setMaxListeners(30)
const keepAlive = require('./server.js');
keepAlive();

bot.youtube  = new YouTube(config.googleToken)
bot.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
	  const commands = require(`./commands/${folder}/${file}`);
	  bot.commands.set(commands.name, commands);
  };
}

/** MUSIC EVENTS */
bot.player = new Player(bot, {
    leaveOnEnd: false,
    leaveOnEmpty: false
})

bot.player
.on('trackStart', (message, track) => {
    const embed = new Discord.MessageEmbed()
    .setDescription(`Now playing [${track.title}](${track.url}) requested by ${message.author}`)
    .setColor(color.red)
    message.channel.send(embed)
})
.on('trackAdd', (message, queue, track) => {
    message.channel.send(`${track.title} has been added to the queue!`)
})
.on('playlistAdd', (message, queue, playlist) => {
    message.channel.send(`Playlist ${playlist.title} has been added to the queue (${playlist.tracks.length} songs)!`)
})
.on('searchResults', (message, query, tracks) => {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Here are your search results for ${query}!`)
    .setDescription(tracks.map((t, i) => `**${i + 1}.** ${t.title}`))
    .setColor(color.red)
    .setFooter('Send the number of the song you want to play!')
    message.channel.send(embed);
})
.on('searchInvalidResponse', (message, query, tracks, content, collector) => {
    if (content === 'cancel') {
        collector.stop()
        return message.channel.send('Search cancelled!')
    }
    message.channel.send(`You must send a valid number between 1 and ${tracks.length}!`)
})
.on('searchCancel', (message, query, tracks) => {
    message.channel.send('You did not provide a valid response... Please send the command again!')
})
.on('noResults', (message, query) => {
    message.channel.send(`No results found on YouTube for ${query}!`)
})
.on('queueEnd', (message, queue) => {
    message.channel.send('Music stopped as there is no more music in the queue!')
})
.on('channelEmpty', (message, queue) => {
    message.channel.send('Music stopped as there is no more member in the voice channel!')
})
.on('botDisconnect', (message) => {
    message.channel.send('Music stopped as I have been disconnected from the channel!')
})
.on('error', (error, message) => {
    switch(error){
        case 'NotPlaying':
            message.channel.send('There is no music being played on this server!')
            break;
        case 'NotConnected':
            message.channel.send('You are not connected in any voice channel!')
            break;
        case 'UnableToJoin':
            message.channel.send('I am not able to join your voice channel, please check my permissions!')
            break;
        case 'LiveVideo':
            message.channel.send('YouTube lives are not supported!')
            break;
        case 'VideoUnavailable':
            message.channel.send('This YouTube video is not available!');
            break;
        //default:
            //message.channel.send(`Something went wrong... Error: ${error}`)
    }
})

/** GIVEAWAYS */
const { GiveawaysManager } = require('discord-giveaways');
if(!db.get("giveaways")) db.set("giveaways", []);

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {

    async getAllGiveaways(){
        return db.get("giveaways");
    }

    async saveGiveaway(messageID, giveawayData){
        db.push("giveaways", giveawayData);
        return true;
    }

    async editGiveaway(messageID, giveawayData){
        const giveaways = db.get("giveaways");
        const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
        newGiveawaysArray.push(giveawayData);
        db.set("giveaways", newGiveawaysArray);
        return true;
    }

    async deleteGiveaway(messageID){
        const newGiveawaysArray = db.get("giveaways").filter((giveaway) => giveaway.messageID !== messageID);
        db.set("giveaways", newGiveawaysArray);
        return true;
    }

};

const manager = new GiveawayManagerWithOwnDatabase(bot, {
    storage: false,
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#8098EA",
        reaction: "🎉"
    }
});
bot.giveaways = manager;

bot.giveaways.on("giveawayReactionAdded", (giveaway, member, reaction) => {
  console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

bot.giveaways.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
  console.log(`${member.user.tag} unreacted to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

bot.giveaways.on("giveawayEnded", (giveaway, winners) => {
  console.log(`Giveaway #${giveaway.messageID} ended! Winner(s): ${winners.map((member) => member.user.username).join(', ')}`);
});

bot.shop = {
  "Midnight Blue": {
    cost: 20000
  },
  "Diamond Blue": {
    cost: 20000
  },
  "Snow Blue": {
    cost: 20000
  },
  "Apricot Orange": {
    cost: 20000
  },
  "Coral Orange": {
    cost: 20000
  },
  "Sun Orange": {
    cost: 20000
  },
  "Royal Red": {
    cost: 20000
  },
  "Fire Red": {
    cost: 20000
  },
  "Meteor Red": {
    cost: 20000
  },
  "Honey Yellow": {
    cost: 20000
  },
  "Golden Yellow": {
    cost: 20000
  },
  "Banana Yellow": {
    cost: 20000
  },
  "Grass Green": {
    cost: 20000
  },
  "Mint Green": {
    cost: 20000
  },
  "Neon Green": {
    cost: 20000
  },
  "Light Pink": {
    cost: 20000
  },
  "Hot Pink": {
    cost: 20000
  },
  "Magenta Pink": {
    cost: 20000
  },
  "Discord Black": {
    cost: 50000
  },
  "Discord Invis": {
    cost: 50000
  },
  "Discord Blurple": {
    cost: 50000
  },
  "DJ": {
    cost: 70000
  },
  "Limitless": {
    cost: 90000
  },
  "Guest Pass": {
    cost: 120000
  },
  "Poll Writer": {
    cost: 120000
  },
  "Fact Writer": {
    cost: 120000
  },
  "Riddle Writer":  {
    cost: 120000
  }
}; 

const activities_list = [
  `Mystic TikTok | ${config.prefix}help`,
  `Mystic YouTube Videos | ${config.prefix}help`,
  `new Mystic Merges | ${config.prefix}help`,
  `Mystic's server | ${config.prefix}help`,
]

bot.on("ready", async () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length));
        bot.user.setActivity(activities_list[index],{ type: 'WATCHING' });
    }, 10000)

    console.log(`Connected with ${bot.user.tag}`)
});

/** WELCOME MESSAGE */
bot.on("guildMemberAdd", async (member) => {
    const wchannel = member.guild.channels.cache.find(ch => ch.name == 'role-management')
    const wembed = new Discord.MessageEmbed()
        .setAuthor('Mystic Esports™', config.logo)
        .setTitle('Welcome to Mystic Esports!')
        .setDescription('Welcome to the official Mystic Esports Discord Server!\nAs you enter our server, make sure you read the rules channel and click the checkmark to abide by the rules.\nAlso checkout the #server-information channel to get a better perspective of our organization.')
        .addField('How to get verified?', 'To gain further access to the server, send a screenshot of your in game profile in the mystic club you are in.\nIf you are not in a Mystic Club, say you are a Guest to get verified.')
        .setImage('https://i.imgur.com/5bJgzFq.jpg')
        .setColor('#4fabdd')
        .setFooter('#StayMystic');
        wchannel.send(`Welcome to the Mystic Esports Discord Server <@${member.id}>! We now have **${member.guild.memberCount}** Members!💫`, wembed);
})

bot.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id === '667191783452704780') {  // #rules channel
        if (reaction.emoji.name === '✅') {
            
            if (reaction.message.guild.members.cache.get(user.id).roles.cache.find(r => r.id === "666834645584838686")) return // if member has Visitor return
            
            await reaction.message.guild.members.cache.get(user.id).roles.add('666834645584838686') // Visitor
            await reaction.message.guild.members.cache.get(user.id).roles.remove('666872672881475587') // Unverified
        }
    }
})

/** SNIPE MESSAGES */
bot.on("messageDelete", async (message) => {

  db.set(`snipe_${message.guild.id}`, { author: message.author, msg: message.content })

})

/** COMMAND HANDLER */
bot.on("message", async (message) => { //commands
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;

  if (message.content == "<@!759718010662944778>" || message.content == "<@759718010662944778>") {
    try {
        message.channel.send(`**My prefix is: \`${config.prefix}\`**\nFor a list of commands use: \`${config.prefix}help\`\nFor more information on a command do: \`${config.prefix}help [command]\``)
    } catch (error) {
        console.log(error);
    }
}

  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;

  try {
    command.execute(bot, message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
})

/** CHAT EVENTS */
bot.on("message", async (message) => {

    if (message.author.bot) return;
    if (message.content.startsWith(config.prefix)) return;
    if (message.channel.type !== "text") return;
    if (message.channel.id !== "666892267411210251" && message.channel.id !== "666807797320646676" && message.channel.id !== "666894804583579677") return;

    /** Chance of an event happening (fully costumizable) */
    if (Math.random() > 0.95) {

      /** UNSCRABLING GAME */
      if (Math.random() <= 0.33) {

        let words = [
          'mystic',
          'esports',
          'winter',
          'merging',
          'sponsors',
          'skiller',
          'gaming',
          'tournaments',
          'giveaways',
          'clubs',
          'games',
          'money',
          'etienne',
          'doge',
          'potato',
          'clash royale',
          'colt',
          'punisher',
          'lakers',
          'flightreacts',
          'trivia',
          'twitter',
          'instagram',
          'youtube',
          'tiktok',
          'reddit'
        ]

        const randW = Math.floor(Math.random() * (words.length))
        let word = words[randW]
        let scrWord = scramble.scramble(word)

        message.channel.send(`**Unscrambling Game Event Incoming!**\nBe the first to unscramble the word to win 1500 coins!\nThe word is: \`${scrWord}\`\nYou have 30 seconds`)
        const { author } = (await message.channel.awaitMessages(
          msg => msg.content.trim().toLowerCase() === word.toLowerCase(),
          { max: 1, time: 30000, errors: ['time'] }
        ).catch(() => {
          message.channel.send(`No one found out the word. The correct answer was ${word}`)
        })).first()

        await message.channel.send(`${author.username} found out the word! You got **1500** coins!`)
        await eco.AddToBalance(author.id, 1500)
      }
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /** QUIZ GAME */
      else if (Math.random() > 0.33 && Math.random() < 0.66) {

        var quiz = [
          { question: 'Who is Mystic Esports\' main founder?', answer: 'Winter' },
          { question: 'What is Mystic\'s main color?', answer: 'Blue' },
          { question: 'What is the highest role in the server?', answer: 'Mystic Esports Bot' },
          { question: 'What is Mystic\'s main game?', answer: 'Brawl Stars' },
          { question: 'What day was Mystic founded on? (format: dd/mm/yyyy)', answer: '21/04/2019' },
          { question: 'What was the Mystic Discord Server called before Mystic Esports?', answer: 'Mega Elite' },
          { question: 'Who is the current most OG staff in Mystic?', answer: 'Waffles' },
          { question: 'Who is the CFO of Mystic?', answer: 'BlueDragon' },
          { question: 'What region was the first Mystic club from?', answer: 'USA' },
          { question: 'How many games is Mystic in?', answer: '15' },
          { question: 'Who is the head graphic designer of Mystic?', answer: 'ItzJayJay' },
          { question: 'Who is the head of content creation in Mystic?', answer: 'Mystic King' },
          { question: 'What Creator Code should you use in the Brawl Stars shop?', answer: 'Skiller' },
          { question: 'What is Mystic’s slogan?', answer: '#StayMystic' },
          { question: 'What was the first ever Mystic merge club name?', answer: 'Mystic Legacy' },
          { question: 'Who is the first ever Chairman of Mystic?', answer: 'Etienne' },
          { question: 'Who is the first person to ever get blacklisted from Mystic?', answer: 'Slick' }

          //{ question: '', answer: '' },
        ]

        const randomizer = Math.floor(Math.random() * quiz.length)
        let rand = quiz[randomizer]
        let question = rand.question
        let answer = rand.answer

        message.channel.send(`**It's Quiz Time!**\nTry to be the first to answer the question correctly to win 1500 coins!\nThe question is: \`${question}\`\nYou have 20 seconds`)

        const { author } = (await message.channel.awaitMessages(
          msg => msg.content.toLowerCase().trim() === answer.toLowerCase(),
          { max: 1, time: 20000, errors: ['time'] }
        ).catch(() => {
          message.channel.send(`No one answered the question. The correct answer was ${answer}`)
        })).first()

        await message.channel.send(`${author.username} found out the answer! You won **1500** coins!`)
        await eco.AddToBalance(author.id, 1500)
      }
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /** GUESS THE NUMBER */
      else if (Math.random() >= 0.66) {

        const randomNum = `${Math.floor(Math.random() * 20) + 1}`

        message.channel.send(`**Guess The Number!**\nGuess the right number between 1-20 and win 1500 coins!\nYou have 10 seconds`)

        const { author } = (await message.channel.awaitMessages(
          msg => msg.content === randomNum,
          { max: 1, time: 10000, errors: ['time'] }
        ).catch(() => {
          message.channel.send(`No one could find the correct number. The correct answer was ${randomNum}`)
        })).first()

        await message.channel.send(`${author.username} got the right number! Congratulations, you won **1500** coins!`)
        await eco.AddToBalance(author.id, 1500)
      }
    }
})

bot.login(config.token);
