const Command = require('../../Structures/Command')
const {stinkybear, police} = require('../../settings/emojis.json')
const fisherman = require('../../models/fish')

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['fish'],
            description: 'Fish different creatures from the deep ocean!',
            category: `${stinkybear} Economy`,
            ratelimit: {//limit for each command!
                bucket: 1,
                reset: 30 * 1000,
                stack: false,

            },

        })
    }
        async run(message, args) {
            const usedtimes = require('../../models/usedtimes');
            const usedconfig = await usedtimes.findOne({
                user: message.author.id
            })

            const num = await usedconfig.get("times")

            await usedconfig.updateOne({
                times: parseInt(num) + 1
            })
            
            const fishamount = [
                1,
                2,
                4,
                7,
            ]

            
            const poleconfig = await fisherman.findOne({
                user: message.author.id
            })

            const dbnumber = await poleconfig.get("pole")
            if(dbnumber == "0") {return message.reply("Don't try to break me, you don't even have a pole to fish!")}
                const fish = fishamount[Math.floor(Math.random() * fishamount.length)]

                const user = message.author.id;
                const newdata = fisherman.findOne({user: user}, async(err, data) => {
                    if(err) throw err;
                    if(!data) {
                        const newdata1 = new fisherman({
                            user,
                            amount: fish
                        }).save()
                        
                        message.channel.send(`You have caught ${fish} fish! 🐟`)
                    } else {
                        const fishconfig = await fisherman.findOne({
                            user
                        });
                        const DBnumber = await fishconfig.get("amount");
    
                        await fishconfig.updateOne({
                            amount: parseInt(DBnumber) + fish
                        }, {new: true});
                        console.log(DBnumber)
                        message.channel.send(`You have caught ${fish} fish! 🐟`)

                        const polestrengthnumber = await poleconfig.get("polestrength")

                        await poleconfig.updateOne({
                            polestrength: (polestrengthnumber) - 100
                        }, {new: true});


                        if(polestrengthnumber == 100) {
                            await poleconfig.updateOne({
                                pole: parseInt(dbnumber) - 1
                            })
                        }
                        
                    }
                })
            }
        }

        function progressionBar(availableDurability, totalDurability){
            let index = Math.round((availableDurability/totalDurability)*15);
          
            if((index => 1) && (index <=15)) {
              const bar = '≡≡≡≡≡≡≡≡≡≡≡≡≡'.split('');
              
              bar.splice(index, 0, '🔘');
              
              return `${bar.join('')}`;
            }else {
              return '🔘≡≡≡≡≡≡≡≡≡≡≡≡≡';
            }
          }// not done with this but works well