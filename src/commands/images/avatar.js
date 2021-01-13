const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {bear4} = require('../../settings/emojis.json')

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: '',
            category: `${bear4} Images`,

        })
    }
        async run(message, args) {
            let user = message.mentions.users.first() || message.author
            const embed = new MessageEmbed()
            .setTitle(`${user.username}'s avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 2048}))
            .setDescription(`[PNG](${user.displayAvatarURL({ format: 'png' })}) | [JPG](${user.displayAvatarURL({ format: 'jpg' })}) | [GIF](${user.displayAvatarURL({ format: 'gif' })})`)
            message.channel.send(embed)
        }
    }