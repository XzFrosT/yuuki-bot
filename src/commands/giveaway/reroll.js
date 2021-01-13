const Command = require('../../Structures/Command')
const Discord = require('discord.js')
const {mochaspit} = require('../../settings/emojis.json')
const ms = require("ms")

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['edit'],
            description: 'text to ascii!',
            category: `${mochaspit} Giveaway`,

        })
    }
        async run(message, args) {
           
  let hasPerm = message.member.hasPermission('MANAGE_MESSAGES');

  if (hasPerm === false) return message.channel.send(
    new Discord.MessageEmbed()
    .setTitle('__ERROR__')
    .setColor('#FF0000')
    .setDescription("You need `MANAGE_MESSAGES` permissions or a role named `giveaway` to use that command!")
  )

  if (!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setTitle('__ERROR__')
      .setColor('#FF0000')
      .setDescription("You need to enter a message ID!")
    return message.channel.send(embed)
  }

  let messageID = args[0];
  this.client.giveawaysManager.reroll(messageID, {
    messages: {
      congrat: "\`🎁\`・Congratulations: {winners}",
    }
  }).catch((err) => {
    const ewmbed = new Discord.MessageEmbed()
      .setTitle('__ERROR__')
      .setColor('#FF0000')
      .setDescription("No giveaway exists with that message ID!")
    return message.channel.send(ewmbed)
  });

}
    }

