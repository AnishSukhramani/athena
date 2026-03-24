"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCDPClientForPage = getCDPClientForPage;
exports.disposeCDPClientForPage = disposeCDPClientForPage;
exports.disposeAllCDPClients = disposeAllCDPClients;
const options_1 = require("../debug/options");
class PlaywrightSessionAdapter {
    constructor(session, release) {
        this.session = session;
        this.release = release;
        this.raw = session;
        this.id = extractSessionId(session);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async send(method, params) {
        const result = this.session.send(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        method, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        params);
        return result;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on(event, handler) {
        this.session.on(event, handler);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    off(event, handler) {
        const off = this.session.off;
        if (off) {
            off.call(this.session, event, handler);
        }
    }
    async detach() {
        try {
            await this.session.detach();
        }
        catch (error) {
            console.warn("[CDP][PlaywrightAdapter] Failed to detach session:", error);
        }
        finally {
            this.release(this);
        }
    }
}
function extractSessionId(session) {
    const candidate = session;
    return candidate._sessionId ?? candidate._guid ?? null;
}
class PlaywrightCDPClient {
    constructor(page) {
        this.page = page;
        this.rootSessionPromise = null;
        this.rootSessionAdapter = null;
        this.trackedSessions = new Set();
        this.sessionPool = new Map();
        this.sessionPoolCleanup = new Map();
    }
    get sessionLogging() {
        const opts = (0, options_1.getDebugOptions)();
        return !!(opts.enabled && opts.cdpSessions);
    }
    get rootSession() {
        if (!this.rootSessionAdapter) {
            throw new Error("CDP root session not initialized yet. Call ensureRootSession() first.");
        }
        return this.rootSessionAdapter;
    }
    async init() {
        if (!this.rootSessionPromise) {
            this.rootSessionPromise = (async () => {
                const session = await this.createSession({
                    type: "page",
                    page: this.page,
                });
                this.rootSessionAdapter = session;
                return session;
            })();
        }
        return this.rootSessionPromise;
    }
    async createSession(descriptor) {
        const target = this.resolveTarget(descriptor);
        const session = await this.page.context().newCDPSession(target);
        const wrapped = new PlaywrightSessionAdapter(session, (adapter) => this.trackedSessions.delete(adapter));
        this.trackedSessions.add(wrapped);
        return wrapped;
    }
    async acquireSession(kind, descriptor) {
        let pooled = this.sessionPool.get(kind);
        if (!pooled) {
            if (this.sessionLogging) {
                console.log(`[CDP][SessionPool] creating ${kind} session`);
            }
            pooled = this.createPooledSession(kind, descriptor);
            this.sessionPool.set(kind, pooled);
        }
        else if (this.sessionLogging) {
            console.log(`[CDP][SessionPool] reusing ${kind} session`);
        }
        try {
            return await pooled;
        }
        catch (error) {
            this.invalidatePooledSession(kind, pooled);
            throw error;
        }
    }
    getPage() {
        return this.page;
    }
    async dispose() {
        this.sessionPoolCleanup.forEach((cleanup) => cleanup());
        this.sessionPoolCleanup.clear();
        this.sessionPool.clear();
        const detachPromises = Array.from(this.trackedSessions).map((session) => session.detach().catch((error) => {
            console.warn("[CDP][PlaywrightAdapter] Failed to detach cached session:", error);
        }));
        await Promise.all(detachPromises);
        this.trackedSessions.clear();
    }
    async createPooledSession(kind, descriptor) {
        const session = await this.createSession(descriptor ?? { type: "page", page: this.page });
        const cleanup = () => {
            session.off?.("Detached", onDetached);
            this.sessionPoolCleanup.delete(kind);
            this.sessionPool.delete(kind);
        };
        const onDetached = () => {
            if (this.sessionLogging) {
                console.warn(`[CDP][SessionPool] ${kind} session detached`);
            }
            cleanup();
        };
        session.on?.("Detached", onDetached);
        this.sessionPoolCleanup.set(kind, cleanup);
        await this.initializeSessionForKind(kind, session);
        return session;
    }
    async initializeSessionForKind(kind, session) {
        switch (kind) {
            case "lifecycle":
                await session.send("Network.enable").catch(() => { });
                await session.send("Page.enable").catch(() => { });
                break;
            default:
                break;
        }
    }
    invalidatePooledSession(kind, target) {
        const existing = this.sessionPool.get(kind);
        if (target && existing && existing !== target) {
            return;
        }
        const cleanup = this.sessionPoolCleanup.get(kind);
        cleanup?.();
        this.sessionPoolCleanup.delete(kind);
        this.sessionPool.delete(kind);
    }
    resolveTarget(descriptor) {
        if (!descriptor) {
            return this.page;
        }
        if (descriptor.type === "frame" && descriptor.frame) {
            return descriptor.frame;
        }
        if (descriptor.type === "page" && descriptor.page) {
            return descriptor.page;
        }
        return this.page;
    }
}
const clientCache = new Map();
const pendingClients = new Map();
async function getCDPClientForPage(page) {
    const existing = clientCache.get(page);
    if (existing) {
        return existing;
    }
    const pending = pendingClients.get(page);
    if (pending) {
        return pending;
    }
    const initPromise = (async () => {
        const client = new PlaywrightCDPClient(page);
        await client.init();
        clientCache.set(page, client);
        pendingClients.delete(page);
        page.once("close", () => {
            disposeCDPClientForPage(page).catch(() => { });
        });
        return client;
    })();
    pendingClients.set(page, initPromise);
    return initPromise;
}
async function disposeCDPClientForPage(page) {
    const client = clientCache.get(page);
    clientCache.delete(page);
    pendingClients.delete(page);
    if (!client)
        return;
    await client.dispose().catch((error) => {
        console.warn("[CDP][PlaywrightAdapter] Failed to dispose client for page:", error);
    });
}
async function disposeAllCDPClients() {
    const disposals = Array.from(clientCache.entries()).map(async ([page, client]) => {
        clientCache.delete(page);
        pendingClients.delete(page);
        await client.dispose().catch((error) => {
            console.warn("[CDP][PlaywrightAdapter] Failed to dispose cached client:", error);
        });
    });
    await Promise.all(disposals);
    pendingClients.clear();
}
