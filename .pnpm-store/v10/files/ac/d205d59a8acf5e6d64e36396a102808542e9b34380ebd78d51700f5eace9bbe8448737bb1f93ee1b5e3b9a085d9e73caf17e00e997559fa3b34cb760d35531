import { Browser, ConnectOverCDPOptions } from "playwright-core";
import { Hyperbrowser } from "@hyperbrowser/sdk";
import { CreateSessionParams, HyperbrowserConfig, SessionDetail } from "@hyperbrowser/sdk/types";
import BrowserProvider from "../types/browser-providers/types";
export declare class HyperbrowserProvider extends BrowserProvider<SessionDetail> {
    browserConfig: Omit<ConnectOverCDPOptions, "endpointURL"> | undefined;
    sessionConfig: CreateSessionParams | undefined;
    config: HyperbrowserConfig | undefined;
    browser: Browser | undefined;
    session: SessionDetail | undefined;
    hbClient: Hyperbrowser | undefined;
    debug: boolean;
    constructor(params?: {
        debug?: boolean;
        browserConfig?: Omit<ConnectOverCDPOptions, "endpointURL">;
        sessionConfig?: CreateSessionParams;
        config?: HyperbrowserConfig;
    });
    start(): Promise<Browser>;
    close(): Promise<void>;
    getSession(): SessionDetail | null;
}
