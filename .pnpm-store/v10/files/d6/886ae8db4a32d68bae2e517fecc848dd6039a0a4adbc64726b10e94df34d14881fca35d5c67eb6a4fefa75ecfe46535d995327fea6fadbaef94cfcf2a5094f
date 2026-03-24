import type { CDPSession, CDPClient } from "./types";
import type { FrameRecord } from "./frame-graph";
import { FrameGraph } from "./frame-graph";
interface UpsertFrameInput extends Partial<Omit<FrameRecord, "frameId" | "parentFrameId" | "lastUpdated">> {
    frameId: string;
    parentFrameId: string | null;
}
export declare class FrameContextManager {
    private readonly client;
    private readonly graph;
    private readonly sessions;
    private readonly frameExecutionContexts;
    private readonly executionContextToFrame;
    private readonly executionContextWaiters;
    private readonly runtimeTrackedSessions;
    private readonly sessionListeners;
    private readonly oopifFrameIds;
    private readonly pageTrackedSessions;
    private readonly playwrightOopifCache;
    private nextFrameIndex;
    private initialized;
    private initializingPromise;
    private debugLogs;
    constructor(client: CDPClient);
    setDebug(debug?: boolean): void;
    private log;
    private removeCachedPlaywrightFrame;
    get frameGraph(): FrameGraph;
    upsertFrame(input: UpsertFrameInput): FrameRecord;
    removeFrame(frameId: string): void;
    assignFrameIndex(frameId: string, index: number): void;
    setFrameSession(frameId: string, session: CDPSession): void;
    getFrameSession(frameId: string): CDPSession | undefined;
    getFrame(frameId: string): FrameRecord | undefined;
    getFrameByBackendNodeId(backendNodeId: number): FrameRecord | undefined;
    getFrameIdByIndex(index: number): string | undefined;
    getFrameByIndex(index: number): FrameRecord | undefined;
    getFrameIndex(frameId: string): number | undefined;
    getExecutionContextId(frameId: string): number | undefined;
    waitForExecutionContext(frameId: string, timeoutMs?: number): Promise<number | undefined>;
    /**
     * Get all same-origin frames (use main session for these)
     */
    getSameOriginFrames(): FrameRecord[];
    /**
     * Get all OOPIF frames (each has its own session)
     */
    getOOPIFs(): FrameRecord[];
    /**
     * Check if a frame is an OOPIF
     */
    isOOPIF(frameId: string): boolean;
    toJSON(): {
        graph: ReturnType<FrameGraph["toJSON"]>;
    };
    clear(): void;
    ensureInitialized(): Promise<void>;
    /**
     * Capture initial frame tree from CDP (both same-origin and OOPIF frames)
     * Assigns preliminary frameIndex values which may be overwritten by DOM traversal order
     * in syncFrameContextManager for same-origin iframes
     */
    private captureFrameTree;
    /**
     * Get the backendNodeId of the <iframe> element that owns this frame
     * This backendNodeId is crucial for matching same-origin iframes between:
     * - DOM traversal (buildBackendIdMaps) which has backendNodeId but may not have frameId
     * - CDP events (FrameContextManager) which has frameId from Page.frameAttached
     */
    private populateFrameOwner;
    private getFrameIdByUrl;
    /**
     * Discover OOPIF (Out-of-Process IFrame) frames
     *
     * OOPIF frames are cross-origin and WON'T appear in DOM.getDocument response
     * (pierce:true doesn't cross origin boundaries for security reasons)
     *
     * They must be discovered via CDP Target/Session events and have their own CDP sessions.
     * OOPIF frames always have frameId since they're separate CDP targets.
     *
     * Discovery strategy: Try to create a CDP session for each frame - if it succeeds, it's an OOPIF
     */
    captureOOPIFs(startIndex: number): Promise<void>;
    private trackPageEvents;
    private handlePageFrameAttached;
    private handlePageFrameDetached;
    private handlePageFrameNavigated;
    private trackRuntimeForSession;
}
export declare function getOrCreateFrameContextManager(client: CDPClient): FrameContextManager;
export {};
