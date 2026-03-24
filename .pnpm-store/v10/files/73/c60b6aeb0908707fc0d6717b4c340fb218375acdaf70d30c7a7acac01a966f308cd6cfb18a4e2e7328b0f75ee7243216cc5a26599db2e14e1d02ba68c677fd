import { HyperbrowserConfig } from "./types/config";
import { SessionsService } from "./services/sessions";
import { ScrapeService } from "./services/scrape";
import { CrawlService } from "./services/crawl";
import { ProfilesService } from "./services/profiles";
import { ExtensionService } from "./services/extensions";
import { ExtractService } from "./services/extract";
import { BrowserUseService } from "./services/agents/browser-use";
import { CuaService } from "./services/agents/cua";
import { ClaudeComputerUseService } from "./services/agents/claude-computer-use";
import { HyperAgentService } from "./services/agents/hyper-agent";
import { TeamService } from "./services/team";
import { ComputerActionService } from "./services/computer-action";
import { GeminiComputerUseService } from "./services/agents/gemini-computer-use";
export declare class HyperbrowserError extends Error {
    statusCode?: number | undefined;
    constructor(message: string, statusCode?: number | undefined);
}
export declare class HyperbrowserClient {
    readonly sessions: SessionsService;
    readonly scrape: ScrapeService;
    readonly crawl: CrawlService;
    readonly extract: ExtractService;
    readonly profiles: ProfilesService;
    readonly extensions: ExtensionService;
    readonly agents: {
        browserUse: BrowserUseService;
        claudeComputerUse: ClaudeComputerUseService;
        cua: CuaService;
        hyperAgent: HyperAgentService;
        geminiComputerUse: GeminiComputerUseService;
    };
    readonly team: TeamService;
    readonly computerAction: ComputerActionService;
    constructor(config?: HyperbrowserConfig);
}
