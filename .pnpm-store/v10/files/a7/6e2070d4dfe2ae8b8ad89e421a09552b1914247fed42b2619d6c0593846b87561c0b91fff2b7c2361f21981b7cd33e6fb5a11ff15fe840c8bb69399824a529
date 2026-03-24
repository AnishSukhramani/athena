"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAICuaTool = exports.ClaudeComputerUseTool = exports.BrowserUseTool = exports.WebsiteExtractTool = exports.WebsiteCrawlTool = exports.WebsiteScreenshotTool = exports.WebsiteScrapeTool = void 0;
const openai_1 = require("./openai");
const anthropic_1 = require("./anthropic");
class WebsiteScrapeTool {
    static async runnable(hb, params) {
        const resp = await hb.scrape.startAndWait(params);
        return resp.data?.markdown || "";
    }
}
exports.WebsiteScrapeTool = WebsiteScrapeTool;
WebsiteScrapeTool.openaiToolDefinition = openai_1.SCRAPE_TOOL_OPENAI;
WebsiteScrapeTool.anthropicToolDefinition = anthropic_1.SCRAPE_TOOL_ANTHROPIC;
class WebsiteScreenshotTool {
    static async runnable(hb, params) {
        const resp = await hb.scrape.startAndWait(params);
        return resp.data?.screenshot || "";
    }
}
exports.WebsiteScreenshotTool = WebsiteScreenshotTool;
WebsiteScreenshotTool.openaiToolDefinition = openai_1.SCREENSHOT_TOOL_OPENAI;
WebsiteScreenshotTool.anthropicToolDefinition = anthropic_1.SCREENSHOT_TOOL_ANTHROPIC;
class WebsiteCrawlTool {
    static async runnable(hb, params) {
        const resp = await hb.crawl.startAndWait(params);
        let markdown = "";
        if (resp.data) {
            for (const page of resp.data) {
                if (page.markdown) {
                    markdown += `\n${"-".repeat(50)}\nUrl: ${page.url}\nMarkdown:\n${page.markdown}\n`;
                }
            }
        }
        return markdown;
    }
}
exports.WebsiteCrawlTool = WebsiteCrawlTool;
WebsiteCrawlTool.openaiToolDefinition = openai_1.CRAWL_TOOL_OPENAI;
WebsiteCrawlTool.anthropicToolDefinition = anthropic_1.CRAWL_TOOL_ANTHROPIC;
class WebsiteExtractTool {
    static async runnable(hb, params) {
        if (params.schema && typeof params.schema === "string") {
            params.schema = JSON.parse(params.schema);
        }
        const resp = await hb.extract.startAndWait(params);
        return resp.data ? JSON.stringify(resp.data) : "";
    }
}
exports.WebsiteExtractTool = WebsiteExtractTool;
WebsiteExtractTool.openaiToolDefinition = openai_1.EXTRACT_TOOL_OPENAI;
WebsiteExtractTool.anthropicToolDefinition = anthropic_1.EXTRACT_TOOL_ANTHROPIC;
class BrowserUseTool {
    static async runnable(hb, params) {
        const resp = await hb.agents.browserUse.startAndWait(params);
        return resp.data?.finalResult || resp.error || "";
    }
}
exports.BrowserUseTool = BrowserUseTool;
BrowserUseTool.openaiToolDefinition = openai_1.BROWSER_USE_TOOL_OPENAI;
BrowserUseTool.anthropicToolDefinition = anthropic_1.BROWSER_USE_TOOL_ANTHROPIC;
class ClaudeComputerUseTool {
    static async runnable(hb, params) {
        const resp = await hb.agents.claudeComputerUse.startAndWait(params);
        return resp.data?.finalResult || resp.error || "";
    }
}
exports.ClaudeComputerUseTool = ClaudeComputerUseTool;
ClaudeComputerUseTool.openaiToolDefinition = openai_1.CLAUDE_COMPUTER_USE_TOOL_OPENAI;
ClaudeComputerUseTool.anthropicToolDefinition = anthropic_1.CLAUDE_COMPUTER_USE_TOOL_ANTHROPIC;
class OpenAICuaTool {
    static async runnable(hb, params) {
        const resp = await hb.agents.cua.startAndWait(params);
        return resp.data?.finalResult || resp.error || "";
    }
}
exports.OpenAICuaTool = OpenAICuaTool;
OpenAICuaTool.openaiToolDefinition = openai_1.OPENAI_CUA_TOOL_OPENAI;
OpenAICuaTool.anthropicToolDefinition = anthropic_1.OPENAI_CUA_TOOL_ANTHROPIC;
