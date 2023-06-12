import type Discord from "discord.js";
import ClientCommand_1 from "../structures/ClientCommand";
import ClientEvent_1 from "../structures/ClientEvent";
import KaskadeLog from "../KaskadeLog";
import ClientInteraction from "../structures/ClientInteraction";

interface Kaskade {
    client: Discord.Client;
    log: KaskadeLog;
    config: KaskadeTypes.KaskadeConfig;
    rest: Discord.REST;
}

declare global {
    namespace KaskadeTypes {
        export interface InitOptions {
            name: string;
            color: number;
            verbose: boolean;
        }
        export interface CommandModule<K extends (Discord.Message | Discord.Interaction) = Discord.Message> {
            data: ClientCommand_1;
            execute: (data: K) => any;
        }
        export interface EventModule<K extends Discord.Events = Discord.Events.ClientReady> {
            data: ClientEvent_1;
            execute: (...data: Discord.ClientEvents[K]) => any;
        }

        export interface ActivityModule {
            type: Discord.ActivityType;
            time: number;
            execute: () => Promise<string>;
        }

        export interface KaskadeConfig {
            "Kaskade.Config.WithPrefix": boolean;
            "Kaskade.Config.DynamicPrefix": boolean;
            "Kaskade.Config.DefaultPrefix": string;
            "Kaskade.Config.AllowMultiPrefix": boolean;
            "Kaskade.Config.ListPrefix": Array<string>;
            "Kaskade.Config.IgnoreBots": boolean;
            "Kaskade.Config.Token": string;
            "Kaskade.Config.Intents": Discord.BitFieldResolvable<Discord.GatewayIntentsString>;
        }
    }

    namespace NodeJS {
        interface Process {
            commands_path: string;
            events_path: string;
            coreVersion: {
                core_version: string;
            }
        }
    }

    var ClientCommand: typeof ClientCommand_1;
    var ClientEvent: typeof ClientEvent_1;
    var Kaskade: Kaskade;
}