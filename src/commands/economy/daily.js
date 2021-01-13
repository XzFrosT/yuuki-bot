const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {stinkybear} = require('../../settings/emojis.json')
const eco = require('discord-mongoose-economy');
const {mongoPath} = require('../../../config.json');

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['daily'],
            description: 'Collect your daily cash!',
            category: `${stinkybear} Economy`,
            ratelimit: {//limit for each command!
                bucket: 1,
                reset: 86400 * 1000,
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
                2000,
                1000,
                1811,
                1765,
                992
            ]

            const cost = amount[Math.floor(Math.random() * amount.length)]

            await eco.give(message.author.id, message.guild.id, cost)

            const em = new MessageEmbed()
            .addField(`Daily`, `you have got ${cost}! Come back in 24 hours to claim it again`)

            message.channel.send(em)
        }
    }