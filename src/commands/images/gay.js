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
      .setTitle("A gay frame on top of your profile picture!")
      .setImage(`https://some-random-api.ml/canvas/gay?avatar=` + user.user.displayAvatarURL({ format: "png"}))
      await message.channel.send(embed)
        }
    }