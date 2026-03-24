"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageForwardActionDefinition = exports.PageForwardAction = void 0;
const zod_1 = require("zod");
exports.PageForwardAction = zod_1.z
    .object({})
    .describe("Navigate forward to the next page in the browser history");
exports.PageForwardActionDefinition = {
    type: "pageForward",
    actionParams: exports.PageForwardAction,
    run: async (ctx) => {
        await ctx.page.goForward();
        return { success: true, message: "Navigated forward to the next page" };
    },
    pprintAction: function () {
        return "Navigate forward to next page";
    },
};
