import "dotenv/config";

import {readdirSync} from "fs";
import {join} from "path";

import FiddleClient from "./src/FiddleClient";
import FiddleMessage from "./src/FiddleMessage";
import FiddleCommand from "./src/FiddleCommand";

const client = new FiddleClient();

client.once("ready", function() {
    readdirSync("./commands")
        .filter(file => file.endsWith(".js"))
        .map(file => import(join("./commands", file)))
        .forEach(async function(cmd: Promise<FiddleCommand>) {
            let command = await cmd;
            client.commands.set(command.name, command);
        });

    client.user.setActivity({
        name: `music in ${client.guilds.cache.size} servers!`,
        type: "LISTENING"
    }).catch(console.error);

    client.database.connect(function(err) {
        if (err) throw err;
        console.log("Ready!");
    });
});

client.on("message", async function(message: FiddleMessage) {
    if (message.channel.type !== "text" || message.author.bot) return;

    if (!message.guild.prefix) {
        message.guild.prefix = await new Promise<string>(function(resolve, reject) {
            client.database.query("SELECT prefix FROM settings WHERE id=? LIMIT 1", [message.guild.id], function(error, results) {
                if (error) return reject(error);
                if (results.length > 0) return resolve(results[0].prefix);
                resolve(process.env.DEFAULT_PREFIX);
                client.database.query("INSERT INTO settings (id, prefix) VALUES (?, ?)", [message.guild.id, process.env.DEFAULT_PREFIX]);
            })
        });
    }

    if ((new RegExp(`^<@!?${client.user.id}>$`)).test(message.content))  {
        return message.reply(`my prefix for this server is \`${message.guild.prefix}\`, use \`${message.guild.prefix}help\` for more information.`);
    }

    if (!message.content.startsWith(message.guild.prefix)) return;

    let args = message.content.slice().split(/\s/g);
    let commandName = args.shift();

    if (client.commands.has(commandName)) client.commands.get(commandName).executor(message, args);
});

client.login().catch(console.error);