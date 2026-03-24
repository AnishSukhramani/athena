import EventEmitter from "events";
type ErrorEvents = {
    error: (error: Error) => void;
};
export declare class ErrorEmitter extends EventEmitter {
    on<K extends keyof ErrorEvents>(event: K, listener: ErrorEvents[K]): this;
    once<K extends keyof ErrorEvents>(event: K, listener: ErrorEvents[K]): this;
    off<K extends keyof ErrorEvents>(event: K, listener: ErrorEvents[K]): this;
    emit<K extends keyof ErrorEvents>(event: K, ...args: Parameters<ErrorEvents[K]>): boolean;
    addListener<K extends keyof ErrorEvents>(eventName: K, listener: (...args: Parameters<ErrorEvents[K]>) => void): this;
}
export {};
