"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPENAI_CUA_TOOL_ANTHROPIC = exports.CLAUDE_COMPUTER_USE_TOOL_ANTHROPIC = exports.BROWSER_USE_TOOL_ANTHROPIC = exports.EXTRACT_TOOL_ANTHROPIC = exports.CRAWL_TOOL_ANTHROPIC = exports.SCREENSHOT_TOOL_ANTHROPIC = exports.SCRAPE_TOOL_ANTHROPIC = void 0;
const schema_1 = require("./schema");
exports.SCRAPE_TOOL_ANTHROPIC = {
    input_schema: schema_1.SCRAPE_SCHEMA,
    name: "scrape_webpage",
    description: "Scrape content from a webpage and return the content in markdown format",
};
exports.SCREENSHOT_TOOL_ANTHROPIC = {
    name: "screenshot_webpage",
    description: "Take a screenshot of a webpage and return the screenshot in screenshot format as a url",
    input_schema: schema_1.SCREENSHOT_SCHEMA,
};
exports.CRAWL_TOOL_ANTHROPIC = {
    input_schema: schema_1.CRAWL_SCHEMA,
    name: "crawl_website",
    description: "Crawl a website and return the content in markdown format",
};
exports.EXTRACT_TOOL_ANTHROPIC = {
    input_schema: schema_1.EXTRACT_SCHEMA,
    name: "extract_data",
    description: "Extract data in a structured format from multiple URLs in a single function call. IMPORTANT: When information must be gathered from multiple sources (such as comparing items, researching topics across sites, or answering questions that span multiple webpages), ALWAYS include all relevant URLs in ONE function call. This enables comprehensive answers with cross-referenced information. Returns data as a json string.",
};
exports.BROWSER_USE_TOOL_ANTHROPIC = {
    input_schema: schema_1.BROWSER_USE_SCHEMA,
    name: "browser_use",
    description: "Have an AI agent use a browser to perform a task on the web.",
};
exports.CLAUDE_COMPUTER_USE_TOOL_ANTHROPIC = {
    input_schema: schema_1.CLAUDE_COMPUTER_USE_SCHEMA,
    name: "claude_computer_use",
    description: schema_1.CLAUDE_COMPUTER_USE_DESCRIPTION,
};
exports.OPENAI_CUA_TOOL_ANTHROPIC = {
    input_schema: schema_1.OPENAI_CUA_SCHEMA,
    name: "openai_cua",
    description: schema_1.OPENAI_CUA_DESCRIPTION,
};
