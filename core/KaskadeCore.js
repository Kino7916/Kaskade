const Discord = require('discord.js');
const fs = require("fs");
const path = require("path");
const structures = require("./structures");
const ClientInteraction = require('./structures/ClientInteraction');

/** @type {KaskadeTypes.InitOptions} */
const options = {
    name: "KaskadeCore",
    color: 33,
    verbose: true
}

function init() {
    console.log("Loading KaskadeCore...");

    Object.assign(process, {
        commands_path: path.join(require.main.path, 'bot/commands'),
        events_path: path.join(require.main.path, "bot/events"),
        status_path: path.join(require.main.path, "bot/status"),
        coreVersion: require("./version")
    });

    /** @type {import('./types/globals').Kaskade} */
    const Kaskade = {
        client: null,
        log: new (require("./KaskadeLog"))(options),
        config: require("../config.kaskade"),
        rest: new Discord.REST()
    }

    // Load global structures and objects
    Object.assign(global, {
        ClientCommand: structures.ClientCommand,
        ClientEvent: structures.ClientEvent,
        Kaskade: Kaskade
    });

    const client = new Discord.Client({
        intents: Kaskade.config["Kaskade.Config.Intents"]
    });
    Kaskade.client = client;

    // Loading modules
    Kaskade.log.print("Loading command modules")
    const registered_commands = load(process.commands_path);
    /** @type {KaskadeTypes.EventModule[]} */
    const registered_events = load(process.events_path);
    /** @type {KaskadeTypes.ActivityModule[]} */
    const registered_status = load(process.status_path);

    // Assigning system listeners
    Kaskade.log.print("Assigning system listeners")
    client.once("ready", () => {
        Kaskade.log.print("Application is ready!");
    });

    client.on("messageCreate", async (message) => {
        const args = message.content.trim().split(/ +/g);
        const requested_command = args.shift().toLowerCase();
        const prefix = Kaskade.config["Kaskade.Config.DefaultPrefix"] || "";
        const multiPrefix = Kaskade.config["Kaskade.Config.ListPrefix"] || [];
        let found_prefix = "";

        if (Kaskade.config["Kaskade.Config.IgnoreBots"] && message.author.bot) return;

        if (Kaskade.config["Kaskade.Config.WithPrefix"]) {
            if (Kaskade.config["Kaskade.Config.AllowMultiPrefix"]) {
                found_prefix = 
                multiPrefix.find(x => requested_command.startsWith(x)) ||
                (requested_command.startsWith(prefix) ? prefix : null);

                if (!found_prefix)
                    return;
            } else {
                if (!requested_command.startsWith(prefix)) return;
                found_prefix = prefix;
            }
        }

        const get_commands = registered_commands.filter(
            x => x.data.type === Discord.Events.MessageCreate &&
            !x.data.is_interaction &&
            (
            x.data.name.toLowerCase() === requested_command.slice(found_prefix.length) ||
            x.data._forceExecute
            )
        );
        
        for (const command of get_commands) {
            // const interaction = new ClientInteraction();
            // interaction.author = message.author;
            // interaction.channel = message.channel;
            // interaction.guild = message.guild;
            // interaction.member = message.member;
            
            // command.execute(interaction);
            command.execute(message);
        }
    });

    client.on("interactionCreate", async (i) => {
        if (!i.isChatInputCommand()) return;

        const get_commands = registered_commands.find(x => i.commandName === x.data.name && x.data.is_interaction);
        if (!get_commands) return;

        get_commands.execute(i);
    });

    // Handling events
    Kaskade.log.print("Registering bot events");
    registered_events.forEach(ev => ClientEvent.addEvent(ev));
    
    // Handling status
    
    /** @type {NodeJS.Timeout} */
    let timeout;
    /**
     * 
     * @param {KaskadeTypes.ActivityModule} ev 
     */
    const updateActivity = async () => {
        const newActivity = registered_status.shift();
        client.user.setActivity({ name: await newActivity.execute(), type: newActivity.type });
        registered_status.push(newActivity);
        if (registered_status.length < 1) {
            if (newActivity.time) Kaskade.log.print("Activity has time duration but only 1 is registered.");
            return;
        }

        clearTimeout(timeout);
        timeout = setTimeout(updateActivity, (newActivity.time || 5) * 1000);
    }

    // Login in to Discord
    client.login(Kaskade.config["Kaskade.Config.Token"])
        .then(() => {
            Kaskade.rest.setToken(client.token);

            if (registered_status.length) {
                Kaskade.log.print("Adding activity presence");
                // Warns if time is equal and below 5
                if (registered_status.some(x => x.time <= 5))
                    Kaskade.log.print("Warning! Activity presence has time equal and below 5, this might trigger a rate limit!");
                updateActivity();
            }

            // Adding application comandas
            const get_commands = registered_commands.filter(x => x.data.is_interaction);
            /** @type {Discord.SlashCommandBuilder[]} */
            const builders = [];
            for (const command of get_commands) {
                const builder = new Discord.SlashCommandBuilder()
                .setName(command.data.name)
                .setDescription(command.data.description);

                builders.push(builder);
            }

            const payload = { body: builders.map(x => x.toJSON()) };
            Kaskade.rest.put(Discord.Routes.applicationCommands(client.user.id), payload);

        });
}

/**
 * 
 * @param {string} p 
 * @returns {(KaskadeTypes.CommandModule)[]}
 */
function load(p) {
    const cmds = []
    for (const name_list of fs.readdirSync(p)) {
        const file_path = path.join(p, name_list);
        const stat = fs.statSync(file_path);

        if (stat.isDirectory()){
            const result = load(file_path);
            cmds.push(...result);
            continue;
        }

        if (stat.isFile() && name_list.endsWith(".js")) {
            /** @type {KaskadeTypes.CommandModule} */
            const get_cmd = require(file_path);
            if (get_cmd)
            cmds.push(get_cmd);

            continue;
        }
    }

    return cmds;
}

module.exports.init = init;
module.exports.load = load;
module.exports.options = options;