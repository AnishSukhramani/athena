"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureDOMState = captureDOMState;
const perf_hooks_1 = require("perf_hooks");
const a11y_dom_1 = require("../../context-providers/a11y-dom");
const waitForSettledDOM_1 = require("../../utils/waitForSettledDOM");
const DOM_CAPTURE_MAX_ATTEMPTS = 3;
const NAVIGATION_ERROR_SNIPPETS = [
    "Execution context was destroyed",
    "Cannot find context",
    "Target closed",
];
class DomChunkAggregator {
    constructor() {
        this.parts = [];
        this.pending = new Map();
        this.nextOrder = 0;
    }
    push(chunk) {
        this.pending.set(chunk.order, chunk);
        this.flush();
    }
    flush() {
        while (true) {
            const chunk = this.pending.get(this.nextOrder);
            if (!chunk)
                break;
            this.pending.delete(this.nextOrder);
            this.parts.push(chunk.simplified.trim());
            this.nextOrder += 1;
        }
    }
    hasContent() {
        return this.parts.length > 0;
    }
    toString() {
        return this.parts.join("\n\n");
    }
}
const isRecoverableDomError = (error) => {
    if (!(error instanceof Error) || !error.message) {
        return false;
    }
    return NAVIGATION_ERROR_SNIPPETS.some((snippet) => error.message.includes(snippet));
};
const isPlaceholderSnapshot = (snapshot) => {
    if (snapshot.elements.size > 0)
        return false;
    return (typeof snapshot.domState === "string" &&
        snapshot.domState.startsWith("Error: Could not extract accessibility tree"));
};
function logPerf(debug, label, start) {
    if (!debug)
        return;
    const duration = perf_hooks_1.performance.now() - start;
    console.log(`${label} took ${Math.round(duration)}ms`);
}
/**
 * Capture DOM state with retry logic for stability
 * Handles navigation races, execution context destruction, and placeholder snapshots
 */
async function captureDOMState(page, options = {}) {
    const { useCache = false, debug = false, enableVisualMode = false, debugStepDir, enableStreaming = false, onFrameChunk, maxRetries = DOM_CAPTURE_MAX_ATTEMPTS, } = options;
    let lastError;
    const domFetchStart = perf_hooks_1.performance.now();
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        const attemptAggregator = enableStreaming
            ? new DomChunkAggregator()
            : null;
        try {
            const snapshot = await (0, a11y_dom_1.getA11yDOM)(page, debug, enableVisualMode, debugStepDir, {
                useCache,
                enableStreaming,
                onFrameChunk: attemptAggregator
                    ? (chunk) => {
                        attemptAggregator.push(chunk);
                        onFrameChunk?.(chunk);
                    }
                    : undefined,
            });
            if (!snapshot) {
                throw new Error("Failed to capture DOM state");
            }
            if (isPlaceholderSnapshot(snapshot)) {
                lastError = new Error(snapshot.domState);
            }
            else {
                const domDuration = perf_hooks_1.performance.now() - domFetchStart;
                logPerf(debug, `[Perf][captureDOMState] success (attempt ${attempt + 1})`, domFetchStart);
                // If we were streaming, update the full string in the snapshot
                if (attemptAggregator?.hasContent()) {
                    snapshot.domState = attemptAggregator.toString();
                }
                return snapshot;
            }
        }
        catch (error) {
            if (!isRecoverableDomError(error)) {
                throw error;
            }
            lastError = error;
        }
        if (debug) {
            console.warn(`[DOM] Capture failed (attempt ${attempt + 1}/${maxRetries}), waiting for navigation to settle...`);
        }
        // Wait for DOM to settle before next retry
        await (0, waitForSettledDOM_1.waitForSettledDOM)(page).catch(() => { });
    }
    throw lastError ?? new Error(`Failed to capture DOM state after ${maxRetries} attempts`);
}
