const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const {moderation} = require('../../settings/emojis.json')

module.exports = class extends Command{

	constructor(...args) {
		super(...args, {
			aliases: [''],
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
            userPerms: ['ADMINISTRATOR']
		});
	}

    async run(message, args) {
        if (!args[0]) return message.channel.send('Proper usage: a.poll <question>');
        
        // Create Embed
        const embed = new MessageEmbed()
            .setColor("#ffffff") //To change color do .setcolor("#fffff")
            .setFooter('React to Vote. @everyone')
            .setDescription(args.join(' '))
            .setTitle(`Poll Created By ${message.author.username}`);
            
        let msg = await message.channel.send(embed)
            .then(function (msg) {
                msg.react("❎");
                msg.react("✅");
                message.delete({timeout: 1000});
                }).catch(function(error) {
                console.log(error);
            });
        }
    }