const config   = require("./config.json");
const Discord  = require("discord.js");
const eco      = require("discord-economy");
const fs       = require("fs");
const db       = require("quick.db");
const scramble = require("wordscramble");

const bot      = new Discord.Client();
bot.setMaxListeners(30)
bot.commands   = new Discord.Collection();

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
    updateCountdownEvery: 1000,
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

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const commands = require(`./commands/${file}`);
	bot.commands.set(commands.name, commands);
};

const activities_list = [
  `Winter frying Apollo | ${config.prefix}help`,
  `Mystic YouTube Videos | ${config.prefix}help`,
  `new Mystic Merges | ${config.prefix}help`,
  `Mystic's server | ${config.prefix}help`,
]

bot.on("ready", () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length));
        bot.user.setActivity(activities_list[index],{ type: 'WATCHING' });
    }, 10000);
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

  const args = message.content.slice(config.prefix.length).trim().split(' ');
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

    /** Chance of an event happening (fully costumizable) */
    if (Math.random() > 0.97) {

      /** UNSCRABLING GAME */
      if (Math.random() >= 0.33) {

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
          'money'
        ]

        const randW = Math.floor(Math.random() * (words.length))
        let word = words[randW]
        let scrWord = scramble.scramble(word)

        message.channel.send(`**Unscrambling Game Event Incoming!**\nBe the first to unscramble the word to win 1500 coins!\nThe word is: \`${scrWord}\`\nYou have 30 seconds`)
        const { author } = (await message.channel.awaitMessages(
          msg => msg.content.trim() === word,
          { max: 1, time: 30000, errors: ['time'] }
        ).catch(() => {
          message.channel.send("No one found out the word. Better luck next time!")
        })).first()

        await message.channel.send(`${author.username} found out the word! You got **1500** coins!`)
        await db.add(`money_${author.id}`, 1500)
      }
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /** QUIZ GAME */
      else if (Math.random() > 0.33 && Math.random() < 0.66) {

        var quiz = [
          { question: 'Who is Mystic Esports\' main founder?', answer: 'Winter' },
          { question: 'What is Mystic\'s main color?', answer: 'Blue' },
          { question: 'What is the highest role in the server?', answer: 'Mystic Esports Bot' },
          { question: 'What is Mystic\'s main game?', answer: 'Brawl Stars' },
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
          message.channel.send("No one answered the question. *sad noises*")
        })).first()

        await message.channel.send(`${author.username} found out the answer! You won **1500** coins!`)
        await db.add(`money_${author.id}`, 1500)
      }
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /** GUESS THE NUMBER */
      else if (Math.random() >= 0.66) {

        const randomNum = Math.floor(Math.random() * 20);

        message.channel.send(`**Guess The Number!**\nGuess the right number between 1-20 and win 1500 coins!\nYou have 10 seconds`)

        const { author } = (await message.channel.awaitMessages(
          msg => msg.content.trim() === randomNum,
          { max: 1, time: 10000, errors: ['time'] }
        ).catch(() => {
          message.channel.send("No one could find the correct number. I guess no 1500 coins today.")
        })).first()

        await message.channel.send(`${author.username} got the right number! Congratulations, you won **1500** coins!`)
        await db.add(`money_${author.id}`, 1500)
      }
    }
})

/** REMINDER MESSAGES */
bot.setInterval(async (message) => {
    const codeembed = new Discord.MessageEmbed()
      .setTitle('CODE: Skiller')
      .setDescription('Best code in Brawl Stars')
      .addField('Make sure to use CODE: Skiller in the Brawl Stars shop to support a great content creator and to support the Mystic community. 🎵 (S-K-I-L-L-E-R Code Skiller in the Brawl Stars shop)')
      .setFooter('#StayMystic', config.logo)
      .setThumbnail('https://i.imgur.com/mKjmx6Q.jpg')
      .setColor('#a5cced')
    await message.guild.channels.cache.find(r => r.name === "↪rocket-main").then(ch => {
      ch.send(codeembed)
    })
  }, 86400000)

bot.login(config.token);
