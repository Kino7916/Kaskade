const { ApplicationCommandType, Events } = require("discord.js");

class ClientCommand {
    constructor() {
        /** @type {string} */
        this.name = "";
        /** @type {string} */
        this.description = "";
        /** @type {string[]} */
        this.aliases = [];
        /** @type {ApplicationCommandType | Events} */
        this.type = Events.MessageCreate;

        // Application commands
        

        /** @type {boolean} */
        this.is_interaction = false;
        /** @type {boolean} */
        this.devOnly = false;
        /** @type {boolean} */
        this.adminOnly = false;
        /** @type {boolean} */
        this._alwaysExecute = false;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setDescription(value) {
        this.description = value;
        return this;
    }

    /**
     * 
     * @param {ApplicationCommandType | Events} type 
     */
    setType(type) {
        this.type = type;
        return this;
    }

    setAsInteraction() {
        this.is_interaction = true;
        return this;
    }

    isInteractionCommand() {
        return this.is_interaction;
    }
    
    forDevOnly() {
        this.devOnly = true;
        return this;
    }

    forAdminsOnly() {
        this.adminOnly = true;
        return this;
    }

    alwaysExecute() {
        this._alwaysExecute = true;
        return this;
    }
}

module.exports = ClientCommand;