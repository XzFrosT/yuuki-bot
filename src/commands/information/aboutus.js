const Command = require('../../Structures/Command');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { help } = require('../../settings/emojis.json')


module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [''],
			description: '',
			category: `${help} Information`
		});
	}

	async run(message, args) {
        const em = new MessageEmbed()
        .setTitle("Lili")
        .setColor("00ff00")
        .setDescription(`We are trying our very best to make this world a better place - **lili Founder**`)
        .setThumbnail(this.client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .addFields(
            {
                name: `Founder - XbroWiz#6528`,
                value: `This is a bot I created to help people and gain some knowledge too within it! But I could've grown it further but developing seriously took time too. The reason I didn't expose my bot is cause i was learning Javascript at that moment too so balancing both together helped me a lot!`,
                inline: false
            },
            {
                name: `FAQ`,
                value: `1. Do we have a host? \n > No we dont have a host yet but we will be getting a host soon! \n 2. Is the bot under development? \n > For the present time we are still developing the bot but will be online if we soon get a host to host it!`,
                inline: false
            },
            {
                name: `Premium`,
                value: `You can buy premium and get a bunch of premium features you can just donate us how much amount you like or boost our main server and get premium feature for a specific period!`,
                inline: false
            },
            {
                name: `Command categories`,
                value: `animals - \`Shows all type of animals you would like to see!\`\nconfig - \`Set welcome channels, \`\neconomy - \`Economy commands similar to dank memer!\`\nemotes - \`Who hates anime? here are some emotes like stare, slap, hug ... etc\`\nfun - \`Fun commands like 8ball and more.\`\ngiveaway - \`Giveaway commands just mention a the time and all it will post the giveaway!\`\nimages - \`Image commands\`\ninformation - \`Info like instagram, zodiac, userinfo\`\nmoderation - \`Moderation tools\`\nmusic - \`Comming soon\`\nnsfw - \`no available description\`\nowner - \`Owner commands\`\nticket - \`create tickets and delte them using this command!\`\nutils - \`UTil commands!\``,
                inline: false
            },
            {
                name: `Support server`,
                value: `[Support](https://discord.gg/QfEfJpmK)`,
                inline: false
            },
            {
                name: `Staff`,
                value: `> **__Name__**: Radical#1737 \n> **__description__** - \`Hello i am Rad, ive been coding for 5 months, i like to code when im bored and got nothing to do, i am just a simple discord user :), thats it nice to meet you\` \n> **__position__**: \`admin\` \n > Name: \`\``,
                inline: false
            }
        )
        .setFooter(`Donate us - Lili`)

        message.channel.send(em)

    }
}