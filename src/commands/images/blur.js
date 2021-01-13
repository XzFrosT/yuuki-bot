const Command = require('../../Structures/Command')
const Discord = require('discord.js')
const {bear4} = require('../../settings/emojis.json')
const DIG = require("discord-image-generation")

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: '',
            category: `${bear4} Images`,

        })
    }
        async run(message, args) {
             // Get the avatarUrl of the user
        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        // Make the image
        let img = await new DIG.Blur().getImage(avatar)
        // Add the image as an attachement
        let attach = new Discord.MessageAttachment(img, "delete.png");;
        message.channel.send(attach)
        }
    }