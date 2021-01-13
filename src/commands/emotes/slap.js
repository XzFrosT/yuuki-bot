const Command = require('../../Structures/Command');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const {beardance} = require('../../settings/emojis.json')
const ainasepics = require("ainasepics")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['coronas'],
            description: 'this provides the corona rate limit for a country!',
            category: `${beardance} Emotes`
        });
    }

    async run(message, args) {
        const gif = ainasepics.slap()

        const em = new MessageEmbed()
        .setDescription(`@${message.author.username} slaps @${message.mentions.users.first().username || message.mentions.members.first()}`)
        .setImage(gif)

        message.channel.send(em)
    }
}