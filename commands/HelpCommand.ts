import FiddleCommand from "../src/FiddleCommand";
import FiddleMessage from "../src/FiddleMessage";
import FiddleClient from "../src/FiddleClient";
import {MessageEmbed} from "discord.js";

export default class HelpCommand implements FiddleCommand {
    name = "help";
    description = "Shows a list of commands";
    usage = "!help [command]";
    example = "!help play";

    executor(client: FiddleClient, message: FiddleMessage, args: string[]) {
        const embed = new MessageEmbed();
        embed.setThumbnail(message.author.displayAvatarURL({dynamic: true}));
        embed.setColor("RANDOM");
        if (args.length === 0) {
            embed.setTitle(`${message.guild.me.displayName}: Commands`);
            client.commands.forEach(command => embed.addField(message.guild.prefix + command.name, command.description, false));
        } else if (client.commands.has(args[0])) {
            const command = client.commands.get(args[0]);
            embed.setTitle(message.guild.prefix + command.name);
            embed.setDescription(command.description);
        } else {
            embed.setColor("RED");
            embed.setTitle("Error");
            embed.setDescription(`The command \`${args[0]}\` does not exist.`);
        }
        message.channel.send(embed).catch(console.error);
    }
}