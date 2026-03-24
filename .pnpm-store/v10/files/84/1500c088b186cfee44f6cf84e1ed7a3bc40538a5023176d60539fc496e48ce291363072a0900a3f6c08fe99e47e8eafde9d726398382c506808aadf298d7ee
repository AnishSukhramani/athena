"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollActionDefinition = exports.ScrollAction = void 0;
const zod_1 = require("zod");
exports.ScrollAction = zod_1.z
    .object({
    direction: zod_1.z
        .enum(["up", "down", "left", "right"])
        .describe("The direction to scroll."),
})
    .describe("Scroll in a specific direction in the browser");
exports.ScrollActionDefinition = {
    type: "scroll",
    actionParams: exports.ScrollAction,
    run: async (ctx, action) => {
        const { direction } = action;
        switch (direction) {
            case "up":
                await ctx.page.evaluate(() => window.scrollBy(0, -window.innerHeight));
                break;
            case "down":
                await ctx.page.evaluate(() => window.scrollBy(0, window.innerHeight));
                break;
            case "left":
                await ctx.page.evaluate(() => window.scrollBy(-window.innerWidth, 0));
                break;
            case "right":
                await ctx.page.evaluate(() => window.scrollBy(window.innerWidth, 0));
                break;
        }
        return { success: true, message: `Scrolled ${direction}` };
    },
    pprintAction: function (params) {
        return `Scroll ${params.direction}`;
    },
};
