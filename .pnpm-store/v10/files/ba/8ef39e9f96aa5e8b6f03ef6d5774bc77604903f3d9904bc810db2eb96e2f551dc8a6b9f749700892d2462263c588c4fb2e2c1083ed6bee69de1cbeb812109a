"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoToURLActionDefinition = exports.GoToUrlAction = void 0;
const zod_1 = require("zod");
exports.GoToUrlAction = zod_1.z
    .object({
    url: zod_1.z.string().describe("The URL you want to navigate to."),
})
    .describe("Navigate to a specific URL in the browser");
exports.GoToURLActionDefinition = {
    type: "goToUrl",
    actionParams: exports.GoToUrlAction,
    run: async (ctx, action) => {
        const { url } = action;
        await ctx.page.goto(url);
        return { success: true, message: `Navigated to ${url}` };
    },
    pprintAction: function (params) {
        return `Navigate to URL: ${params.url}`;
    },
};
