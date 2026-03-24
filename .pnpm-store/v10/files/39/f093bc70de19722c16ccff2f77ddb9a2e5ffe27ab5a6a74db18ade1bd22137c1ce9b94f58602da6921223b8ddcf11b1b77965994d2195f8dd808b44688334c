/**
 * Shared utility for getting Playwright locators from encoded element IDs
 * Extracted from HyperAgent for reusability across aiAction and agent actions
 */
import type { Page } from "playwright-core";
import { type IframeInfo } from "../../context-providers/a11y-dom";
/**
 * Get a Playwright locator for an element by its encoded ID
 *
 * Handles both main frame (frameIndex 0) and iframe elements.
 * Iframes are resolved lazily using their XPath path / URL metadata.
 *
 * @param elementId - Element ID (will be converted to EncodedId format)
 * @param xpathMap - Map of encodedId to xpath strings
 * @param page - Playwright page
 * @param frameMap - Optional map of frame indices to IframeInfo
 * @param debug - Enable debug logging
 * @returns Playwright locator and trimmed xpath
 */
export declare function getElementLocator(elementId: string, xpathMap: Record<string, string>, page: Page, frameMap?: Map<number, IframeInfo>, debug?: boolean): Promise<{
    locator: ReturnType<Page["locator"]>;
    xpath: string;
}>;
