"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteActionDefinition = exports.CompleteAction = void 0;
const zod_1 = require("zod");
exports.CompleteAction = zod_1.z
    .object({
    success: zod_1.z
        .boolean()
        .describe("Whether the task was completed successfully."),
    text: zod_1.z
        .string()
        .nullable()
        .describe("The text to complete the task with, make this answer the ultimate goal of the task. Be sure to include all the information requested in the task in explicit detail."),
})
    .describe("Complete the task, this must be the final action in the sequence");
exports.CompleteActionDefinition = {
    type: "complete",
    actionParams: exports.CompleteAction,
    run: async () => {
        return { success: true, message: "Task Complete" };
    },
    completeAction: async (params) => {
        return params.text ?? "No response text found";
    },
    pprintAction: function (params) {
        return `Complete task with ${params.success ? "success" : "failure"}`;
    },
};
