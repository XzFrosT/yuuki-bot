const Command = require('../../Structures/Command');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const {beardance} = require('../../settings/emojis.json')
const ainasepics = require("ainasepics")
const superagent = require('superagent')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['am_punch'],
            description: 'anime gif punch impress ur friends :D!',
            category: `${beardance} Emotes`
        });
    }

    async run(message, args) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const url = `https://nekos.life/api/v2/img/spank`

       const {body} = await superagent
       .get(url)
        const embed = new MessageEmbed()
        .setDescription(`${message.author.id} has spanked ${user.username}!`)
        .setImage(body.url)

        message.channel.send(embed)
    }
}