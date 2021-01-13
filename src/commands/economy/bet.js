const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {stinkybear} = require('../../settings/emojis.json')
const eco = require('discord-mongoose-economy');
const {mongoPath} = require('../../../config.json');


module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: 'Check your balance!... FUN FACT [ This economy system is for each server seperate! ]',
            category: `${stinkybear} Economy`,
            ratelimit: {//limit for each command!
                bucket: 1,
                reset: 10 * 1000,
                stack: false,
            },

        })
    }
        async run(message, args) {
            const bal = await eco.balance(message.author.id, message.guild.id)
            const amount = parseInt(args[0])

            const au = [1,2,3,4,5,6,7,8,9]
            const ua = [1,2,3,4,5,6,7,8,9]
            const h = [0.25, 0.45, 0.50, 0.67, 0.90, 2]

            const a = au[Math.floor(Math.random() * au.length)]// author
            const u = ua[Math.floor(Math.random() * ua.length)]// bot
            const m = h[Math.floor(Math.random() * h.length)]// percentage

            if(bal.wallet < amount) return message.reply("You can't bet more than what you have!")
            if(!args[0]) return message.reply("You can't bet nothin!")

            if(a < u) {
                const lost = new MessageEmbed()
                .setTitle(`<a:cc_cross:797085202626772993> | ${message.author.username} Gambling lossing game`)
                .setColor("RED")
                .setDescription(`You lost ${amount} \n\n **Balance**: ${bal.wallet - amount}`)
                .addFields(
                    {
                        name: `${message.author.username}`,
                        value: `Rolled \`${a}\``,
                        inline: true
                    },
                    {
                        name: `Yuuki`,
                        value: `Rolled \`${u}\``,
                        inline: true
                    }
                )
                message.channel.send(lost)
                eco.deduct(message.author.id, message.guild.id, amount)//loosing gamble
            } else if(a > u) {
                const win = new MessageEmbed()
                .setTitle(`<a:tick:783964201235644437> | ${message.author.username} Gambling winning game`)
                .setColor("GREEN")
                .setDescription(`You won ${amount * m}\n\n **Balance**: ${bal.wallet + amount * m} \n **Percentage**: ${m * 100}% \n`)
                .addFields(
                    {
                        name: `${message.author.username}`,
                        value: `Rolled \`${a}\``,
                        inline: true
                    },
                    {
                        name: `Yuuki`,
                        value: `Rolled \`${u}\``,
                        inline: true
                    }
                )
                message.channel.send(win) 

                eco.give(message.author.id, message.guild.id, amount * m) // winning gamble
            }
        }
    }