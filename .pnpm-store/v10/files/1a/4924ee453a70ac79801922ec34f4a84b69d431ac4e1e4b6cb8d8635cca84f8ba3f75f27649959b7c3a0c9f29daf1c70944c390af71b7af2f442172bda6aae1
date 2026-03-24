"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScrollInfo = void 0;
const getScrollInfo = async (page) => {
    // Combine into single evaluate call to reduce IPC overhead
    const { scrollY, viewportHeight, totalHeight } = await page.evaluate(() => ({
        scrollY: window.scrollY,
        viewportHeight: window.innerHeight,
        totalHeight: document.documentElement.scrollHeight,
    }));
    const pixelsAbove = scrollY;
    const pixelsBelow = totalHeight - (scrollY + viewportHeight);
    return [pixelsAbove, pixelsBelow];
};
exports.getScrollInfo = getScrollInfo;
