const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {stinkybear} = require('../../settings/emojis.json')
const eco = require('discord-mongoose-economy');
const {mongoPath} = require('../../../config.json');
const fisherman = require('../../models/fish');
const hunt = require('../../models/hunt');
const note = require('../../models/note');
const Levels = require('discord-xp')
const progressbar = require("string-progressbar")

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: 'Check your economy profile!',
            category: `${stinkybear} Economy`,
            ongoing: true

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
            
            const user = message.mentions.users.first() || message.author
            const level = await Levels.fetch(user.id, 1, true)
            const bal = await eco.balance(user.id, message.guild.id)
            const em = new MessageEmbed()
            .setAuthor(`${user.username} Profile`)
            .setColor("GREEN")
            .addFields(
                {
                    name: `🎚 Level`,
                    value: `\`${level.level}\` \n`,
                    inline: true
                },
                {
                    name:  `🧪 Experience`,
                    value: `\`${level.xp}\``,
                    inline: true
                },
                {
                    name: `<:Money:791198345883549716> Coins`,
                    value: `Wallet: ${bal.wallet} \n Bank: ${bal.bank}`,
                    inline: true
                }
            )
            message.channel.send(em)
        }
    }