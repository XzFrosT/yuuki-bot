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
		});
	}

    async run(message, args) {
        if (!args[0])
        return message.channel.send(
          `Please specify who you wish to kick! (Please give the user id or username)`
        );
      let User = message.guild.members.cache.get(args[0]);
      if (!User)
        return message.channel.send(
          `That is not a user in the server! Try again!`
        );
      let Reason = message.content.split(`!kick ${User.id} `);
      if (!args[1])
        return message.channel.send(
          `Noob, say a valid reason you are kicking this user!`
        );
      if (!Reason)
        return message.channel.send(
          `Please specify a reason! You can't kick someone with out a reason, can you?`
        );
      if (!User.kickable)
        return message.channel.send(
          `Hey, don't try to break me cause that user has a higher role than you or me or the same role!`
        );
      if (!message.member.permissions.has("KICK_MEMBERS"))
        return message.channel.send(
          `How can you kick somebody without permission: KICK_MEMBERS!`
        );
      User.kick(Reason);
      const Embed = new MessageEmbed()
        .setTitle(`You have kicked a member!`)
        .setDescription(
          `You have kicked the user ${
            this.client.users.cache.get(User.id).username
          } from this server!`
        )
        .setColor(`RANDOM`);
      message.channel.send(Embed);
    }
}