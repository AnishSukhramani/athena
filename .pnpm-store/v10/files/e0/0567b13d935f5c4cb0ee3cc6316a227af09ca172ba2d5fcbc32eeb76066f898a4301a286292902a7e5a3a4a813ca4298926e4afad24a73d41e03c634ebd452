"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamineDomResultsSchema = exports.ExamineDomResultSchema = void 0;
const zod_1 = require("zod");
const action_restrictions_1 = require("../shared/action-restrictions");
/**
 * Zod schema for a single element match result
 */
exports.ExamineDomResultSchema = zod_1.z.object({
    elementId: zod_1.z
        .string()
        .describe('The exact elementId from the tree (e.g., "0-1234")'),
    description: zod_1.z
        .string()
        .describe('Human-readable description of the element'),
    confidence: zod_1.z
        .number()
        .min(0)
        .max(1)
        .describe('Confidence score 0-1 indicating match quality'),
    method: zod_1.z
        .enum(action_restrictions_1.AGENT_ELEMENT_ACTIONS)
        .default("click")
        .describe('Suggested Playwright method to use'),
    arguments: zod_1.z
        .array(zod_1.z.string())
        .default([])
        .describe('Suggested arguments for the method (as strings)'),
});
/**
 * Zod schema for examineDom response (array of results)
 */
exports.ExamineDomResultsSchema = zod_1.z.object({
    elements: zod_1.z
        .array(exports.ExamineDomResultSchema)
        .describe('Array of matching elements, sorted by confidence (highest first)'),
});
