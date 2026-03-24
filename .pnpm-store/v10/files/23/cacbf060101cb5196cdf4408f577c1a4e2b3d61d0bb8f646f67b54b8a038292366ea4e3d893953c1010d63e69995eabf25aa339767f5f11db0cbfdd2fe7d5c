/**
 * Accessibility Tree DOM Provider
 * Main entry point for extracting and formatting accessibility trees
 */
import type { Page } from "playwright-core";
import { A11yDOMState, FrameChunkEvent } from "./types";
/**
 * Get accessibility tree state from a page
 *
 * This function extracts accessibility trees from the main frame and all iframes:
 * 1. Detects all frames in the page
 * 2. For same-origin iframes: uses main CDP session with frameId parameter
 * 3. Merges all accessibility trees into a single state
 * 4. (Optional) Collects bounding boxes and renders visual overlay
 *
 * Note: Chrome's Accessibility API automatically includes same-origin iframe
 * content in the main frame's tree, so we primarily focus on the main frame.
 *
 * @param page - Playwright page
 * @param debug - Whether to collect debug information (frameDebugInfo)
 * @param enableVisualMode - Whether to collect bounding boxes and generate visual overlay
 * @returns A11yDOMState with elements map, text tree, and optional visual overlay
 */
interface GetA11yDomOptions {
    useCache?: boolean;
    enableStreaming?: boolean;
    onFrameChunk?: (chunk: FrameChunkEvent) => void;
}
export declare function getA11yDOM(page: Page, debug?: boolean, enableVisualMode?: boolean, debugDir?: string, options?: GetA11yDomOptions): Promise<A11yDOMState>;
/**
 * Export all types and utilities
 */
export * from "./types";
export * from "./utils";
export * from "./build-maps";
export * from "./build-tree";
export * from "./scrollable-detection";
