import { Browser, LaunchOptions } from "playwright-core";
import BrowserProvider from "../types/browser-providers/types";
export declare class LocalBrowserProvider extends BrowserProvider<Browser> {
    options: Omit<Omit<LaunchOptions, "headless">, "channel"> | undefined;
    session: Browser | undefined;
    constructor(options?: Omit<Omit<LaunchOptions, "headless">, "channel">);
    start(): Promise<Browser>;
    close(): Promise<void>;
    getSession(): Browser | null;
}
