"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class HelpCommand {
    constructor() {
        this.name = "help";
        this.description = "Shows a list of commands";
        this.usage = "!help [command]";
        this.example = "!help play";
    }
    executor(client, message, args) {
        const embed = new discord_js_1.MessageEmbed();
        embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
        embed.setColor("RANDOM");
        if (args.length === 0) {
            embed.setTitle(`${message.guild.me.displayName}: Commands`);
            client.commands.forEach(command => embed.addField(message.guild.prefix + command.name, command.description, false));
        }
        else if (client.commands.has(args[0])) {
            const command = client.commands.get(args[0]);
            embed.setTitle(message.guild.prefix + command.name);
            embed.setDescription(command.description);
            embed.addField("Usage", command.usage, true);
            embed.addField("Example", command.example, true);
        }
        else {
            embed.setColor("RED");
            embed.setTitle("Error");
            embed.setDescription(`The command \`${args[0]}\` does not exist.`);
        }
        message.channel.send(embed).catch(console.error);
    }
}
exports.default = HelpCommand;
//# sourceMappingURL=HelpCommand.js.map