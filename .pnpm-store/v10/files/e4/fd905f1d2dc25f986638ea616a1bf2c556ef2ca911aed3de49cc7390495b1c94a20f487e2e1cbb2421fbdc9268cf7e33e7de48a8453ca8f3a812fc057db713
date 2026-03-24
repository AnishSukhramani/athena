"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActElementActionDefinition = void 0;
const zod_1 = require("zod");
const action_restrictions_1 = require("../shared/action-restrictions");
const perform_action_1 = require("./shared/perform-action");
const methodSchema = zod_1.z
    .enum(action_restrictions_1.AGENT_ELEMENT_ACTIONS)
    .describe("Method to execute (click, fill, type, press, selectOptionFromDropdown, check, uncheck, hover, scrollToElement, scrollToPercentage, nextChunk, prevChunk).");
const ActElementAction = zod_1.z
    .object({
    instruction: zod_1.z
        .string()
        .describe("Short explanation of why this action is needed."),
    elementId: zod_1.z
        .string()
        .min(1)
        .describe('Encoded element identifier from the DOM listing (format "frameIndex-backendNodeId", e.g., "0-5125").'),
    method: methodSchema.describe("CDP/Playwright method to invoke (click, fill, type, press, selectOptionFromDropdown, check, uncheck, hover, scrollToElement, scrollToPercentage, nextChunk, prevChunk)."),
    arguments: zod_1.z
        .array(zod_1.z.string())
        .describe("Arguments for the method (e.g., text to fill, key to press, scroll target). Use an empty array when no arguments are required."),
    confidence: zod_1.z
        .number()
        .describe("LLM-estimated confidence (0-1). Used for debugging/telemetry; execution does not depend on it."),
})
    .describe("Perform a single action on an element by referencing an encoded ID from the DOM listing.");
exports.ActElementActionDefinition = {
    type: "actElement",
    actionParams: ActElementAction,
    run: async function (ctx, action) {
        return (0, perform_action_1.performAction)(ctx, action);
    },
    pprintAction: function (params) {
        return `Act: ${params.instruction}`;
    },
};
