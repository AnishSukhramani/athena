"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRuntimeContext = initializeRuntimeContext;
const cdp_1 = require("../../cdp");
/**
 * Initialize shared runtime context for agent operations
 * Handles CDP client acquisition and frame manager initialization
 */
async function initializeRuntimeContext(page, debug = false) {
    try {
        const cdpClient = await (0, cdp_1.getCDPClient)(page);
        const frameContextManager = (0, cdp_1.getOrCreateFrameContextManager)(cdpClient);
        frameContextManager.setDebug(debug);
        await frameContextManager.ensureInitialized();
        return {
            cdpClient,
            frameContextManager
        };
    }
    catch (error) {
        if (debug) {
            console.warn("[FrameContext] Failed to initialize frame context manager:", error);
        }
        // Re-throw or handle as needed - consistent with previous ensureFrameContextsReady behavior
        // but now we probably want the caller to know initialization failed if it's critical
        throw error;
    }
}
