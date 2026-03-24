/**
 * Screenshot composition utilities
 * Composites overlay images with base screenshots using Jimp
 */
import type { Page } from "playwright-core";
/**
 * Composite an overlay image onto a page screenshot
 *
 * @param page - Playwright page to screenshot
 * @param overlayBase64 - Base64-encoded PNG overlay image
 * @returns Base64-encoded PNG of the composite image
 */
export declare function compositeScreenshot(page: Page, overlayBase64: string): Promise<string>;
/**
 * Composite an overlay image onto an existing screenshot buffer
 *
 * @param screenshotBuffer - Screenshot as Buffer
 * @param overlayBase64 - Base64-encoded PNG overlay image
 * @returns Base64-encoded PNG of the composite image
 */
export declare function compositeScreenshotBuffer(screenshotBuffer: Buffer, overlayBase64: string): Promise<string>;
