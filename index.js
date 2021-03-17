require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const command = require("./Events");
const emojiChannelID = '821843069280321536';
let channelID = "821843069280321536";
const nblx = require("noblox.js")
let logs = "821843956643004487";
let cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_F744995DC9DEEC2FA72C2AA53AA5BEAB501E3BCFABC54BBC6CBA07BA34B7004AC8D9FBC878D7F922080C02C974155B80C63D5E763AACDE0F59ACF89321441B84490C42353A50FED4BDBB30D86CB6AF57D151CB03585161E6158D8C04E7763F4E77582006A7B2971A87814147D368C35547D62F417990285052851FC585AAED4F982E4FA36DB379FCAB31FE271A77650A3E2893DD0212D01511C708817CC239438F6E75A3D956C6674D8345910A2F0EFFC98113EAD626C1EFC8DABAF0708426749FFAB437E8FAF73111B162E0A455B17D3AA041C82AB4BB293E0A4D8B34BAC6FEB3D3C3AE965FFA9C74C8B7C94B033B7C0BAC2E7DDB90F0FF1FFA6EAF1B1A85AC7FDE0DEC712A4B56B51CA095D81F79C3BAD99E1B332879ECAC954A36E1F2087B54B138FDCA3CD68503CC35AC91AC49BF86DF2B27"
function findInMessage(embed) {
  for (let field of embed.fields) {
      if (field.name == 'Username') {
          return field.value;
      }
  }
}
nblx.setCookie(cookie)
client.on('ready', async () => {
    console.log("BOT IS ONLINE");
    try {
    const channel = client.channels.cache.get(emojiChannelID);
    if (!channel) return console.error('Invalid ID or missing channel.');

    const messages = await channel.messages.fetch({ limit: 100 });

    for (const [id, message] of messages) {
      await message.react('✅');
      await message.react('✖');
    }
  } catch(err) {
    console.error(err);
  }
});

client.on('message', async message => {
    if (message.channel.id === emojiChannelID) {
      try {
        await message.react('✅');
        await message.react('✖');
      } catch(err) {
        console.error(err);
      }
    }   
  });

  client.on("messageReactionAdd", (reaction, user) => { // When a reaction is added

    if(user.bot || !reaction.message.guild.members.cache.get(user.id).hasPermission('ADMINISTRATOR')) return; // If the user who reacted is a bot, return
    if(reaction.emoji.name !== "✖") return; // If the emoji is not a ✖, return
    let member = reaction.message.guild.members.cache.get(user.id); // Fetch the guild member who added the reaction
    
    // LOG 
    client.channels.cache.get(logs).send( '<@' + member +'>' + " Has Declined an application", reaction.message.embeds[0])

    reaction.message.delete()
});
  client.on("messageReactionAdd", async (reaction, user) => { // When a reaction is added

    if(user.bot || !reaction.message.guild.members.cache.get(user.id).hasPermission('ADMINISTRATOR')) return; // If the user who reacted is a bot, return
    if(reaction.emoji.name !== "✅") return; // If the emoji is not a ✅, return
    let member = reaction.message.guild.members.cache.get(user.id); // Fetch the guild member who added the reaction
    
    // LOG 
    client.channels.cache.get(logs).send( '<@' + member +'>' + " Has Accepted an application", reaction.message.embeds[0])

    let username = findInMessage(reaction.message.embeds[0]);
    await command.accept(username)

    reaction.message.delete()
});

client.login(process.env.DISCORD_BOT_TOKEN);