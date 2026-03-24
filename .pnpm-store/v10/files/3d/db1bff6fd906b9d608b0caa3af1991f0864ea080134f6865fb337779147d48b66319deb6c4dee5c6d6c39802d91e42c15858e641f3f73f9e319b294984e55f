"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureScriptInjected = ensureScriptInjected;
const injectedScripts = new WeakMap();
const GLOBAL_CONTEXT_TOKEN = "__global__";
function getState(session) {
    let state = injectedScripts.get(session);
    if (!state) {
        state = {
            registered: new Set(),
            contexts: new Map(),
        };
        injectedScripts.set(session, state);
    }
    return state;
}
function contextToken(executionContextId) {
    return executionContextId === undefined
        ? GLOBAL_CONTEXT_TOKEN
        : `ctx:${executionContextId}`;
}
async function ensureRuntimeEnabled(session) {
    try {
        await session.send("Runtime.enable");
    }
    catch {
        // best effort
    }
}
async function ensureScriptInjected(session, key, source, executionContextId) {
    const state = getState(session);
    if (!state.registered.has(key)) {
        try {
            await session.send("Page.addScriptToEvaluateOnNewDocument", { source });
            state.registered.add(key);
        }
        catch (error) {
            console.warn(`[CDP][ScriptInjector] Failed to register script ${key}:`, error);
        }
    }
    await ensureRuntimeEnabled(session);
    let contextsForKey = state.contexts.get(key);
    if (!contextsForKey) {
        contextsForKey = new Set();
        state.contexts.set(key, contextsForKey);
    }
    const token = contextToken(executionContextId);
    if (contextsForKey.has(token)) {
        return;
    }
    try {
        await session.send("Runtime.evaluate", {
            expression: source,
            includeCommandLineAPI: false,
            ...(executionContextId !== undefined
                ? { contextId: executionContextId }
                : {}),
        });
        contextsForKey.add(token);
    }
    catch (error) {
        console.warn(`[CDP][ScriptInjector] Failed to evaluate script ${key} in context ${token}:`, error);
    }
}
