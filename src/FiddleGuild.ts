import {Guild} from "discord.js";
import FiddleClient from "./FiddleClient";

export default class FiddleGuild extends Guild {
    client: FiddleClient;
    prefix?: string;
}