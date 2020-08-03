import {Message} from "discord.js";
import FiddleGuild from "./FiddleGuild";

export default class FiddleMessage extends Message {
    guild: FiddleGuild;
}