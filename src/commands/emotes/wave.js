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
        const gif = ainasepics.hi()

        const em = new MessageEmbed()
        .setDescription(`@${message.author.username} wave's @${message.mentions.users.first().username || message.mentions.members.first()}`)
        .setImage(gif)

        message.channel.send(em)
    }
}