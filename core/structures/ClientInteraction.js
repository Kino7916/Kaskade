const { EmbedBuilder } = require('discord.js');

class ClientInteraction {
    static EmbedBuilder = EmbedBuilder;

    constructor() {
        /** @type {import('discord.js').User} */
        this.author;
        /** @type {import('discord.js').GuildMember} */
        this.member;
        /** @type {import('discord.js').TextChannel} */
        this.channel;
        /** @type {import('discord.js').Guild} */
        this.guild;
        /** @type {import('discord.js').Client} */
        this.client = Kaskade.client;
        /** @type {import('discord.js').Message} */
        this.message;
        /** @type {import('discord.js').Interaction} */
        this.interaction;

        /** @type {string} */
        this.content = "";
        /** @type {import('discord.js').Embed[]} */
        this.embeds = [];
        /** @type {import('discord.js').Attachment[]} */
        this.attachment = [];
    }

    /**
     * 
     * @param {string | import("discord.js").MessagePayload | import("discord.js").MessageCreateOptions} options 
     */
    reply(options) {
        return this.channel.send(options);
    }
}

module.exports = ClientInteraction;