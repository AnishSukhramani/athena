"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCompleteActionWithOutputDefinition = void 0;
const zod_1 = require("zod");
const generateCompleteActionWithOutputDefinition = (outputSchema) => {
    const actionParamsSchema = zod_1.z
        .object({
        success: zod_1.z
            .boolean()
            .describe("Whether the task was completed successfully."),
        outputSchema: outputSchema
            .nullable()
            .describe("The output model to return the response in. Given the previous data, try your best to fit the final response into the given schema."),
    })
        .describe("Complete the task. An output schema has been provided to you. Try your best to provide your response so that it fits the output schema provided.");
    return {
        type: "complete",
        actionParams: actionParamsSchema,
        run: async (ctx, actionParams) => {
            if (actionParams.success && actionParams.outputSchema) {
                return {
                    success: true,
                    message: "The action generated an object",
                    extract: actionParams.outputSchema,
                };
            }
            else {
                return {
                    success: false,
                    message: "Could not complete task and/or could not extract response into output schema.",
                };
            }
        },
        completeAction: async (params) => {
            return JSON.stringify(params.outputSchema, null, 2);
        },
    };
};
exports.generateCompleteActionWithOutputDefinition = generateCompleteActionWithOutputDefinition;
