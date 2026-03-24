"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalBrowserProvider = void 0;
const playwright_core_1 = require("playwright-core");
const types_1 = __importDefault(require("../types/browser-providers/types"));
class LocalBrowserProvider extends types_1.default {
    constructor(options) {
        super();
        this.options = options;
    }
    async start() {
        const launchArgs = this.options?.args ?? [];
        const browser = await playwright_core_1.chromium.launch({
            ...(this.options ?? {}),
            channel: "chrome",
            headless: false,
            args: ["--disable-blink-features=AutomationControlled", ...launchArgs],
        });
        this.session = browser;
        return this.session;
    }
    async close() {
        return await this.session?.close();
    }
    getSession() {
        if (!this.session) {
            return null;
        }
        return this.session;
    }
}
exports.LocalBrowserProvider = LocalBrowserProvider;
