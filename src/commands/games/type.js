const Command = require('../../Structures/Command');
const {fun, dimaondshovel,dimaondsword,daimondaxe,police} = require('../../settings/emojis.json');
const Discord = require('discord.js');
const eco = require("discord-mongoose-economy")
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['typing'],
			description: 'Type fast to win special prices!',
			category: `${fun} Games`
		});
	}

	async run(message, args) {
        const ezgames = require('ez-games.js')

        
let data = await ezgames.speed(message.author.id, message.guild.id, message.author.displayAvatarURL({ format: 'png'}), this.client.user.username)
/**
 * user => message.author.id 
 * guild => message.guild.id
 * image => the generated image from api.
 * word => the word that generated from the package
 */
let embed = new Discord.MessageEmbed()
.setTitle(`You Have 15Seconds To Type the word`)
.setImage(data.image)
.setFooter(message.guild.name , message.guild.iconURL())
.setTimestamp()
message.channel.send(embed)
let author = m => m.author.id === message.author.id;
let pointcollecter = new Discord.MessageCollector(message.channel, author , { max: 1 , time: 15000 }); 
pointcollecter.on('collect', async msg => {
    let word = data.word;
    if(msg.content.toLowerCase() === word.toLowerCase()) {
        const user = await eco.give(message.author.id, message.guild.id, 1000)
        message.channel.send("`🎉` you won 1000 $! ")
    }
})
    }
}