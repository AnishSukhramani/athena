"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageBackActionDefinition = exports.PageBackAction = void 0;
const zod_1 = require("zod");
exports.PageBackAction = zod_1.z
    .object({})
    .describe("Navigate back to the previous page in the browser history");
exports.PageBackActionDefinition = {
    type: "pageBack",
    actionParams: exports.PageBackAction,
    run: async (ctx) => {
        await ctx.page.goBack();
        return { success: true, message: "Navigated back to the previous page" };
    },
    pprintAction: function () {
        return "Navigate back to previous page";
    },
};
