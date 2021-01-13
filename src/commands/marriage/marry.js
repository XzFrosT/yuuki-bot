const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {scared} = require('../../settings/emojis.json')
const marry = require('../../models/marry')


module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['propose'],
            description: 'Marry a person using this command!',
            category: `${scared} Marriage`,

        })
    }
        async run(message, args) {
           const user = message.mentions.members.first()
           const proposer = message.author.id;
           if(!user) return message.reply("You should mentiona user in order to marry him/her.")

           const em = new MessageEmbed()
           .setTitle("Confirmation!")
           .setColor("GREEN")
           .setDescription(`If you want to divorce please react \n\n \`✅\` \n \`❌\``)
           .setFooter("marry")
           .setThumbnail(message.author.displayAvatarURL())
           .setTimestamp()
           message.channel.send(em).then(message => {
            message.react('✅').then(() => message.react('❌'));
      
            const filter = (reaction, sent) => {
              return ['✅', '❌'].includes(reaction.emoji.name) && sent.id === user.id;
            };

           message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(async(collected) => {
          const reaction = collected.first()

          const marryconfig = await marry.findOne({
            User: proposer
        })
        const marryconfig2 = await marry.findOne({
            User: user.id
        })
        const muser1 = await marryconfig2.get("MarriedUser")
        const num1 = await marryconfig2.get("Marriedtimes")
        const muser = await marryconfig.get("MarriedUser")
        const num = await marryconfig.get("Marriedtimes")

          if (reaction.emoji.name === '✅') {
            const mar = marry.findOne({User: proposer}, async(err, data) => {
                if(err) throw err;
                if(data) {
                   
                    if(parseInt(muser) !== 0) {return message.reply("You have a spouse!")}
                    else if(parseInt(muser1) !== 0 ){
                        return message.reply("The person you are marrying has a spouse")
                    }
                    else {
                        await marryconfig.updateOne({
                            MarriedUser: user.id,
                            Marriedtimes: parseInt(num) + 1
                        })
                        await marryconfig2.updateOne({
                            MarriedUser: proposer,
                            Marriedtimes: parseInt(num1) + 1
                        })
                        message.channel.send(`You have married to ${user}! Now you may kiss each other!`)
                    }
                } else {
                    const newe = new marry({
                        User: proposer,
                        MarriedUser: 0,
                        Marriedtimes: 0,
                        Divorcedtimes: 0,//we wont be using this part!
                        DivorcedUser: 0
                    }).save().then(async() => {
                        

                        await marryconfig.updateOne({
                            MarriedUser: user.id,
                            Marriedtimes: parseInt(num) + 1
                        })
                        await marryconfig2.updateOne({
                            MarriedUser: proposer,
                            Marriedtimes: parseInt(num1) + 1
                        })

                        message.channel.send(`You have married to ${user}! Now you may kiss each other!`)
                    })
                }
            })
        } else if(reaction.emoji.name === '❌'){
            message.channel.send("She/he has rejected!")
        }
    })
})
}
}
