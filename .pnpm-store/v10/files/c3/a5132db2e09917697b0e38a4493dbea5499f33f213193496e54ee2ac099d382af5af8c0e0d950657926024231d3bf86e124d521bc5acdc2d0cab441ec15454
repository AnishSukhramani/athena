"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveElement = resolveElement;
const frame_context_manager_1 = require("../cdp/frame-context-manager");
const sessionCache = new WeakMap();
const domEnabledSessions = new WeakSet();
const runtimeEnabledSessions = new WeakSet();
async function resolveElement(encodedId, ctx) {
    const frameIndex = parseFrameIndex(encodedId);
    const frameInfo = frameIndex === 0 ? undefined : ctx.frameMap?.get(frameIndex);
    const frameManager = ctx.frameContextManager ?? (0, frame_context_manager_1.getOrCreateFrameContextManager)(ctx.cdpClient);
    if (frameIndex !== 0 && !frameInfo) {
        throw new Error(`Frame metadata not found for frameIndex ${frameIndex} (encodedId ${encodedId})`);
    }
    const cachedElement = ctx.resolvedElementsCache?.get(encodedId);
    if (cachedElement &&
        ctx.backendNodeMap[encodedId] === cachedElement.backendNodeId) {
        return cachedElement;
    }
    const { session, frameId } = await resolveFrameSession(ctx, { frameIndex, frameInfo }, frameManager, ctx.strictFrameValidation);
    let backendNodeId = ctx.backendNodeMap[encodedId];
    if (backendNodeId === undefined) {
        backendNodeId = await recoverBackendNodeId(encodedId, ctx, session, frameIndex, frameInfo, frameId, frameManager, ctx.strictFrameValidation);
    }
    let resolveResponse;
    try {
        resolveResponse = await resolveNodeByBackendId(session, backendNodeId);
    }
    catch (error) {
        if (!isMissingNodeError(error)) {
            throw error;
        }
        backendNodeId = await recoverBackendNodeId(encodedId, ctx, session, frameIndex, frameInfo, frameId, frameManager, ctx.strictFrameValidation);
        resolveResponse = await resolveNodeByBackendId(session, backendNodeId);
    }
    ctx.backendNodeMap[encodedId] = backendNodeId;
    const resolved = {
        session,
        frameId,
        backendNodeId,
        objectId: resolveResponse.object?.objectId,
    };
    logDebug(ctx, `[ElementResolver] Resolved ${encodedId} via backendNodeId ${backendNodeId} (frameId=${frameId}, session=${session.id ?? "unknown"})`);
    if (!ctx.resolvedElementsCache) {
        ctx.resolvedElementsCache = new Map();
    }
    ctx.resolvedElementsCache.set(encodedId, resolved);
    return resolved;
}
function parseFrameIndex(encodedId) {
    const [frameIndexStr] = encodedId.split("-");
    return Number.parseInt(frameIndexStr || "0", 10) || 0;
}
async function resolveFrameSession(ctx, { frameIndex, frameInfo }, frameManager, strict) {
    const cache = getSessionCache(ctx.cdpClient);
    const frameId = resolveFrameId(frameManager, frameInfo, frameIndex, strict);
    if (cache.has(frameIndex)) {
        const cached = cache.get(frameIndex);
        logDebug(ctx, `[ElementResolver] Using cached session for frameIndex=${frameIndex} (frameId=${frameId})`);
        return { session: cached, frameId };
    }
    const managedSession = frameManager?.getFrameSession(frameId);
    if (managedSession) {
        cache.set(frameIndex, managedSession);
        logDebug(ctx, `[ElementResolver] Reusing manager session ${managedSession.id ?? "root"} for frameIndex=${frameIndex} (frameId=${frameId})`);
        return { session: managedSession, frameId };
    }
    throw new Error(`[CDP][ElementResolver] Session not registered for frameIndex=${frameIndex} (frameId=${frameId})`);
}
async function ensureRootSession(ctx) {
    try {
        const session = ctx.cdpClient.rootSession;
        const cache = getSessionCache(ctx.cdpClient);
        if (!cache.has(0)) {
            cache.set(0, session);
        }
        return session;
    }
    catch {
        const session = await ctx.cdpClient.acquireSession("dom");
        const cache = getSessionCache(ctx.cdpClient);
        cache.set(0, session);
        return session;
    }
}
function getSessionCache(client) {
    let cache = sessionCache.get(client);
    if (!cache) {
        cache = new Map();
        sessionCache.set(client, cache);
    }
    return cache;
}
function resolveFrameId(manager, frameInfo, frameIndex, strict) {
    const managerFrameId = manager?.getFrameIdByIndex(frameIndex);
    if (managerFrameId) {
        return managerFrameId;
    }
    if (strict) {
        throw new Error(`[CDP][ElementResolver] Frame index ${frameIndex} not tracked in FrameContextManager`);
    }
    return getFallbackFrameId(frameInfo, frameIndex);
}
function getFallbackFrameId(frameInfo, frameIndex) {
    if (frameInfo?.frameId) {
        return frameInfo.frameId;
    }
    if (frameInfo?.cdpFrameId) {
        return frameInfo.cdpFrameId;
    }
    return frameIndex === 0 ? "root" : `frame-${frameIndex}`;
}
function logDebug(ctx, message) {
    if (ctx.debug) {
        console.log(message);
    }
}
async function recoverBackendNodeId(encodedId, ctx, session, frameIndex, frameInfo, frameId, frameManager, strict) {
    const xpath = ctx.xpathMap[encodedId];
    if (!xpath) {
        throw new Error(`XPath not found for encodedId ${encodedId}`);
    }
    let executionContextId = (frameManager?.getExecutionContextId(frameId) ??
        frameInfo?.executionContextId) ??
        undefined;
    if (!executionContextId && frameManager) {
        executionContextId = await frameManager
            .waitForExecutionContext(frameId)
            .catch(() => undefined);
    }
    logDebug(ctx, `[ElementResolver] Recovering backendNodeId for ${encodedId} via XPath (frameIndex=${frameIndex}, frameId=${frameId})`);
    // Validate execution context for iframe elements
    if (frameIndex !== 0 && !executionContextId) {
        if (strict) {
            throw new Error(`[CDP][ElementResolver] Execution context missing for frame ${frameIndex} (${frameId})`);
        }
        console.warn(`[CDP][ElementResolver] executionContextId missing for frame ${frameIndex} (${frameId}). ` +
            `XPath evaluation may fail or evaluate in wrong context. ` +
            `This can happen if execution context collection timed out. ` +
            `Consider increasing DEFAULT_CONTEXT_COLLECTION_TIMEOUT_MS in a11y-dom/index.ts`);
    }
    await ensureRuntimeEnabled(session);
    await ensureDomEnabled(session);
    const evalResponse = await session.send("Runtime.evaluate", {
        expression: buildXPathEvaluationExpression(xpath),
        contextId: executionContextId,
        includeCommandLineAPI: false,
        returnByValue: false,
        awaitPromise: false,
    });
    const objectId = evalResponse.result.objectId;
    if (!objectId) {
        throw new Error(`Failed to recover node for ${encodedId} (frame ${frameIndex}) via XPath`);
    }
    try {
        const description = await session.send("DOM.describeNode", { objectId });
        const backendNodeId = description.node?.backendNodeId;
        if (typeof backendNodeId !== "number") {
            throw new Error(`DOM.describeNode did not return backendNodeId for ${encodedId} (frame ${frameIndex})`);
        }
        ctx.backendNodeMap[encodedId] = backendNodeId;
        logDebug(ctx, `[ElementResolver] XPath recovery succeeded for ${encodedId} (backendNodeId=${backendNodeId})`);
        return backendNodeId;
    }
    finally {
        await session
            .send("Runtime.releaseObject", { objectId })
            .catch(() => { });
    }
}
function buildXPathEvaluationExpression(xpath) {
    const escaped = JSON.stringify(xpath);
    return `(function() {
    try {
      const result = document.evaluate(${escaped}, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
      return result.singleNodeValue || null;
    } catch (error) {
      return null;
    }
  })();`;
}
async function ensureDomEnabled(session) {
    if (domEnabledSessions.has(session)) {
        return;
    }
    await session.send("DOM.enable").catch(() => { });
    domEnabledSessions.add(session);
}
async function ensureRuntimeEnabled(session) {
    if (runtimeEnabledSessions.has(session)) {
        return;
    }
    await session.send("Runtime.enable").catch(() => { });
    runtimeEnabledSessions.add(session);
}
async function resolveNodeByBackendId(session, backendNodeId) {
    return await session.send("DOM.resolveNode", { backendNodeId });
}
function isMissingNodeError(error) {
    if (!(error instanceof Error) || !error.message) {
        return false;
    }
    return (error.message.includes("Could not find node with given id") ||
        error.message.includes("No node with given id"));
}
