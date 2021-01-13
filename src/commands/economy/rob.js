const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {stinkybear} = require('../../settings/emojis.json')
const eco = require('discord-mongoose-economy');
const {mongoPath} = require('../../../config.json');

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['rob'],
            description: 'Rob money from people!',
            category: `${stinkybear} Economy`,
            ratelimit: {//limit for each command!
                bucket: 1,
                reset: 30 * 1000,
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
            const amount = [
                270,
                250
            ]

            const user = message.mentions.users.first()
            const user1 = message.author;

            const balance = await eco.balance(user.id, message.guild.id); 
            const bal = await eco.balance(message.author.id, message.guild.id);

            const robmoney = amount[Math.floor(Math.random() * amount.length)]


            if(balance.wallet < 249){
              return message.reply(`This user doesn't have even 250 coins in his wallet, not worth it man!`)
            }

            if(bal.wallet < 250){
               return message.reply(`You need to have 251 coins in order to rob someone!`)
            }
            eco.deduct(user.id, message.guild.id, robmoney)
            eco.give(user1.id, message.guild.id, robmoney)

            message.channel.send(`${user1.username} has robbed ${user.username} and got ${robmoney}!`)
        }
    }