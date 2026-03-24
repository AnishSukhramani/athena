"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitActionDefinition = void 0;
const zod_1 = require("zod");
const waitForSettledDOM_1 = require("../../utils/waitForSettledDOM");
const WaitAction = zod_1.z
    .object({
    reason: zod_1.z
        .string()
        .describe("Explain why you cannot confidently take an action right now (e.g., 'Page is still loading', 'Expected element not visible yet', 'Waiting for dynamic content to appear', 'Page may still be transitioning')"),
})
    .describe("Use this action when you are not confident enough to take a meaningful action. The page may still be loading, elements may not be visible yet, or the page state may be unclear. The system will wait for the DOM to settle and give you a fresh view.");
exports.WaitActionDefinition = {
    type: "wait",
    actionParams: WaitAction,
    run: async function (ctx, action) {
        const { reason } = action;
        // Wait for DOM to settle (page to finish loading/transitioning)
        await (0, waitForSettledDOM_1.waitForSettledDOM)(ctx.page);
        // Additional brief wait to allow any animations/transitions to complete
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
            success: true,
            message: `Waiting for page to stabilize: ${reason}`,
        };
    },
    pprintAction: function (params) {
        return `Wait: ${params.reason}`;
    },
};
