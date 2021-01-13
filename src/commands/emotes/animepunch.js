const Command = require('../../Structures/Command');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const {beardance} = require('../../settings/emojis.json')
const ainasepics = require("ainasepics")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['am_punch'],
            description: 'anime gif punch impress ur friends :D!',
            category: `${beardance} Emotes`
        });
    }

    async run(message, args) {
        const gif = ainasepics.punch()

        const em = new MessageEmbed()
        .setDescription(`@${message.author.username} punched at @${message.mentions.users.first().username || message.mentions.members.first()}`)
        .setImage(gif)

        message.channel.send(em)
    }
}