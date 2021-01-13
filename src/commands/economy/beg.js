const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {stinkybear} = require('../../settings/emojis.json')
const figlet = require('figlet')
const eco = require('discord-mongoose-economy');
const {mongoPath} = require('../../../config.json');

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['beg'],
            description: 'beg ppl money!',
            category: `${stinkybear} Economy`,
            ratelimit: {//limit for each command!
                bucket: 1,
                reset: 10 * 1000,
                stack: false,
            },

        })
    }
        async run(message, args) {
            const usedtimes = require('../../models/usedtimes');
            const usedconfig = await usedtimes.findOne({
                user: message.author.id
            })

            const num = await usedconfig.get("times")

            await usedconfig.updateOne({
                times: parseInt(num) + 1
            })
            
            eco.connect(mongoPath)
            const min = 100; //Minimum of 10
            const max = 1000; //Maximum of 100
            const random = Math.floor(Math.random() * (max - min + 1) ) + min;

            const authors = [
                "Ariana Grande",
                "Justin Bieber",
                "Shawn Mendes",
                "Donald Trump",
                "Charlie Puth",
                "Joe Biden",
                "Tony Stark",
                "Hussain Bolt",
                "Cardi B",
                "Cristiano Rondaldo",
                "Lionel Messi",
                "The next door neighbour"
            ]
            const quotes = [
                "Ahh you again, why you want money from me :/, Anyways here some cash",
                "Im too poor to give you money, but here you go keep the change",
                "Well do say more beggers to come to me I give massive cash and here some for you too",
                "I kept this money for long time I think someone else deserves it now",
                "If you ask me cash the next time i wont give you dude but here this ill give u",
                "Aye its a begger here you go take this "
            ]

            const auth = authors[Math.floor(Math.random() * authors.length)]
            const quote = quotes[Math.floor(Math.random() * quotes.length)]

            await eco.give(message.author.id, message.guild.id, random)
            message.channel.send(`**${auth}:** has given you ${random} with the statement ${quote}!`)
        }
    }