"use strict";
/**
 * Screenshot composition utilities
 * Composites overlay images with base screenshots using Jimp
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.compositeScreenshot = compositeScreenshot;
exports.compositeScreenshotBuffer = compositeScreenshotBuffer;
const jimp_1 = require("jimp");
/**
 * Composite an overlay image onto a page screenshot
 *
 * @param page - Playwright page to screenshot
 * @param overlayBase64 - Base64-encoded PNG overlay image
 * @returns Base64-encoded PNG of the composite image
 */
async function compositeScreenshot(page, overlayBase64) {
    const screenshot = await page.screenshot({ type: "png" });
    const [baseImage, overlayImage] = await Promise.all([
        jimp_1.Jimp.read(screenshot),
        jimp_1.Jimp.read(Buffer.from(overlayBase64, "base64")),
    ]);
    baseImage.composite(overlayImage, 0, 0);
    const buffer = await baseImage.getBuffer("image/png");
    return buffer.toString("base64");
}
/**
 * Composite an overlay image onto an existing screenshot buffer
 *
 * @param screenshotBuffer - Screenshot as Buffer
 * @param overlayBase64 - Base64-encoded PNG overlay image
 * @returns Base64-encoded PNG of the composite image
 */
async function compositeScreenshotBuffer(screenshotBuffer, overlayBase64) {
    const [baseImage, overlayImage] = await Promise.all([
        jimp_1.Jimp.read(screenshotBuffer),
        jimp_1.Jimp.read(Buffer.from(overlayBase64, "base64")),
    ]);
    baseImage.composite(overlayImage, 0, 0);
    const buffer = await baseImage.getBuffer("image/png");
    return buffer.toString("base64");
}
