import FiddleMessage from "./FiddleMessage";
import FiddleClient from "./FiddleClient";

export default interface FiddleCommand {
    name: string;
    executor: (client: FiddleClient, message: FiddleMessage, args: string[]) => void;
    description: string;
    usage: string;
    example: string;
}