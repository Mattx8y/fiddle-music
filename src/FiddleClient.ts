import {Client, Collection} from "discord.js";
import {createConnection} from "mysql";

import FiddleCommand from "./FiddleCommand";

export default class FiddleClient extends Client {
    commands: Collection<string, FiddleCommand> = new Collection();
    database = createConnection({
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });
}