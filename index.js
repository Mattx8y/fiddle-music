"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fs_1 = require("fs");
const path_1 = require("path");
const FiddleClient_1 = require("./src/FiddleClient");
const client = new FiddleClient_1.default();
client.once("ready", function () {
    fs_1.readdirSync("./commands")
        .filter(file => file.endsWith(".js"))
        .map(file => Promise.resolve().then(() => require(path_1.join("./commands", file))))
        .forEach(function (cmd) {
        return __awaiter(this, void 0, void 0, function* () {
            let command = yield cmd;
            client.commands.set(command.name, command);
        });
    });
    client.user.setActivity({
        name: `music in ${client.guilds.cache.size} servers!`,
        type: "LISTENING"
    }).catch(console.error);
    client.database.connect(function (err) {
        if (err)
            throw err;
        console.log("Ready!");
    });
});
client.on("message", function (message) {
    return __awaiter(this, void 0, void 0, function* () {
        if (message.channel.type !== "text" || message.author.bot)
            return;
        if (!message.guild.prefix) {
            message.guild.prefix = yield new Promise(function (resolve, reject) {
                client.database.query("SELECT prefix FROM settings WHERE id=? LIMIT 1", [message.guild.id], function (error, results) {
                    if (error)
                        return reject(error);
                    if (results.length > 0)
                        return resolve(results[0].prefix);
                    resolve(process.env.DEFAULT_PREFIX);
                    client.database.query("INSERT INTO settings (id, prefix) VALUES (?, ?)", [message.guild.id, process.env.DEFAULT_PREFIX]);
                });
            });
        }
        if ((new RegExp(`^<@!?${client.user.id}>$`)).test(message.content)) {
            return message.reply(`my prefix for this server is \`${message.guild.prefix}\`, use \`${message.guild.prefix}help\` for more information.`);
        }
        if (!message.content.startsWith(message.guild.prefix))
            return;
        let args = message.content.slice().split(/\s/g);
        let commandName = args.shift();
        if (client.commands.has(commandName))
            client.commands.get(commandName).executor(message, args);
    });
});
client.login().catch(console.error);
//# sourceMappingURL=index.js.map