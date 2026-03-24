"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThinkingActionDefinition = exports.ThinkingAction = void 0;
const zod_1 = require("zod");
exports.ThinkingAction = zod_1.z
    .object({
    plan: zod_1.z
        .string()
        .describe("Describe your strategic plan for the next steps, including potential obstacles and how you'll tackle them."),
})
    .required()
    .describe(`Think about a course of action. Think what your current task is, what your next should be, and how you would possibly do that. This step is especially useful if performing a complex task, and/or working on a visually complex page (think nodes > 300).`);
exports.ThinkingActionDefinition = {
    type: "thinking",
    actionParams: exports.ThinkingAction,
    run: async (ctx, action) => {
        const { plan } = action;
        return {
            success: true,
            message: `A simple thought process about your next steps. You planned: ${plan}`,
        };
    },
    pprintAction: function (params) {
        return `Think about: "${params.plan}"`;
    },
};
