const Command = require('../../Structures/Command');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const {beardance} = require('../../settings/emojis.json')
const ainasepics = require("ainasepics");
const { axios } = require('axios');
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
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        
        const { body } = await superagent
        .get(`https://nekos.life/api/v2/img/baka`)

        const embed = new MessageEmbed()
        .setDescription(`${message.author} has baka ${user}!`)
        .setImage(body.url)

        message.channel.send(embed)
    }
}