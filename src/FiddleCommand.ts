import FiddleMessage from "./FiddleMessage";

export default interface FiddleCommand {
    name: string;
    executor: (message: FiddleMessage, args: string[]) => void;
}