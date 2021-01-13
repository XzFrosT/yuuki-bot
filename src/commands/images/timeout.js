const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {bear4} = require('../../settings/emojis.json')
const axios = require('axios')


module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: '',
            category: `${bear4} Images`,

        })
    }
        async run(message, args) {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
            const url = `https://api.no-api-key.com/api/v2/timeout?image=${user.user.displayAvatarURL({ format: 'png' })}`

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} was used in!`, message.guild.iconURL({ dynamic: true }))
                .setImage(url)
                .setFooter(`${message.author.username} asked this`, message.author.displayAvatarURL({ dynamic: true }))
    
            await message.channel.send(embed)
        }
    }