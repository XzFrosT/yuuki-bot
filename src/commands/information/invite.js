const axios = require('axios')
const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const {help} = require('../../settings/emojis.json')

module.exports = class extends Command{
    constructor(...args) {
		super(...args, {
            aliases: ['invite'],
            description: 'Inv for the bot',
            category: `${help} Information`
		});
	}
    
    async run( message, args) {
        const em = new MessageEmbed()
        .setAuthor(`Asked in: ${message.guild.name}`, message.guild.iconURL({dynamic: true}))
        .setColor("PINK")
        .setDescription(`Here you may get the links for the support server + to invite the bot to your server as well thank you!`)
        .addFields(
            {
                name: `Invite url[THANks FOR INVITING ME !]`,
                value: `[URL TO INVITE ME PRESS ME](https://discord.com/oauth2/authorize?client_id=749230085910822942&permissions=21474836398&scope=bot)`,
                inline: false
            }
        )
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setFooter(`Asked by: ${message.author.name}`, message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(em)
    }
}