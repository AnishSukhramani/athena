import type { Page } from "playwright-core";
import type { CDPClient } from "../../cdp/types";
import type { FrameContextManager } from "../../cdp/frame-context-manager";
export interface RuntimeContext {
    cdpClient: CDPClient;
    frameContextManager: FrameContextManager;
}
/**
 * Initialize shared runtime context for agent operations
 * Handles CDP client acquisition and frame manager initialization
 */
export declare function initializeRuntimeContext(page: Page, debug?: boolean): Promise<RuntimeContext>;
