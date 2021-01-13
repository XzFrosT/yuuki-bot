const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {angrybear} = require('../../settings/emojis.json')

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['nekogirl'],
            description: 'see girls :D',
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

        }
    }