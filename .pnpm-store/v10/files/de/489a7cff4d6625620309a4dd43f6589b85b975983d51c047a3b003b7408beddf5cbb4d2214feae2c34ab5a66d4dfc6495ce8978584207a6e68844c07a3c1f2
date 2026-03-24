/**
 * Wait for DOM to settle by monitoring network activity
 *
 * Definition of "settled":
 * - No in-flight network requests (except WebSocket / Server-Sent-Events)
 * - That idle state lasts for at least 500ms (the "quiet-window")
 *
 * How it works:
 * 1. Subscribe to CDP Network and Page events
 * 2. Track in-flight requests with metadata (URL, start time)
 * 3. Stalled request sweep: Force-complete requests stuck for >2 seconds
 * 4. Handle Document requests and frameStoppedLoading events
 * 5. When no requests for 500ms, consider DOM settled
 * 6. Global timeout ensures we don't wait forever
 */
import type { Page } from "playwright-core";
export interface LifecycleOptions {
    waitUntil?: Array<"domcontentloaded" | "load" | "networkidle">;
    timeoutMs?: number;
}
export interface WaitForSettledStats {
    durationMs: number;
    lifecycleMs: number;
    networkMs: number;
    requestsSeen: number;
    peakInflight: number;
    resolvedByTimeout: boolean;
    forcedDrops: number;
}
export declare function waitForSettledDOM(page: Page, timeoutMs?: number): Promise<WaitForSettledStats>;
