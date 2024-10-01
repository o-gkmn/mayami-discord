require('dotenv').config();
const {Client, Events, GatewayIntentBits, SlashCommandBuilder} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds]});

const nacl = require("tweetnacl");

// Your public key can be found on your application in the Developer Portal
const PUBLIC_KEY = "b6e80f4437bdd1e3ccbb14baecdfebb3e6845bdc61a20289295d223b9be9b637";

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
    if (req.body.type === 1) {
        return res.json({
            type: 1
        });
    }

    console.log("adadsad");
    const signature = req.get("X-Signature-Ed25519");
    const timestamp = req.get("X-Signature-Timestamp");
    const body = req.rawBody; // rawBody is expected to be a string, not raw bytes

    const isVerified = nacl.sign.detached.verify(
        Buffer.from(timestamp + body),
        Buffer.from(signature, "hex"),
        Buffer.from(PUBLIC_KEY, "hex")
    );

    if (!isVerified) {
        return res.status(401).end("invalid request signature");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`);


    const ping = new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with "Ponggg!"')

    const love = new SlashCommandBuilder()
        .setName('love')
        .setDescription('Say Love')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to say love to')
                .setRequired(false)
        )

const hello = new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Say hello to someone')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to say hi to')
                .setRequired(false)
        )
const pingCommand = ping.toJSON();
client.application.commands.create(pingCommand, "435519356043132956");

    const pingCommand1 = love.toJSON();
    client.application.commands.create(pingCommand1, "435519356043132956");

});

client.on(Events.InteractionCreate, interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === "ping") {
        interaction.reply("Pong!");
    }
    if(interaction.commandName === "love"){
        let user = (interaction.options.getUser('user'))
        if(!user) user = interaction.user;
        interaction.reply(`Seni Çok Seviyorum ${user.username}`);
    }


    if(interaction.commandName === "hello"){
        let user = (interaction.options.getUser('user'))
        if(!user) user = interaction.user;
        interaction.reply(`Hello ${user.username}`);
    }
    console.log(interaction);
});

client.login(process.env.TOKEN);