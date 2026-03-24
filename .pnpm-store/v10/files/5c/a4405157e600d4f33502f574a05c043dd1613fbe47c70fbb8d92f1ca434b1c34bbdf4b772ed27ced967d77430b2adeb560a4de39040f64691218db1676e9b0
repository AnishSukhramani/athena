"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperbrowserClient = exports.HyperbrowserError = void 0;
const sessions_1 = require("./services/sessions");
const scrape_1 = require("./services/scrape");
const crawl_1 = require("./services/crawl");
const profiles_1 = require("./services/profiles");
const extensions_1 = require("./services/extensions");
const extract_1 = require("./services/extract");
const browser_use_1 = require("./services/agents/browser-use");
const cua_1 = require("./services/agents/cua");
const claude_computer_use_1 = require("./services/agents/claude-computer-use");
const hyper_agent_1 = require("./services/agents/hyper-agent");
const team_1 = require("./services/team");
const computer_action_1 = require("./services/computer-action");
const gemini_computer_use_1 = require("./services/agents/gemini-computer-use");
class HyperbrowserError extends Error {
    constructor(message, statusCode) {
        super(`[Hyperbrowser]: ${message}`);
        this.statusCode = statusCode;
        this.name = "HyperbrowserError";
    }
}
exports.HyperbrowserError = HyperbrowserError;
class HyperbrowserClient {
    constructor(config = {}) {
        const apiKey = config.apiKey || process.env["HYPERBROWSER_API_KEY"];
        const baseUrl = config.baseUrl || "https://api.hyperbrowser.ai";
        const timeout = config.timeout || 30000;
        if (!apiKey) {
            throw new HyperbrowserError("API key is required - either pass it in config or set HYPERBROWSER_API_KEY environment variable");
        }
        this.sessions = new sessions_1.SessionsService(apiKey, baseUrl, timeout);
        this.scrape = new scrape_1.ScrapeService(apiKey, baseUrl, timeout);
        this.crawl = new crawl_1.CrawlService(apiKey, baseUrl, timeout);
        this.extract = new extract_1.ExtractService(apiKey, baseUrl, timeout);
        this.profiles = new profiles_1.ProfilesService(apiKey, baseUrl, timeout);
        this.extensions = new extensions_1.ExtensionService(apiKey, baseUrl, timeout);
        this.team = new team_1.TeamService(apiKey, baseUrl, timeout);
        this.computerAction = new computer_action_1.ComputerActionService(apiKey, baseUrl, timeout);
        this.agents = {
            browserUse: new browser_use_1.BrowserUseService(apiKey, baseUrl, timeout),
            claudeComputerUse: new claude_computer_use_1.ClaudeComputerUseService(apiKey, baseUrl, timeout),
            cua: new cua_1.CuaService(apiKey, baseUrl, timeout),
            hyperAgent: new hyper_agent_1.HyperAgentService(apiKey, baseUrl, timeout),
            geminiComputerUse: new gemini_computer_use_1.GeminiComputerUseService(apiKey, baseUrl, timeout),
        };
    }
}
exports.HyperbrowserClient = HyperbrowserClient;
