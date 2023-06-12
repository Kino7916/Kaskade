const { GatewayIntentBits } = require("discord.js");

/** @type {KaskadeTypes.KaskadeConfig} */
const config = {
    "Kaskade.Config.WithPrefix": true,
    "Kaskade.Config.DynamicPrefix": false,
    "Kaskade.Config.DefaultPrefix": "k.",
    "Kaskade.Config.AllowMultiPrefix": true,
    "Kaskade.Config.ListPrefix": ["yu.", "ka."],
    "Kaskade.Config.IgnoreBots": true,
    "Kaskade.Config.Token": "Bot Token Here Uwu",
    "Kaskade.Config.Intents": [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
}

module.exports = config;