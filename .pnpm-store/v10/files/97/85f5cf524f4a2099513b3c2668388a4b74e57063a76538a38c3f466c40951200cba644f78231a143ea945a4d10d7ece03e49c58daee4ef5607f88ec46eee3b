"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_MAX_STEPS = void 0;
exports.attachCachedActionHelpers = attachCachedActionHelpers;
const cachedRunner = __importStar(require("./run-cached-action"));
const DEFAULT_MAX_STEPS = 3;
exports.DEFAULT_MAX_STEPS = DEFAULT_MAX_STEPS;
function runCachedAction(agent, page, instruction, method, xpath, args, options) {
    const runInstruction = options?.performInstruction && options.performInstruction.length > 0
        ? options.performInstruction
        : instruction;
    const cachedAction = {
        actionType: "actElement",
        method,
        arguments: args,
        frameIndex: options?.frameIndex ?? 0,
        xpath,
    };
    return cachedRunner.runCachedStep({
        page,
        instruction: runInstruction,
        cachedAction,
        maxSteps: options?.maxSteps ?? DEFAULT_MAX_STEPS,
        debug: agent.debug,
        tokenLimit: agent.tokenLimit,
        llm: agent.llm,
        mcpClient: agent.mcpClient,
        variables: agent.variables ?? [],
        preferScriptBoundingBox: agent.debug,
        cdpActionsEnabled: agent.cdpActionsEnabled,
        performFallback: options?.performInstruction
            ? (instr) => page.perform(instr)
            : undefined,
    });
}
function attachCachedActionHelpers(agent, page) {
    page.performClick = (xpath, options) => runCachedAction(agent, page, options?.performInstruction || "Click element", "click", xpath, [], options);
    page.performHover = (xpath, options) => runCachedAction(agent, page, options?.performInstruction || "Hover element", "hover", xpath, [], options);
    page.performType = (xpath, text, options) => runCachedAction(agent, page, options?.performInstruction || "Type text", "type", xpath, [text], options);
    page.performFill = (xpath, text, options) => runCachedAction(agent, page, options?.performInstruction || "Fill input", "fill", xpath, [text], options);
    page.performPress = (xpath, key, options) => runCachedAction(agent, page, options?.performInstruction || "Press key", "press", xpath, [key], options);
    page.performSelectOption = (xpath, option, options) => runCachedAction(agent, page, options?.performInstruction || "Select option", "selectOptionFromDropdown", xpath, [option], options);
    page.performCheck = (xpath, options) => runCachedAction(agent, page, options?.performInstruction || "Check element", "check", xpath, [], options);
    page.performUncheck = (xpath, options) => runCachedAction(agent, page, options?.performInstruction || "Uncheck element", "uncheck", xpath, [], options);
    page.performScrollToElement = (xpath, options) => runCachedAction(agent, page, options?.performInstruction || "Scroll to element", "scrollToElement", xpath, [], options);
    page.performScrollToPercentage = (xpath, position, options) => runCachedAction(agent, page, options?.performInstruction || "Scroll to percentage", "scrollToPercentage", xpath, [position], options);
    page.performNextChunk = (xpath, options) => runCachedAction(agent, page, options?.performInstruction || "Scroll next chunk", "nextChunk", xpath, [], options);
    page.performPrevChunk = (xpath, options) => runCachedAction(agent, page, options?.performInstruction || "Scroll previous chunk", "prevChunk", xpath, [], options);
}
