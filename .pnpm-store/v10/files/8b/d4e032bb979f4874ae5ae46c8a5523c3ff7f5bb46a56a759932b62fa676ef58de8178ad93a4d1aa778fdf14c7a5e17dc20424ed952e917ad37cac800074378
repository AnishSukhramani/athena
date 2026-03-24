import type { Page } from "playwright-core";
import { type A11yDOMState } from "../../context-providers/a11y-dom";
import type { FrameChunkEvent } from "../../context-providers/a11y-dom/types";
export interface CaptureDOMOptions {
    useCache?: boolean;
    debug?: boolean;
    enableVisualMode?: boolean;
    debugStepDir?: string;
    enableStreaming?: boolean;
    onFrameChunk?: (chunk: FrameChunkEvent) => void;
    maxRetries?: number;
}
/**
 * Capture DOM state with retry logic for stability
 * Handles navigation races, execution context destruction, and placeholder snapshots
 */
export declare function captureDOMState(page: Page, options?: CaptureDOMOptions): Promise<A11yDOMState>;
