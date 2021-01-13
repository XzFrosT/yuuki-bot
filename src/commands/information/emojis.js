const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const {help} = require('../../settings/emojis.json')


module.exports = class extends Command{

	constructor(...args) {
		super(...args, {
			aliases: [''],
			description: '',
			category: `${help} Information`,
			ratelimit: {
                // how many times this command can be ran before getting limited.
                bucket: 1,
                // the time (in milliseconds) before the command can be used again, in this case: seven seconds
                reset: 20 * 1000,
                // whether the reset time should stack.
                stack: false
            },
            userPerms: ['MANAGE_MESSAGES']
		});
	}

    async run(message, args) {
        let Emojis = "";
        let EmojisAnimated = "";
        let EmojiCount = 0;
        let Animated = 0;
        let OverallEmojis = 0;
        message.guild.emojis.cache.forEach((emoji) => {
          OverallEmojis++;
          if (emoji.animated) {
            Animated++;
            EmojisAnimated += this.client.utils.Emoji(emoji.id);
          } else {
            EmojiCount++;
            Emojis += this.client.utils.Emoji(emoji.id);
          }
        });
        let Embed = new MessageEmbed()
          .setTitle(`Emojis in ${message.guild.name}.`)
          .setDescription(
            `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}\n\n**Over all emojis [${OverallEmojis}]**`
          )
          .setColor(`RANDOM`);
        message.channel.send(Embed);
          }
        }