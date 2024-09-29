require('dotenv').config();
const{Client,Events,GatewayIntentBits,SlashCommandBuilder} = require('discord.js');
const client = new Client({intents:[GatewayIntentBits.Guilds]});


client.once(Events.ClientReady, c=>{
    console.log(`Logged in as ${c.user.tag}`);


const ping = new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with "Pong!"')

const love = new SlashCommandBuilder()
        .setName('love')
        .setDescription('Say Love')

const pingCommand = ping.toJSON();
client.application.commands.create(pingCommand, "1024750030390825000");

const pingCommand1 = love.toJSON();
client.application.commands.create(pingCommand1, "1024750030390825000");

});

client.on(Events.InteractionCreate, interaction =>{
    if(!interaction.isChatInputCommand()) return;
    if(interaction.commandName === "ping"){
        interaction.reply("Pong!");
    }
    if(interaction.commandName === "love"){
        interaction.reply("Seni Çok Seviyorum!");
    }
    console.log(interaction);
})

client.login(process.env.TOKEN);