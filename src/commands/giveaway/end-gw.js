const Command = require('../../Structures/Command')
const Discord = require('discord.js')
const {mochaspit} = require('../../settings/emojis.json')
const figlet = require('figlet')
const {mongoPath} = require('../../../config.json');
const ms = require("ms")

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['end'],
            description: 'text to ascii!',
            category: `${mochaspit} Giveaway`,

        })
    }
        async run(message, args) {
            let hasPerm = message.member.hasPermission('MANAGE_MESSAGES');

            if (hasPerm === false) {
                return message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle('__ERROR__')
                    .setColor('#FF0000')
                    .setDescription("You need `MANAGE_MESSAGES` permissions or a role named `giveaway` to use that command!")
                )
            }
            if (!args[0]) {
                const embed = new Discord.MessageEmbed()
                    .setTitle('__ERROR__')
                    .setColor('#FF0000')
                    .setDescription("You need to enter a message ID!")
                return message.channel.send(embed)
            }
            let messageID = args[0];
            try {
                this.client.giveawaysManager.edit(messageID, {
                    setEndTimestamp: Date.now()
                }).then(() => {
                    const embwed = new Discord.MessageEmbed()
                        .setTitle('__SUCCESS__')
                        .setColor('#00FF00')
                        .setDescription("Giveaway ended!")
                    return message.channel.send(embwed)
                })
            } catch (e) {
                console.log(e)
                const ewm3bed = new Discord.MessageEmbed()
                    .setTitle('__ERROR__')
                    .setColor('#FF0000')
                    .setDescription("No giveaway exist with that message ID!")
                return message.channel.send(ewm3bed)
        }
    }
}