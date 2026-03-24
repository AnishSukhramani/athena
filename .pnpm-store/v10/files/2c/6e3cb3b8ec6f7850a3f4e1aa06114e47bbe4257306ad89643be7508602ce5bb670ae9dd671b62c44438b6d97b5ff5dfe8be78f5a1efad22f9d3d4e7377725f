"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractActionDefinition = exports.ExtractAction = void 0;
const zod_1 = require("zod");
const html_to_markdown_1 = require("../../utils/html-to-markdown");
const fs_1 = __importDefault(require("fs"));
const cdp_1 = require("../../cdp");
exports.ExtractAction = zod_1.z
    .object({
    objective: zod_1.z.string().describe("The goal of the extraction."),
})
    .describe("Extract content from the page according to the objective, e.g. product prices, contact information, article text, table data, or specific metadata fields");
exports.ExtractActionDefinition = {
    type: "extract",
    actionParams: exports.ExtractAction,
    run: async (ctx, action) => {
        try {
            const content = await ctx.page.content();
            const markdown = await (0, html_to_markdown_1.parseMarkdown)(content);
            const objective = action.objective;
            // Take a screenshot of the page
            const cdpClient = await (0, cdp_1.getCDPClient)(ctx.page);
            const cdpSession = await cdpClient.acquireSession("screenshot");
            const screenshot = await cdpSession.send("Page.captureScreenshot");
            // Save screenshot to debug dir if exists
            if (ctx.debugDir) {
                fs_1.default.writeFileSync(`${ctx.debugDir}/extract-screenshot.png`, Buffer.from(screenshot.data, "base64"));
            }
            // Trim markdown to stay within token limit
            // TODO: this is a hack, we should use a better token counting method
            const avgTokensPerChar = 0.75; // Conservative estimate of tokens per character
            const maxChars = Math.floor(ctx.tokenLimit / avgTokensPerChar);
            const trimmedMarkdown = markdown.length > maxChars
                ? markdown.slice(0, maxChars) + "\n[Content truncated due to length]"
                : markdown;
            if (ctx.debugDir) {
                fs_1.default.writeFileSync(`${ctx.debugDir}/extract-markdown-content.md`, trimmedMarkdown);
            }
            const response = await ctx.llm.invoke([
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Extract the following information from the page according to this objective: "${objective}"\n\nPage content:\n${trimmedMarkdown}\nHere is a screenshot of the page:\n`,
                        },
                        {
                            type: "image",
                            url: `data:image/png;base64,${screenshot.data}`,
                            mimeType: "image/png",
                        },
                    ],
                },
            ]);
            // Handle both string and HyperAgentContentPart[] responses
            let extractedContent = "";
            if (typeof response.content === "string") {
                extractedContent = response.content;
            }
            else if (Array.isArray(response.content)) {
                // Extract text from content parts
                extractedContent = response.content
                    .filter((part) => part.type === "text")
                    .map((part) => part.text)
                    .join("");
            }
            if (extractedContent.length === 0) {
                return {
                    success: false,
                    message: `No content extracted from page.`,
                };
            }
            return {
                success: true,
                message: `Extracted content from page:\n${extractedContent}`,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Failed to extract content: ${error}`,
            };
        }
    },
    pprintAction: function (params) {
        return `Extract content from page with objective: "${params.objective}"`;
    },
};
