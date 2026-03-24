"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPENAI_CUA_TOOL_OPENAI = exports.CLAUDE_COMPUTER_USE_TOOL_OPENAI = exports.BROWSER_USE_TOOL_OPENAI = exports.EXTRACT_TOOL_OPENAI = exports.CRAWL_TOOL_OPENAI = exports.SCREENSHOT_TOOL_OPENAI = exports.SCRAPE_TOOL_OPENAI = void 0;
const schema_1 = require("./schema");
exports.SCRAPE_TOOL_OPENAI = {
    type: "function",
    function: {
        name: "scrape_webpage",
        description: "Scrape content from a webpage and return the content in markdown format",
        parameters: schema_1.SCRAPE_SCHEMA,
        strict: true,
    },
};
exports.SCREENSHOT_TOOL_OPENAI = {
    type: "function",
    function: {
        name: "screenshot_webpage",
        description: "Take a screenshot of a webpage and return the screenshot in screenshot format as a url",
        parameters: schema_1.SCREENSHOT_SCHEMA,
        strict: true,
    },
};
exports.CRAWL_TOOL_OPENAI = {
    type: "function",
    function: {
        name: "crawl_website",
        description: "Crawl a website and return the content in markdown format",
        parameters: schema_1.CRAWL_SCHEMA,
        strict: true,
    },
};
exports.EXTRACT_TOOL_OPENAI = {
    type: "function",
    function: {
        name: "extract_data",
        description: "Extract data in a structured format from multiple URLs in a single function call. IMPORTANT: When information must be gathered from multiple sources (such as comparing items, researching topics across sites, or answering questions that span multiple webpages), ALWAYS include all relevant URLs in ONE function call. This enables comprehensive answers with cross-referenced information. Returns data as a json string.",
        parameters: schema_1.EXTRACT_SCHEMA,
        strict: true,
    },
};
exports.BROWSER_USE_TOOL_OPENAI = {
    type: "function",
    function: {
        name: "browser_use",
        description: "Have an AI agent use a browser to perform a task on the web.",
        parameters: schema_1.BROWSER_USE_SCHEMA,
        strict: true,
    },
};
exports.CLAUDE_COMPUTER_USE_TOOL_OPENAI = {
    type: "function",
    function: {
        name: "claude_computer_use",
        description: schema_1.CLAUDE_COMPUTER_USE_DESCRIPTION,
        parameters: schema_1.CLAUDE_COMPUTER_USE_SCHEMA,
        strict: true,
    },
};
exports.OPENAI_CUA_TOOL_OPENAI = {
    type: "function",
    function: {
        name: "openai_cua",
        description: schema_1.OPENAI_CUA_DESCRIPTION,
        parameters: schema_1.OPENAI_CUA_SCHEMA,
        strict: true,
    },
};
