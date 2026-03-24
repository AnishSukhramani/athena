/**
 * Shared utility for executing Playwright methods on locators
 * Extracted from HyperAgent.executePlaywrightMethod for reusability
 */
import type { Page } from "playwright-core";
/**
 * Execute a Playwright method on a locator
 * Handles all supported action types (click, fill, scroll, etc.)
 *
 * @param method The Playwright method to execute
 * @param args Arguments for the method
 * @param locator The Playwright locator to execute on
 * @param options Configuration options
 * @throws Error if method is unknown
 */
export declare function executePlaywrightMethod(method: string, args: unknown[], locator: ReturnType<Page["locator"]>, options?: {
    clickTimeout?: number;
    debug?: boolean;
}): Promise<void>;
