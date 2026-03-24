/**
 * ExamineDom - Find elements in accessibility tree based on natural language
 *
 * Takes a natural language instruction (e.g., "click the login button") and returns
 * matching elements from the accessibility tree with confidence scores.
 */
import { HyperAgentLLM } from "../../llm/types";
import { ExamineDomContext } from "./types";
import { ExamineDomResultsType } from "./schema";
/**
 * Find elements in the accessibility tree that match the given instruction
 *
 * @param instruction - Natural language instruction (e.g., "click the login button")
 * @param context - Current page context with accessibility tree
 * @param llm - LLM client for making inference calls
 * @returns Object with matching elements and LLM response
 *
 * @example
 * ```typescript
 * const { elements, llmResponse } = await examineDom(
 *   "click the login button",
 *   {
 *     tree: "[0-1234] button: Login\n[0-5678] button: Sign Up",
 *     xpathMap: { "0-1234": "/html/body/button[1]" },
 *     elements: new Map(),
 *     url: "https://example.com"
 *   },
 *   llmClient
 * );
 *
 * // Returns: { elements: [...], llmResponse: { rawText: "...", parsed: {...} } }
 * ```
 */
export declare function examineDom(instruction: string, context: ExamineDomContext, llm: HyperAgentLLM): Promise<{
    elements: ExamineDomResultsType["elements"];
    llmResponse: {
        rawText: string;
        parsed: unknown;
    };
}>;
/**
 * Extract text value from instruction for fill actions
 *
 * Extracts the value to be filled from instructions like:
 * - "fill email with test@example.com" → "test@example.com"
 * - "type hello into search box" → "hello"
 * - "enter password123 in password field" → "password123"
 *
 * @param instruction - The natural language instruction
 * @returns The extracted value or empty string if no value found
 */
export declare function extractValueFromInstruction(instruction: string): string;
