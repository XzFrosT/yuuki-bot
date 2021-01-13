const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const Random = require('srod-v2')
const {angrybear} = require('../../settings/emojis.json')


module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['twt'],
            description: 'Post a tweet! Usage = c!!tweet xbrowiz',
            category: `${angrybear} Fun`,
            ratelimit: {
                // how many times this command can be ran before getting limited.
                bucket: 1,
                // the time (in milliseconds) before the command can be used again, in this case: seven seconds
                reset: 20 * 1000,
                // whether the reset time should stack.
                stack: false
            },

        })
    }
        async run(message, args) {
            const user = message.author.username
            let text = args.slice(0).join(" ");
            if(!text) {
                message.channel.send('you need to input some text.')
            }
            let TweetEmbed = await Random.Tweet(user, text, "BLUE");
            message.channel.send(TweetEmbed);
    }
}