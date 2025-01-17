const Command = require('../../Structures/Command');
const {fun} = require('../../settings/emojis.json')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pong'],
			description: 'This provides the ping of the bot',
			category: `${fun} Utilities`
		});
	}

	async run(message, args) {
        const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
    
const emoji = args[0];
if (!emoji) return message.channel.send("No emoji provided!");

let custom = Discord.Util.parseEmoji(emoji);

if (custom.id) {
   const embed = new Discord.MessageEmbed()
      .setTitle(`Enlarged version of ${emoji}`)
      .setColor("#FFFF00")
      .setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`);
   return message.channel.send(embed);
} else {
   let parsed = parse(emoji, { assetType: "png" });
   if (!parsed[0]) return message.channel.send("Invalid emoji!");
   const embed = new Discord.MessageEmbed()
      .setTitle(`Enlarged version of ${emoji}`)
      .setColor("#FFFF00")
      .setImage(parsed[0].url);
   return message.channel.send(embed);
}

    }
}