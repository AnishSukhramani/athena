"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInteractionAction = exports.UserInteractionActionParams = void 0;
const zod_1 = require("zod");
// Define separate schemas for each interaction type to ensure OpenAI strict mode compatibility
const BaseUserInteractionParams = zod_1.z.object({
    message: zod_1.z
        .string()
        .describe("A message to provide to the user. Make it friendly and ask them for a suitable response. Keep it short and between 1-2 sentences if possible."),
});
const TextInputParams = BaseUserInteractionParams.extend({
    kind: zod_1.z.literal("text_input"),
    choices: zod_1.z.array(zod_1.z.string()).length(0).describe("Must be an empty array for text_input kind."),
});
const PasswordParams = BaseUserInteractionParams.extend({
    kind: zod_1.z.literal("password"),
    choices: zod_1.z.array(zod_1.z.string()).length(0).describe("Must be an empty array for password kind."),
});
const ConfirmParams = BaseUserInteractionParams.extend({
    kind: zod_1.z.literal("confirm"),
    choices: zod_1.z.array(zod_1.z.string()).length(0).describe("Must be an empty array for confirm kind."),
});
const SelectParams = BaseUserInteractionParams.extend({
    kind: zod_1.z.literal("select"),
    choices: zod_1.z
        .array(zod_1.z.string())
        .min(1)
        .describe("Array of choices to present to the user. Required for select kind."),
});
// Use a discriminated union for OpenAI strict mode compatibility
exports.UserInteractionActionParams = zod_1.z
    .discriminatedUnion("kind", [
    TextInputParams,
    PasswordParams,
    ConfirmParams,
    SelectParams,
])
    .describe(`Action to request input from the user during task execution.
    Use this when you need to collect information from the user such as text input, password,
    selection from choices, or confirmation. The response will be returned to continue the workflow.`);
const UserInteractionAction = (userInputFn) => {
    return {
        type: "UserInteractionActionParams",
        actionParams: exports.UserInteractionActionParams,
        run: async (ctx, action) => await userInputFn(action),
    };
};
exports.UserInteractionAction = UserInteractionAction;
