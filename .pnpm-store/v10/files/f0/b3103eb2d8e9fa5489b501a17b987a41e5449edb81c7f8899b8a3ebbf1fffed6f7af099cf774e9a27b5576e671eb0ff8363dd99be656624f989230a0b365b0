/**
 * Shared utility for finding elements via natural language instructions
 * Extracted from findElementWithRetry for reusability
 */
import type { Page } from "playwright-core";
import type { HyperAgentLLM } from "../../llm/types";
import type { ExamineDomResult } from "../examine-dom/types";
import type { AccessibilityNode } from "../../context-providers/a11y-dom/types";
import type { A11yDOMState } from "../../context-providers/a11y-dom/types";
export interface FindElementOptions {
    /**
     * Maximum number of retries if element not found
     */
    maxRetries?: number;
    /**
     * Delay between retries in milliseconds
     */
    retryDelayMs?: number;
    /**
     * Enable debug logging
     */
    debug?: boolean;
}
export interface FindElementResult {
    success: boolean;
    element?: ExamineDomResult;
    domState: A11yDOMState;
    elementMap: Map<string, AccessibilityNode>;
    llmResponse?: {
        rawText: string;
        parsed: unknown;
    };
}
/**
 * Find an element via natural language instruction with retry logic
 *
 * This function:
 * 1. Waits for DOM to settle (handled by captureDOMState)
 * 2. Fetches FRESH a11y DOM state
 * 3. Calls examineDom to find the element
 * 4. Retries on failure (with DOM refresh on each attempt)
 *
 * Used by:
 * - findElementWithRetry (aiAction)
 * - actElement action (executeTask agent)
 *
 * @param instruction Natural language instruction (e.g., "click the Login button")
 * @param page Playwright page
 * @param llm LLM instance for examineDom
 * @param options Configuration options
 * @returns Element, DOM state, element map, and LLM response
 * @throws Error if element not found after all retries
 */
export declare function findElementWithInstruction(instruction: string, page: Page, llm: HyperAgentLLM, options?: FindElementOptions): Promise<FindElementResult>;
