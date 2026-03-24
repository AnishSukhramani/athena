"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshPageActionDefinition = exports.RefreshPageAction = void 0;
const zod_1 = require("zod");
exports.RefreshPageAction = zod_1.z
    .object({})
    .describe("Refresh a webpage. Refreshing a webpage is usually a good way if you need to reset the state on a page. Take care since every thing you did on that page will be reset.");
exports.RefreshPageActionDefinition = {
    type: "refreshPage",
    actionParams: exports.RefreshPageAction,
    run: async (ctx) => {
        await ctx.page.reload();
        return { success: true, message: "Succesfully refreshed a page." };
    },
    pprintAction: function () {
        return "Refresh current page";
    },
};
