"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameContextManager = void 0;
exports.getOrCreateFrameContextManager = getOrCreateFrameContextManager;
const frame_graph_1 = require("./frame-graph");
const frame_filters_1 = require("./frame-filters");
class FrameContextManager {
    constructor(client) {
        this.client = client;
        this.graph = new frame_graph_1.FrameGraph();
        this.sessions = new Map();
        this.frameExecutionContexts = new Map();
        this.executionContextToFrame = new Map();
        this.executionContextWaiters = new Map();
        this.runtimeTrackedSessions = new WeakSet();
        this.sessionListeners = new Map();
        this.oopifFrameIds = new Set();
        this.pageTrackedSessions = new WeakSet();
        this.playwrightOopifCache = new Map();
        this.nextFrameIndex = 0;
        this.initialized = false;
        this.initializingPromise = null;
        this.debugLogs = false;
    }
    setDebug(debug) {
        this.debugLogs = !!debug;
    }
    log(message) {
        if (this.debugLogs) {
            console.log(message);
        }
    }
    removeCachedPlaywrightFrame(frame) {
        const record = this.playwrightOopifCache.get(frame);
        if (!record)
            return;
        if (record.detachHandler) {
            record.session.off?.("Detached", record.detachHandler);
            record.detachHandler = undefined;
        }
        this.playwrightOopifCache.delete(frame);
    }
    get frameGraph() {
        return this.graph;
    }
    upsertFrame(input) {
        return this.graph.upsertFrame({
            ...input,
            lastUpdated: Date.now(),
        });
    }
    removeFrame(frameId) {
        // 1. Clean execution contexts
        const contextId = this.frameExecutionContexts.get(frameId);
        if (contextId !== undefined) {
            this.executionContextToFrame.delete(contextId);
            this.frameExecutionContexts.delete(frameId);
        }
        const waiters = this.executionContextWaiters.get(frameId);
        if (waiters) {
            for (const waiter of waiters) {
                if (waiter.timeoutId)
                    clearTimeout(waiter.timeoutId);
                waiter.resolve(undefined);
            }
            this.executionContextWaiters.delete(frameId);
        }
        // 2. Clean session listeners - only for OOPIF frames with dedicated sessions
        // Same-origin frames share the root session, so we must not remove shared listeners
        const isOOPIF = this.oopifFrameIds.has(frameId);
        if (isOOPIF) {
            const session = this.sessions.get(frameId);
            if (session) {
                const listeners = this.sessionListeners.get(session);
                if (listeners) {
                    for (const { event, handler } of listeners) {
                        session.off?.(event, handler);
                    }
                    this.sessionListeners.delete(session);
                }
            }
        }
        // 3. Clean OOPIF set
        this.oopifFrameIds.delete(frameId);
        // 4. Remove from graph and sessions
        this.graph.removeFrame(frameId);
        this.sessions.delete(frameId);
    }
    assignFrameIndex(frameId, index) {
        this.graph.assignFrameIndex(frameId, index);
        if (index >= this.nextFrameIndex) {
            this.nextFrameIndex = index + 1;
        }
    }
    setFrameSession(frameId, session) {
        this.sessions.set(frameId, session);
        const record = this.graph.getFrame(frameId);
        if (record) {
            this.graph.upsertFrame({
                ...record,
                sessionId: session.id ?? record.sessionId,
                parentFrameId: record.parentFrameId,
            });
        }
        this.trackRuntimeForSession(session);
    }
    getFrameSession(frameId) {
        return this.sessions.get(frameId);
    }
    getFrame(frameId) {
        return this.graph.getFrame(frameId);
    }
    getFrameByBackendNodeId(backendNodeId) {
        return this.graph
            .getAllFrames()
            .find((frame) => frame.backendNodeId === backendNodeId);
    }
    getFrameIdByIndex(index) {
        return this.graph.getFrameIdByIndex(index);
    }
    getFrameByIndex(index) {
        const frameId = this.graph.getFrameIdByIndex(index);
        if (!frameId)
            return undefined;
        return this.graph.getFrame(frameId);
    }
    getFrameIndex(frameId) {
        return this.graph.getFrameIndex(frameId);
    }
    getExecutionContextId(frameId) {
        return this.frameExecutionContexts.get(frameId);
    }
    async waitForExecutionContext(frameId, timeoutMs = 750) {
        const existing = this.frameExecutionContexts.get(frameId);
        if (typeof existing === "number") {
            return existing;
        }
        return await new Promise((resolve) => {
            const waiter = { resolve: (value) => resolve(value) };
            waiter.timeoutId = setTimeout(() => {
                const waiters = this.executionContextWaiters.get(frameId);
                if (waiters) {
                    waiters.delete(waiter);
                    if (waiters.size === 0) {
                        this.executionContextWaiters.delete(frameId);
                    }
                }
                resolve(undefined);
            }, timeoutMs);
            let waiters = this.executionContextWaiters.get(frameId);
            if (!waiters) {
                waiters = new Set();
                this.executionContextWaiters.set(frameId, waiters);
            }
            waiters.add(waiter);
        });
    }
    /**
     * Get all same-origin frames (use main session for these)
     */
    getSameOriginFrames() {
        return this.graph
            .getAllFrames()
            .filter((frame) => !this.oopifFrameIds.has(frame.frameId));
    }
    /**
     * Get all OOPIF frames (each has its own session)
     */
    getOOPIFs() {
        return this.graph
            .getAllFrames()
            .filter((frame) => this.oopifFrameIds.has(frame.frameId));
    }
    /**
     * Check if a frame is an OOPIF
     */
    isOOPIF(frameId) {
        return this.oopifFrameIds.has(frameId);
    }
    toJSON() {
        return { graph: this.graph.toJSON() };
    }
    clear() {
        this.graph.clear();
        this.sessions.clear();
        this.frameExecutionContexts.clear();
        this.executionContextToFrame.clear();
        for (const waiters of this.executionContextWaiters.values()) {
            for (const waiter of waiters) {
                if (waiter.timeoutId)
                    clearTimeout(waiter.timeoutId);
                waiter.resolve(undefined);
            }
        }
        this.executionContextWaiters.clear();
        for (const [session, listeners] of this.sessionListeners.entries()) {
            for (const { event, handler } of listeners) {
                session.off?.(event, handler);
            }
        }
        this.sessionListeners.clear();
        this.oopifFrameIds.clear();
    }
    async ensureInitialized() {
        if (this.initialized)
            return;
        if (this.initializingPromise)
            return this.initializingPromise;
        this.initializingPromise = (async () => {
            const rootSession = this.client.rootSession;
            await this.captureFrameTree(rootSession);
            await this.trackPageEvents(rootSession);
            this.initialized = true;
        })().finally(() => {
            this.initializingPromise = null;
        });
        return this.initializingPromise;
    }
    /**
     * Capture initial frame tree from CDP (both same-origin and OOPIF frames)
     * Assigns preliminary frameIndex values which may be overwritten by DOM traversal order
     * in syncFrameContextManager for same-origin iframes
     */
    async captureFrameTree(session) {
        const { frameTree } = await session.send("Page.getFrameTree");
        if (!frameTree)
            return;
        const traverse = async (node, parentFrameId) => {
            const frameId = node.frame.id;
            const record = this.upsertFrame({
                frameId,
                parentFrameId,
                loaderId: node.frame.loaderId,
                name: node.frame.name,
                url: node.frame.url,
            });
            this.setFrameSession(frameId, session);
            if (record.parentFrameId !== null) {
                await this.populateFrameOwner(session, frameId);
            }
            for (const child of node.childFrames ?? []) {
                await traverse(child, frameId);
            }
        };
        await traverse(frameTree, frameTree.frame?.parentId ?? null);
    }
    /**
     * Get the backendNodeId of the <iframe> element that owns this frame
     * This backendNodeId is crucial for matching same-origin iframes between:
     * - DOM traversal (buildBackendIdMaps) which has backendNodeId but may not have frameId
     * - CDP events (FrameContextManager) which has frameId from Page.frameAttached
     */
    async populateFrameOwner(session, frameId) {
        try {
            const owner = await session.send("DOM.getFrameOwner", { frameId });
            const record = this.graph.getFrame(frameId);
            if (!record)
                return;
            this.graph.upsertFrame({
                ...record,
                backendNodeId: owner.backendNodeId ?? record.backendNodeId,
            });
        }
        catch {
            // Ignore errors when getting frame owner (e.g., for main frame or OOPIF)
        }
    }
    getFrameIdByUrl(url) {
        if (!url || url === "about:blank")
            return null;
        for (const frame of this.graph.getAllFrames()) {
            if (frame.url === url)
                return frame.frameId;
        }
        return null;
    }
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
    async captureOOPIFs(startIndex) {
        const pageUnknown = this.client.getPage?.();
        if (!pageUnknown) {
            this.log("[FrameContext] No page available for OOPIF discovery");
            return;
        }
        // Type cast to Playwright Page - this is safe because we're using PlaywrightCDPClient
        const page = pageUnknown;
        const context = page.context();
        const allFrames = page.frames();
        // Cleanup any previously tracked Playwright frames that are no longer present or detached
        const frameSet = new Set(allFrames);
        for (const tracked of Array.from(this.playwrightOopifCache.keys())) {
            const isDetached = typeof tracked.isDetached === "function" && tracked.isDetached();
            if (!frameSet.has(tracked) || isDetached) {
                this.removeCachedPlaywrightFrame(tracked);
            }
        }
        // Filter frames to process (exclude main frame)
        const framesToCheck = allFrames.filter((frame) => frame !== page.mainFrame());
        if (framesToCheck.length === 0) {
            return;
        }
        // Parallelize OOPIF discovery: try to create CDP session for all frames simultaneously
        const discoveryPromises = framesToCheck.map(async (frame, index) => {
            const cachedRecord = this.playwrightOopifCache.get(frame);
            const parentFrameUnknown = frame.parentFrame();
            const parentFrame = parentFrameUnknown;
            const parentFrameUrl = parentFrame?.url();
            if (cachedRecord) {
                this.log(`[FrameContext] Frame ${frame.url()} already has a cached record, skipping`);
                if (typeof frame.isDetached === "function" && frame.isDetached()) {
                    this.log(`[FrameContext] Frame ${frame.url()} is detached, removing cached record`);
                    const frameId = cachedRecord.frameId;
                    this.removeCachedPlaywrightFrame(frame);
                    if (frameId) {
                        this.removeFrame(frameId);
                    }
                    return null;
                }
                cachedRecord.url = frame.url();
                cachedRecord.name = frame.name() || undefined;
                cachedRecord.parentFrameUrl = parentFrameUrl;
                cachedRecord.playwrightFrame = frame;
                return {
                    ...cachedRecord,
                    discoveryOrder: index,
                    playwrightFrame: frame,
                };
            }
            const frameUrl = frame.url();
            // Filter ad/tracking frames before attempting CDP session creation
            if ((0, frame_filters_1.isAdOrTrackingFrame)({ url: frameUrl, name: frame.name(), parentUrl: parentFrameUrl || undefined })) {
                this.log(`[FrameContext] Skipping ad/tracking frame: ${frameUrl}`);
                return null;
            }
            // Try to create CDP session - if it succeeds, this is an OOPIF
            let oopifSession = null;
            try {
                oopifSession = await context.newCDPSession(frame);
            }
            catch {
                // Failed to create session = same-origin frame (already processed via DOM.getDocument)
                this.log(`[FrameContext] Frame ${frameUrl} is same-origin, skipping`);
                return null;
            }
            // Success! This is an OOPIF - get its CDP frame ID
            try {
                await oopifSession.send("Page.enable");
                const { frameTree } = await oopifSession.send("Page.getFrameTree");
                const frameId = frameTree.frame.id;
                this.log(`[FrameContext] Discovered OOPIF: frameId=${frameId}, url=${frameUrl}`);
                const record = {
                    frameId,
                    session: oopifSession,
                    url: frameUrl,
                    name: frame.name() || undefined,
                    parentFrameUrl,
                    playwrightFrame: frame,
                };
                const detachHandler = () => {
                    this.removeCachedPlaywrightFrame(frame);
                    this.removeFrame(frameId);
                    oopifSession?.off?.("Detached", detachHandler);
                };
                record.detachHandler = detachHandler;
                oopifSession.on?.("Detached", detachHandler);
                this.playwrightOopifCache.set(frame, record);
                return {
                    ...record,
                    discoveryOrder: index, // Preserve original order for deterministic frame indices
                    playwrightFrame: frame,
                };
            }
            catch (_error) {
                this.log(`[FrameContext] Failed to process OOPIF ${frameUrl}: ${_error}`);
                if (oopifSession) {
                    await oopifSession.detach().catch(() => {
                        // ignore detach errors
                    });
                }
                return null;
            }
        });
        // Wait for all OOPIF discovery to complete in parallel
        const discoveredOOPIFs = (await Promise.all(discoveryPromises)).filter((result) => result !== null);
        // Now assign frame indices and register all OOPIFs in deterministic order
        // Sort by discovery order to maintain deterministic frame indices
        discoveredOOPIFs.sort((a, b) => a.discoveryOrder - b.discoveryOrder);
        for (let i = 0; i < discoveredOOPIFs.length; i++) {
            const oopif = discoveredOOPIFs[i];
            const frameIndex = startIndex + i;
            const parentFrameId = oopif.parentFrameUrl
                ? this.getFrameIdByUrl(oopif.parentFrameUrl)
                : null;
            this.setFrameSession(oopif.frameId, oopif.session);
            this.assignFrameIndex(oopif.frameId, frameIndex);
            this.oopifFrameIds.add(oopif.frameId);
            this.upsertFrame({
                frameId: oopif.frameId,
                parentFrameId,
                url: oopif.url,
                name: oopif.name,
            });
        }
    }
    async trackPageEvents(session) {
        if (this.pageTrackedSessions.has(session)) {
            return;
        }
        this.pageTrackedSessions.add(session);
        await session
            .send("Page.enable")
            .catch((error) => console.warn("[FrameContext] Failed to enable Page domain:", error));
        const attachedHandler = (event) => {
            this.handlePageFrameAttached(event).catch((error) => console.warn("[FrameContext] Error handling frameAttached:", error));
        };
        const detachedHandler = (event) => {
            this.handlePageFrameDetached(event);
        };
        const navigatedHandler = (event) => {
            this.handlePageFrameNavigated(event);
        };
        session.on("Page.frameAttached", attachedHandler);
        session.on("Page.frameDetached", detachedHandler);
        session.on("Page.frameNavigated", navigatedHandler);
        const listeners = this.sessionListeners.get(session) ?? [];
        listeners.push({
            event: "Page.frameAttached",
            handler: attachedHandler,
        }, {
            event: "Page.frameDetached",
            handler: detachedHandler,
        }, {
            event: "Page.frameNavigated",
            handler: navigatedHandler,
        });
        this.sessionListeners.set(session, listeners);
    }
    async handlePageFrameAttached(event) {
        const frameId = event.frameId;
        const parentFrameId = event.parentFrameId ?? null;
        if (this.graph.getFrame(frameId)) {
            return;
        }
        this.upsertFrame({
            frameId,
            parentFrameId,
        });
        if (typeof this.graph.getFrameIndex(frameId) === "undefined") {
            const index = this.nextFrameIndex++;
            this.assignFrameIndex(frameId, index);
        }
        const rootSession = this.client.rootSession;
        this.setFrameSession(frameId, rootSession);
        await this.populateFrameOwner(rootSession, frameId);
        this.log(`[FrameContext] Page.frameAttached: frameId=${frameId}, parent=${parentFrameId ?? "root"}`);
    }
    handlePageFrameDetached(event) {
        const frameId = event.frameId;
        if (!this.graph.getFrame(frameId)) {
            return;
        }
        this.removeFrame(frameId);
        this.log(`[FrameContext] Page.frameDetached: frameId=${frameId}`);
    }
    handlePageFrameNavigated(event) {
        const frameId = event.frame.id;
        this.upsertFrame({
            frameId,
            parentFrameId: event.frame.parentId ?? null,
            loaderId: event.frame.loaderId,
            url: event.frame.url,
            name: event.frame.name,
        });
        this.log(`[FrameContext] Page.frameNavigated: frameId=${frameId}, url=${event.frame.url}`);
    }
    trackRuntimeForSession(session) {
        if (this.runtimeTrackedSessions.has(session)) {
            return;
        }
        this.runtimeTrackedSessions.add(session);
        const createdHandler = (event) => {
            const auxData = event.context.auxData;
            const frameId = auxData?.frameId;
            if (!frameId)
                return;
            const contextType = auxData?.type;
            if (contextType && contextType !== "default")
                return;
            this.frameExecutionContexts.set(frameId, event.context.id);
            this.executionContextToFrame.set(event.context.id, frameId);
            const record = this.graph.getFrame(frameId);
            if (record && record.executionContextId !== event.context.id) {
                this.graph.upsertFrame({
                    ...record,
                    executionContextId: event.context.id,
                });
            }
            const waiters = this.executionContextWaiters.get(frameId);
            if (waiters) {
                for (const waiter of waiters) {
                    if (waiter.timeoutId)
                        clearTimeout(waiter.timeoutId);
                    waiter.resolve(event.context.id);
                }
                this.executionContextWaiters.delete(frameId);
            }
        };
        const destroyedHandler = (event) => {
            const frameId = this.executionContextToFrame.get(event.executionContextId);
            if (!frameId) {
                return;
            }
            this.executionContextToFrame.delete(event.executionContextId);
            this.frameExecutionContexts.delete(frameId);
        };
        const clearedHandler = () => {
            for (const [frameId, frameSession] of this.sessions.entries()) {
                if (frameSession !== session)
                    continue;
                const contextId = this.frameExecutionContexts.get(frameId);
                if (typeof contextId === "number") {
                    this.frameExecutionContexts.delete(frameId);
                    this.executionContextToFrame.delete(contextId);
                }
            }
        };
        session.on("Runtime.executionContextCreated", createdHandler);
        session.on("Runtime.executionContextDestroyed", destroyedHandler);
        session.on("Runtime.executionContextsCleared", clearedHandler);
        this.sessionListeners.set(session, [
            {
                event: "Runtime.executionContextCreated",
                handler: createdHandler,
            },
            {
                event: "Runtime.executionContextDestroyed",
                handler: destroyedHandler,
            },
            {
                event: "Runtime.executionContextsCleared",
                handler: clearedHandler,
            },
        ]);
        session.send("Runtime.enable").catch((error) => {
            console.warn("[FrameContextManager] Failed to enable Runtime domain:", error);
        });
    }
}
exports.FrameContextManager = FrameContextManager;
const managerCache = new WeakMap();
function getOrCreateFrameContextManager(client) {
    let manager = managerCache.get(client);
    if (!manager) {
        manager = new FrameContextManager(client);
        managerCache.set(client, manager);
    }
    return manager;
}
