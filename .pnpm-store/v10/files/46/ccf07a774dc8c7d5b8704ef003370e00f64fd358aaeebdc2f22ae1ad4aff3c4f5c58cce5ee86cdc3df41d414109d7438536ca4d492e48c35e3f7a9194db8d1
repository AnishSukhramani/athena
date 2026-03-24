"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.turndownService = void 0;
exports.parseMarkdown = parseMarkdown;
const turndown_1 = __importDefault(require("turndown"));
// TODO: Add gfm plugin
// import { gfm } from "joplin-turndown-plugin-gfm";
exports.turndownService = new turndown_1.default();
exports.turndownService.addRule("removeUnwantedTags", {
    filter: ["head", "script", "style"],
    replacement: function () {
        return "";
    },
});
exports.turndownService.addRule("inlineLink", {
    filter: function (node, options) {
        return (options.linkStyle === "inlined" &&
            node.nodeName === "A" &&
            node.getAttribute("href"));
    },
    replacement: function (content, node) {
        var href = node.getAttribute("href").trim();
        var title = node.title ? ' "' + node.title + '"' : "";
        return "[" + content.trim() + "](" + href + title + ")\n";
    },
});
// turndownService.use(gfm);
const processMultiLineLinks = (markdownContent) => {
    let insideLinkContent = false;
    let newMarkdownContent = "";
    let linkOpenCount = 0;
    for (let i = 0; i < markdownContent.length; i++) {
        const char = markdownContent[i];
        if (char == "[") {
            linkOpenCount++;
        }
        else if (char == "]") {
            linkOpenCount = Math.max(0, linkOpenCount - 1);
        }
        insideLinkContent = linkOpenCount > 0;
        if (insideLinkContent && char == "\n") {
            newMarkdownContent += "\\" + "\n";
        }
        else {
            newMarkdownContent += char;
        }
    }
    return newMarkdownContent;
};
const removeSkipToContentLinks = (markdownContent) => {
    // Remove [Skip to Content](#page) and [Skip to content](#skip)
    const newMarkdownContent = markdownContent.replace(/\[Skip to Content\]\(#[^\)]*\)/gi, "");
    return newMarkdownContent;
};
async function parseMarkdown(html) {
    if (!html) {
        return "";
    }
    try {
        let markdownContent = exports.turndownService.turndown(html);
        markdownContent = processMultiLineLinks(markdownContent);
        markdownContent = removeSkipToContentLinks(markdownContent);
        return markdownContent;
    }
    catch (error) {
        console.error("Error converting HTML to Markdown", { error });
        return ""; // Optionally return an empty string or handle the error as needed
    }
}
