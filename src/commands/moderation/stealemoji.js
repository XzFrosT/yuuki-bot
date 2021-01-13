const Discord = require('discord.js')
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const Command = require('../../Structures/Command')
const {moderation} = require('../../settings/emojis.json')


module.exports = class extends Command{

	constructor(...args) {
		super(...args, {
			aliases: ['sm'],
			description: '',
			category: `${moderation} Moderation`,
			ratelimit: {
                // how many times this command can be ran before getting limited.
                bucket: 1,
                // the time (in milliseconds) before the command can be used again, in this case: seven seconds
                reset: 20 * 1000,
                // whether the reset time should stack.
                stack: false
            },
            userPerms: ['MANAGE_CHANNELS']
		});
	}

    async run(message, args) {
                const emoji = args[0];
        if (!emoji) return message.channel.send(`Please Give Me A Emoji!`);

        let customemoji = Discord.Util.parseEmoji(emoji);
        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
customemoji.animated ? "gif" : "png"
}`;
            const name = args.slice(1).join(" ");
            try {
 const Added = new MessageEmbed()
.setColor("BLUE")  
.setAuthor(`${message.author.username} emoji added!`, message.author.displayAvatarURL({ dynamic: true }))
.addField("Emoji Name", `${name || `${customemoji.name}`}`, true)
.addField("Preview", `[Click Me](${Link} "Link for the preview!")`, true)
 await message.guild.emojis.create(
                    `${Link}`,
                    `${name || `${customemoji.name}`}`
)
                return message.channel.send(Added)
            } catch(err) {
                return message.channel.send(`An error has occured!\n\n**Possible Reasons:**\n\`\`\`- This server has reached the emojis limit\n- The bot doesn't have permissions.\n- The emojis size is too big.\n- The bot is having some problems.\`\`\``)
            }
} else {
let CheckEmoji = parse(emoji, { assetType: "png" });
if (!CheckEmoji[0])
return message.channel.send(`**Please Give Me A Valid Emoji!**`);
message.channel.send(
`**You Can Use Normal Emoji Without Adding In Server!**`
);
}
}
}