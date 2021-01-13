const { formatDate } = require("../../../functions");
const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const {help} = require('../../settings/emojis.json')

module.exports = class extends Command{
    constructor(...args) {
		super(...args, {
            aliases: ['inst'],
            description: 'Woohoo insta online!',
            category: `${help} Information`,
            ratelimit: {
              // how many times this command can be ran before getting limited.
              bucket: 1,
              // the time (in milliseconds) before the command can be used again, in this case: seven seconds
              reset: 20 * 1000,
              // whether the reset time should stack.
              stack: false
          },
		});
	}
    
     async run( message, args) {
        let mem = message.guild.members.cache
        .filter((m) => !m.user.bot)
        .sort((a, b) => b.user.createdAt - a.user.createdAt)
        .first();
      const Embed = new MessageEmbed()
        .setTitle(`The youngest member in ${message.guild.name}`)
        .setColor(`RANDOM`)
        .setFooter(`Date format: MM/DD/YYYY`)
        .setDescription(
          `${mem.user.tag} is the youngest user in ${
            message.guild.name
          }! Account creation date: ${formatDate(mem.user.createdAt)}`
        );
      message.channel.send(Embed);
    }
}