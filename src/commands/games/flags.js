 const Command = require('../../Structures/Command');
const {fun} = require('../../settings/emojis.json')
const Discord = require("discord.js")
const ezgames = require("ez-games.js")
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pong'],
			description: 'This provides the ping of the bot',
			category: `${fun} Games`
		});
	}

	async run(message) {
 let data = await ezgames.flags(message.author.id , message.guild.id)
          let embed = new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription(`You have 15 Seconds to guess country name from the flag..`)
          .setImage(data.countryflag)
          .setFooter(message.guild.name, message.guild.iconURL())
          .setTimestamp()
          message.channel.send(embed)
          let author = m => m.author.id === message.author.id;
          let pointcollecter = new Discord.MessageCollector(message.channel, author , { max: 1 , time: 15000 }); 
          pointcollecter.on('collect', async msg => {
          if(msg.content.toLowerCase() === data.countryname) {
            msg.channel.send(`Correct you've got apoint`)
         } else {
            message.channel.send(`Incorrect the flag name is ${data.countryname.toLowerCase()}`)
          }
          })
    }
}