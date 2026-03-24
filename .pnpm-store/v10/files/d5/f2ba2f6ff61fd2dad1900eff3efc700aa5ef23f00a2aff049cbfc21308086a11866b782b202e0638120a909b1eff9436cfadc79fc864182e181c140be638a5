"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperbrowserProvider = void 0;
const playwright_core_1 = require("playwright-core");
const sdk_1 = require("@hyperbrowser/sdk");
const types_1 = __importDefault(require("../types/browser-providers/types"));
class HyperbrowserProvider extends types_1.default {
    constructor(params) {
        super();
        this.debug = params?.debug ?? false;
        this.browserConfig = params?.browserConfig;
        this.sessionConfig = params?.sessionConfig;
        this.config = params?.config;
    }
    async start() {
        const client = new sdk_1.Hyperbrowser(this.config);
        const session = await client.sessions.create(this.sessionConfig);
        this.hbClient = client;
        this.session = session;
        this.browser = await playwright_core_1.chromium.connectOverCDP(session.wsEndpoint, this.browserConfig);
        if (this.debug) {
            console.log("\nHyperbrowser session info:", {
                liveUrl: session.liveUrl,
                sessionID: session.id,
                infoUrl: session.sessionUrl,
            }, "\n");
        }
        return this.browser;
    }
    async close() {
        await this.browser?.close();
        if (this.session) {
            await this.hbClient?.sessions.stop(this.session.id);
        }
    }
    getSession() {
        if (!this.session) {
            return null;
        }
        return this.session;
    }
}
exports.HyperbrowserProvider = HyperbrowserProvider;
