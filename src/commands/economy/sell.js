const Command = require('../../Structures/Command')
const {MessageEmbed, ReactionUserManager} = require('discord.js')
const {stinkybear} = require('../../settings/emojis.json')
const eco = require('discord-mongoose-economy');
const {mongoPath} = require('../../../config.json');

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: '',
            category: `${stinkybear} Economy`,

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

            if(!args[0]) return message.reply(`You have to mention something which you are gonna sell.`)

            if(args[0] === "fish") {
                
                if(!args[1]) return message.reply(`Mention a amount you want to sell dummy!`)
                if(args[1].startsWith("-")) {
                    return message.reply("NICE TRY")
                  }

                const fisherman = require("../../models/fish")

                const fishconfig = await fisherman.findOne({
                    user: message.author.id,
                });

                const fish = await fishconfig.get("amount")
                console.log(fish)
                console.log(args[1])
                if(parseInt(fish) < parseInt(args[1])) {
                    return message.reply(`You don't have that much!`)
                  }else {
                    await fishconfig.updateOne({
                        amount: parseInt(fish) - args[1]
                    }, {new : true})

                    eco.give(message.author.id, message.guild.id, 200 * args[1])
                    message.channel.send(`you have sold successfully ${args[1]} amount of fish and got ${200 * args[1]} money!`)
                }
            } else if(args[0] === "dragon") {
                if(!args[1]) return message.reply(`YOu have to mention a amount you are gonna sell!`)
                if(args[1].startsWith("-")) {
                    return message.reply("NICE TRY")
                  }

                const hunt = require("../../models/hunt")

                const huntconfig = await hunt.findOne({
                    user: message.author.id
                });

                const huntt = await huntconfig.get("amount")
                if(huntt < args[1]) {
                    return message.reply(`You dont have that much`)
                } else {
                    await huntconfig.updateOne({
                        amount: parseInt(huntt) - args[1]
                    }, {new: true})
                    eco.give(message.author.id, message.guild.id, 300 * args[1])
                    message.channel.send(`You have sold ${args[1]} amount of drgons and got ${300 * args[1]}`)
                }
            }
        }
    }