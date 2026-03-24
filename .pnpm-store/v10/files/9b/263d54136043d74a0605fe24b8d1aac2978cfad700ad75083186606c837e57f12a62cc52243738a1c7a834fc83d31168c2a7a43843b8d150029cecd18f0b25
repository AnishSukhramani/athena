"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCachedStep = runCachedStep;
exports.performGoTo = performGoTo;
const uuid_1 = require("uuid");
const perform_action_1 = require("../../agent/actions/shared/perform-action");
const dom_capture_1 = require("../../agent/shared/dom-capture");
const waitForSettledDOM_1 = require("../../utils/waitForSettledDOM");
const dom_cache_1 = require("../../context-providers/a11y-dom/dom-cache");
const runtime_context_1 = require("../../agent/shared/runtime-context");
const xpath_cdp_resolver_1 = require("../../agent/shared/xpath-cdp-resolver");
const cdp_1 = require("../../cdp");
const types_1 = require("../../types/agent/types");
async function runCachedStep(params) {
    const { page, instruction, cachedAction, maxSteps = 3, debug, tokenLimit, llm, mcpClient, variables, preferScriptBoundingBox, cdpActionsEnabled, } = params;
    const taskId = (0, uuid_1.v4)();
    if (cachedAction.actionType === "goToUrl") {
        const url = (cachedAction.arguments && cachedAction.arguments[0]) ||
            cachedAction.actionParams?.url ||
            "";
        if (!url || typeof url !== "string") {
            return {
                taskId,
                status: types_1.TaskStatus.FAILED,
                steps: [],
                output: "Missing URL for goToUrl",
            };
        }
        await page.goto(url, { waitUntil: "domcontentloaded" });
        await (0, waitForSettledDOM_1.waitForSettledDOM)(page);
        (0, dom_cache_1.markDomSnapshotDirty)(page);
        return {
            taskId,
            status: types_1.TaskStatus.COMPLETED,
            steps: [],
            output: `Navigated to ${url}`,
            replayStepMeta: {
                usedCachedAction: true,
                fallbackUsed: false,
                retries: 1,
                cachedXPath: null,
                fallbackXPath: null,
                fallbackElementId: null,
            },
        };
    }
    if (cachedAction.actionType === "complete") {
        return {
            taskId,
            status: types_1.TaskStatus.COMPLETED,
            steps: [],
            output: "Task Complete",
            replayStepMeta: {
                usedCachedAction: true,
                fallbackUsed: false,
                retries: 1,
                cachedXPath: null,
                fallbackXPath: null,
                fallbackElementId: null,
            },
        };
    }
    if (cachedAction.actionType !== "actElement" ||
        !cachedAction.xpath ||
        !cachedAction.method) {
        return {
            taskId,
            status: types_1.TaskStatus.FAILED,
            steps: [],
            output: "Unsupported cached action",
        };
    }
    let lastError = null;
    for (let attempt = 0; attempt < maxSteps; attempt++) {
        const attemptIndex = attempt + 1;
        const attemptResult = await runCachedAttempt({
            page,
            instruction,
            cachedAction,
            debug,
            tokenLimit,
            llm,
            mcpClient,
            variables,
            preferScriptBoundingBox,
            cdpActionsEnabled,
        }).catch((err) => {
            lastError = err;
            return null;
        });
        if (!attemptResult) {
            if (attempt < maxSteps - 1) {
                continue;
            }
            // will fall through to fallback/final failure below
        }
        else if (!attemptResult.success) {
            lastError = new Error(attemptResult.message);
            if (attempt < maxSteps - 1) {
                continue;
            }
            // will fall through to fallback/final failure below
        }
        else {
            await (0, waitForSettledDOM_1.waitForSettledDOM)(page);
            (0, dom_cache_1.markDomSnapshotDirty)(page);
            lastError = null;
            return {
                taskId,
                status: types_1.TaskStatus.COMPLETED,
                steps: [],
                output: `Executed cached action: ${instruction}`,
                replayStepMeta: {
                    usedCachedAction: true,
                    fallbackUsed: false,
                    retries: attemptIndex,
                    cachedXPath: cachedAction.xpath ?? null,
                    fallbackXPath: null,
                    fallbackElementId: null,
                },
            };
        }
    }
    // All cached attempts failed; optionally fall back to LLM perform
    if (params.performFallback) {
        const fb = await params.performFallback(instruction);
        const cachedXPath = cachedAction.xpath || "N/A";
        const resolvedXPath = fb.replayStepMeta?.fallbackXPath || "N/A";
        // eslint-disable-next-line no-console
        console.log(`
⚠️ [runCachedStep] Cached action failed. Falling back to LLM...
   Instruction: "${instruction}"
   ❌ Cached XPath Failed: "${cachedXPath}"
   ✅ LLM Resolved New XPath: "${resolvedXPath}"
`);
        return {
            ...fb,
            replayStepMeta: {
                usedCachedAction: true,
                fallbackUsed: true,
                retries: maxSteps,
                cachedXPath: cachedAction.xpath ?? null,
                fallbackXPath: fb.replayStepMeta?.fallbackXPath ?? null,
                fallbackElementId: fb.replayStepMeta?.fallbackElementId ?? null,
            },
        };
    }
    return {
        taskId,
        status: types_1.TaskStatus.FAILED,
        steps: [],
        output: lastError?.message || "Failed to execute cached action",
        replayStepMeta: {
            usedCachedAction: true,
            fallbackUsed: false,
            retries: maxSteps,
            cachedXPath: cachedAction.xpath ?? null,
            fallbackXPath: null,
            fallbackElementId: null,
        },
    };
}
async function runCachedAttempt(args) {
    const { page, instruction, cachedAction, debug, tokenLimit, llm, mcpClient, variables, preferScriptBoundingBox, cdpActionsEnabled, } = args;
    await (0, waitForSettledDOM_1.waitForSettledDOM)(page);
    const domState = await (0, dom_capture_1.captureDOMState)(page, {
        useCache: false,
        debug,
        enableVisualMode: false,
    });
    const { cdpClient, frameContextManager } = await (0, runtime_context_1.initializeRuntimeContext)(page, debug);
    const resolved = await (0, xpath_cdp_resolver_1.resolveXPathWithCDP)({
        xpath: cachedAction.xpath,
        frameIndex: cachedAction.frameIndex ?? 0,
        cdpClient,
        frameContextManager,
        debug,
    });
    const actionContext = {
        domState,
        page,
        tokenLimit,
        llm,
        debug,
        cdpActions: cdpActionsEnabled !== false,
        cdp: {
            client: cdpClient,
            frameContextManager,
            resolveElement: cdp_1.resolveElement,
            dispatchCDPAction: cdp_1.dispatchCDPAction,
            preferScriptBoundingBox: preferScriptBoundingBox ?? debug,
            debug,
        },
        debugDir: undefined,
        mcpClient,
        variables,
        invalidateDomCache: () => (0, dom_cache_1.markDomSnapshotDirty)(page),
    };
    const encodedId = `${cachedAction.frameIndex ?? 0}-${resolved.backendNodeId}`;
    domState.backendNodeMap = {
        ...(domState.backendNodeMap || {}),
        [encodedId]: resolved.backendNodeId,
    };
    domState.xpathMap = {
        ...(domState.xpathMap || {}),
        [encodedId]: cachedAction.xpath,
    };
    const methodArgs = (cachedAction.arguments ?? []).map((v) => v == null ? "" : String(v));
    const actionOutput = await (0, perform_action_1.performAction)(actionContext, {
        elementId: encodedId,
        method: cachedAction.method,
        arguments: methodArgs,
        instruction,
        confidence: 1,
    });
    return { success: actionOutput.success, message: actionOutput.message };
}
async function performGoTo(page, url, waitUntil = "domcontentloaded") {
    await page.goto(url, { waitUntil });
    await (0, waitForSettledDOM_1.waitForSettledDOM)(page);
    (0, dom_cache_1.markDomSnapshotDirty)(page);
}
