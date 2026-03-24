"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAgentTask = void 0;
const fs_1 = __importDefault(require("fs"));
const perf_hooks_1 = require("perf_hooks");
const dom_cache_1 = require("../../context-providers/a11y-dom/dom-cache");
const cdp_1 = require("../../cdp");
const retry_1 = require("../../utils/retry");
const sleep_1 = require("../../utils/sleep");
const waitForSettledDOM_1 = require("../../utils/waitForSettledDOM");
const dom_capture_1 = require("../shared/dom-capture");
const runtime_context_1 = require("../shared/runtime-context");
const types_1 = require("../../types/index");
const types_2 = require("../../types/index");
const error_1 = require("../error");
const builder_1 = require("../messages/builder");
const system_prompt_1 = require("../messages/system-prompt");
const zod_1 = require("zod");
const actions_1 = require("../actions");
const jimp_1 = require("jimp");
const action_cache_1 = require("../shared/action-cache");
// DomChunkAggregator logic moved to shared/dom-capture.ts
const READ_ONLY_ACTIONS = new Set(["wait", "extract", "complete"]);
const writeFrameGraphSnapshot = async (page, dir, debug) => {
    try {
        const cdpClient = await (0, cdp_1.getCDPClient)(page);
        const frameManager = (0, cdp_1.getOrCreateFrameContextManager)(cdpClient);
        frameManager.setDebug(debug);
        const data = frameManager.toJSON();
        fs_1.default.writeFileSync(`${dir}/frames.json`, JSON.stringify(data, null, 2));
    }
    catch (error) {
        if (debug) {
            console.warn("[FrameContext] Failed to write frame graph:", error);
        }
    }
};
const compositeScreenshot = async (page, overlay) => {
    // Use CDP screenshot - faster, doesn't wait for fonts
    const cdpClient = await (0, cdp_1.getCDPClient)(page);
    const client = await cdpClient.acquireSession("screenshot");
    const { data } = await client.send("Page.captureScreenshot", {
        format: "png",
    });
    const [baseImage, overlayImage] = await Promise.all([
        jimp_1.Jimp.read(Buffer.from(data, "base64")),
        jimp_1.Jimp.read(Buffer.from(overlay, "base64")),
    ]);
    // If dimensions don't match (can happen with viewport: null or DPR), scale overlay to match screenshot
    if (overlayImage.bitmap.width !== baseImage.bitmap.width ||
        overlayImage.bitmap.height !== baseImage.bitmap.height) {
        console.log(`[Screenshot] Dimension mismatch - overlay: ${overlayImage.bitmap.width}x${overlayImage.bitmap.height}, screenshot: ${baseImage.bitmap.width}x${baseImage.bitmap.height}, scaling overlay...`);
        overlayImage.resize({
            w: baseImage.bitmap.width,
            h: baseImage.bitmap.height,
        });
    }
    baseImage.composite(overlayImage, 0, 0);
    const buffer = await baseImage.getBuffer("image/png");
    return buffer.toString("base64");
};
const getActionSchema = (actions) => {
    const zodDefs = actions.map((action) => zod_1.z.object({
        type: zod_1.z.literal(action.type),
        params: action.actionParams,
    }));
    if (zodDefs.length === 0) {
        throw new Error("No actions registered for agent");
    }
    if (zodDefs.length === 1) {
        const [single] = zodDefs;
        const schema = zod_1.z.union([single, single]);
        return schema;
    }
    const [first, second, ...rest] = zodDefs;
    const schema = zod_1.z.union([first, second, ...rest]);
    return schema;
};
const getActionHandler = (actions, type) => {
    const foundAction = actions.find((actions) => actions.type === type);
    if (foundAction) {
        return foundAction.run;
    }
    else {
        throw new actions_1.ActionNotFoundError(type);
    }
};
const runAction = async (action, domState, page, ctx) => {
    const actionStart = perf_hooks_1.performance.now();
    const actionCtx = {
        domState,
        page,
        tokenLimit: ctx.tokenLimit,
        llm: ctx.llm,
        debugDir: ctx.debugDir,
        debug: ctx.debug,
        mcpClient: ctx.mcpClient || undefined,
        variables: Object.values(ctx.variables),
        cdpActions: ctx.cdpActions,
        invalidateDomCache: () => (0, dom_cache_1.markDomSnapshotDirty)(page),
    };
    if (ctx.cdpActions) {
        const { cdpClient, frameContextManager } = await (0, runtime_context_1.initializeRuntimeContext)(page, ctx.debug);
        actionCtx.cdp = {
            resolveElement: cdp_1.resolveElement,
            dispatchCDPAction: cdp_1.dispatchCDPAction,
            client: cdpClient,
            preferScriptBoundingBox: !!ctx.debugDir,
            frameContextManager,
            debug: ctx.debug,
        };
    }
    const actionType = action.type;
    const actionHandler = getActionHandler(ctx.actions, action.type);
    if (!actionHandler) {
        return {
            success: false,
            message: `Unknown action type: ${actionType}`,
        };
    }
    try {
        const result = await actionHandler(actionCtx, action.params);
        logPerf(ctx.debug, `[Perf][runAction][${action.type}]`, actionStart);
        return result;
    }
    catch (error) {
        logPerf(ctx.debug, `[Perf][runAction][${action.type}] (error)`, actionStart);
        return {
            success: false,
            message: `Action ${action.type} failed: ${error}`,
        };
    }
};
function logPerf(debug, label, start) {
    if (!debug)
        return;
    const duration = perf_hooks_1.performance.now() - start;
    console.log(`${label} took ${Math.round(duration)}ms`);
}
const runAgentTask = async (ctx, taskState, params) => {
    const taskStart = perf_hooks_1.performance.now();
    const taskId = taskState.id;
    const debugDir = params?.debugDir || `debug/${taskId}`;
    if (ctx.debug) {
        console.log(`Debugging task ${taskId} in ${debugDir}`);
    }
    if (!taskState) {
        throw new error_1.HyperagentError(`Task ${taskId} not found`);
    }
    taskState.status = types_2.TaskStatus.RUNNING;
    if (!ctx.llm) {
        throw new error_1.HyperagentError("LLM not initialized");
    }
    // Use the new structured output interface
    const actionSchema = getActionSchema(ctx.actions);
    // V1 always uses visual mode with full system prompt
    const systemPrompt = system_prompt_1.SYSTEM_PROMPT;
    const baseMsgs = [
        { role: "system", content: systemPrompt },
    ];
    let output = "";
    let page = taskState.startingPage;
    const useDomCache = params?.useDomCache === true;
    const enableDomStreaming = params?.enableDomStreaming === true;
    // Track schema validation errors across steps
    if (!ctx.schemaErrors) {
        ctx.schemaErrors = [];
    }
    const navigationDirtyHandler = () => {
        (0, dom_cache_1.markDomSnapshotDirty)(page);
    };
    const setupDomListeners = (p) => {
        p.on("framenavigated", navigationDirtyHandler);
        p.on("framedetached", navigationDirtyHandler);
        p.on("load", navigationDirtyHandler);
    };
    const cleanupDomListeners = (p) => {
        p.off?.("framenavigated", navigationDirtyHandler);
        p.off?.("framedetached", navigationDirtyHandler);
        p.off?.("load", navigationDirtyHandler);
    };
    setupDomListeners(page);
    let currStep = 0;
    let consecutiveFailuresOrWaits = 0;
    const MAX_CONSECUTIVE_FAILURES_OR_WAITS = 5;
    let lastOverlayKey = null;
    let lastScreenshotBase64;
    const actionCacheSteps = [];
    try {
        // Initialize context at the start of the task
        await (0, runtime_context_1.initializeRuntimeContext)(page, ctx.debug);
        while (true) {
            // Check for page context switch
            if (ctx.activePage) {
                const newPage = await ctx.activePage();
                if (newPage && newPage !== page) {
                    if (ctx.debug) {
                        console.log(`[Agent] Switching active page context to ${newPage.url()}`);
                    }
                    cleanupDomListeners(page);
                    page = newPage;
                    setupDomListeners(page);
                    await (0, runtime_context_1.initializeRuntimeContext)(page, ctx.debug);
                    (0, dom_cache_1.markDomSnapshotDirty)(page);
                }
            }
            // Status Checks
            const status = taskState.status;
            if (status === types_2.TaskStatus.PAUSED) {
                await (0, sleep_1.sleep)(100);
                continue;
            }
            if (types_1.endTaskStatuses.has(status)) {
                break;
            }
            if (params?.maxSteps && currStep >= params.maxSteps) {
                taskState.status = types_2.TaskStatus.CANCELLED;
                break;
            }
            const debugStepDir = `${debugDir}/step-${currStep}`;
            const stepStart = perf_hooks_1.performance.now();
            const stepMetrics = {
                stepIndex: currStep,
            };
            if (ctx.debug) {
                fs_1.default.mkdirSync(debugStepDir, { recursive: true });
            }
            // Get A11y DOM State (visual mode optional, default false for performance)
            let domState = null;
            const domChunks = null;
            try {
                const domFetchStart = perf_hooks_1.performance.now();
                await (0, waitForSettledDOM_1.waitForSettledDOM)(page);
                domState = await (0, dom_capture_1.captureDOMState)(page, {
                    useCache: useDomCache,
                    debug: ctx.debug,
                    enableVisualMode: params?.enableVisualMode ?? false,
                    debugStepDir: ctx.debug ? debugStepDir : undefined,
                    enableStreaming: enableDomStreaming,
                    onFrameChunk: enableDomStreaming
                        ? () => {
                            // captureDOMState handles aggregation
                        }
                        : undefined,
                });
                const domDuration = perf_hooks_1.performance.now() - domFetchStart;
                stepMetrics.domCaptureMs = Math.round(domDuration);
            }
            catch (error) {
                if (ctx.debug) {
                    console.log("Failed to retrieve DOM state after 3 retries. Failing task.", error);
                }
                taskState.status = types_2.TaskStatus.FAILED;
                taskState.error = "Failed to retrieve DOM state";
                break;
            }
            if (!domState) {
                taskState.status = types_2.TaskStatus.FAILED;
                taskState.error = "Failed to retrieve DOM state";
                break;
            }
            // If visual mode enabled, composite screenshot with overlay
            let trimmedScreenshot;
            if (domState.visualOverlay) {
                const overlayKey = domState.visualOverlay;
                if (overlayKey === lastOverlayKey && lastScreenshotBase64) {
                    trimmedScreenshot = lastScreenshotBase64;
                }
                else {
                    trimmedScreenshot = await compositeScreenshot(page, overlayKey);
                    lastOverlayKey = overlayKey;
                    lastScreenshotBase64 = trimmedScreenshot;
                }
            }
            else {
                lastOverlayKey = null;
                lastScreenshotBase64 = undefined;
            }
            // Store Dom State for Debugging
            if (ctx.debug) {
                fs_1.default.mkdirSync(debugDir, { recursive: true });
                fs_1.default.writeFileSync(`${debugStepDir}/elems.txt`, domState.domState);
                if (trimmedScreenshot) {
                    fs_1.default.writeFileSync(`${debugStepDir}/screenshot.png`, Buffer.from(trimmedScreenshot, "base64"));
                }
            }
            if (domChunks) {
                domState.domState = domChunks;
            }
            // Build Agent Step Messages
            let msgs = await (0, builder_1.buildAgentStepMessages)(baseMsgs, taskState.steps, taskState.task, page, domState, trimmedScreenshot, Object.values(ctx.variables));
            // Append accumulated schema errors from previous steps
            if (ctx.schemaErrors && ctx.schemaErrors.length > 0) {
                const errorSummary = ctx.schemaErrors
                    .slice(-3) // Only keep last 3 errors to avoid context bloat
                    .map((err) => `Step ${err.stepIndex}: ${err.error}`)
                    .join("\n");
                msgs = [
                    ...msgs,
                    {
                        role: "user",
                        content: `Note: Previous steps had schema validation errors. Learn from these:\n${errorSummary}\n\nEnsure your response follows the exact schema structure.`,
                    },
                ];
            }
            // Store Agent Step Messages for Debugging
            if (ctx.debug) {
                fs_1.default.writeFileSync(`${debugStepDir}/msgs.json`, JSON.stringify(msgs, null, 2));
            }
            // Invoke LLM with structured output
            const agentOutput = await (async () => {
                const maxAttempts = 3;
                let currentMsgs = msgs;
                for (let attempt = 0; attempt < maxAttempts; attempt++) {
                    const structuredResult = await (0, retry_1.retry)({
                        func: () => (async () => {
                            const llmStart = perf_hooks_1.performance.now();
                            const result = await ctx.llm.invokeStructured({
                                schema: (0, types_1.AgentOutputFn)(actionSchema),
                                options: {
                                    temperature: 0,
                                },
                                actions: ctx.actions,
                            }, currentMsgs);
                            const llmDuration = perf_hooks_1.performance.now() - llmStart;
                            logPerf(ctx.debug, `[Perf][runAgentTask] llm.invokeStructured(step ${currStep})`, llmStart);
                            stepMetrics.llmMs = Math.round(llmDuration);
                            return result;
                        })(),
                        onError: (...args) => {
                            console.error("[LLM][StructuredOutput] Retry error", ...args);
                        },
                    });
                    if (structuredResult.parsed) {
                        return structuredResult.parsed;
                    }
                    const providerId = ctx.llm?.getProviderId?.() ?? "unknown-provider";
                    const modelId = ctx.llm?.getModelId?.() ?? "unknown-model";
                    // Try to get detailed Zod validation error
                    let validationError = "Unknown validation error";
                    if (structuredResult.rawText) {
                        try {
                            const parsed = JSON.parse(structuredResult.rawText);
                            (0, types_1.AgentOutputFn)(actionSchema).parse(parsed);
                        }
                        catch (zodError) {
                            if (zodError instanceof zod_1.z.ZodError) {
                                validationError = JSON.stringify(zodError.issues, null, 2);
                            }
                            else {
                                validationError = String(zodError);
                            }
                        }
                    }
                    console.error(`[LLM][StructuredOutput] Failed to parse response from ${providerId} (${modelId}). Raw response: ${structuredResult.rawText?.trim() || "<empty>"} (attempt ${attempt + 1}/${maxAttempts})`);
                    // Store error for cross-step learning
                    ctx.schemaErrors?.push({
                        stepIndex: currStep,
                        error: validationError,
                        rawResponse: structuredResult.rawText || "",
                    });
                    // Append error feedback for next retry
                    if (attempt < maxAttempts - 1) {
                        currentMsgs = [
                            ...currentMsgs,
                            {
                                role: "assistant",
                                content: structuredResult.rawText || "Failed to generate response",
                            },
                            {
                                role: "user",
                                content: `The previous response failed validation. Zod validation errors:\n\`\`\`json\n${validationError}\n\`\`\`\n\nPlease fix these errors and return valid structured output matching the schema.`,
                            },
                        ];
                    }
                }
                throw new Error("Failed to get structured output from LLM");
            })();
            params?.debugOnAgentOutput?.(agentOutput);
            // Status Checks
            const statusAfterLLM = taskState.status;
            if (statusAfterLLM === types_2.TaskStatus.PAUSED) {
                await (0, sleep_1.sleep)(100);
                continue;
            }
            if (types_1.endTaskStatuses.has(statusAfterLLM)) {
                break;
            }
            // Run single action
            const action = agentOutput.action;
            // Handle complete action specially
            if (action.type === "complete") {
                taskState.status = types_2.TaskStatus.COMPLETED;
                const actionDefinition = ctx.actions.find((actionDefinition) => actionDefinition.type === "complete");
                if (actionDefinition) {
                    output =
                        (await actionDefinition.completeAction?.(action.params)) ??
                            "No complete action found";
                }
                else {
                    output = "No complete action found";
                }
            }
            // Execute the action
            const actionExecStart = perf_hooks_1.performance.now();
            const actionOutput = await runAction(action, domState, page, ctx);
            const actionDuration = perf_hooks_1.performance.now() - actionExecStart;
            logPerf(ctx.debug, `[Perf][runAgentTask] runAction(step ${currStep})`, actionExecStart);
            stepMetrics.actionMs = Math.round(actionDuration);
            stepMetrics.actionType = action.type;
            stepMetrics.actionSuccess = actionOutput.success;
            if (actionOutput.debug &&
                typeof actionOutput.debug === "object" &&
                "timings" in actionOutput.debug &&
                actionOutput.debug.timings &&
                typeof actionOutput.debug.timings === "object") {
                stepMetrics.actionTimings = actionOutput.debug.timings;
            }
            if (!READ_ONLY_ACTIONS.has(action.type)) {
                (0, dom_cache_1.markDomSnapshotDirty)(page);
            }
            const actionCacheEntry = (0, action_cache_1.buildActionCacheEntry)({
                stepIndex: currStep,
                action,
                actionOutput,
                domState,
            });
            actionCacheSteps.push(actionCacheEntry);
            // Check action result and handle retry logic
            if (action.type === "wait") {
                // Wait action - increment counter
                consecutiveFailuresOrWaits++;
                if (consecutiveFailuresOrWaits >= MAX_CONSECUTIVE_FAILURES_OR_WAITS) {
                    taskState.status = types_2.TaskStatus.FAILED;
                    taskState.error = `Agent is stuck: waited or failed ${MAX_CONSECUTIVE_FAILURES_OR_WAITS} consecutive times without making progress.`;
                    const step = {
                        idx: currStep,
                        agentOutput: agentOutput,
                        actionOutput,
                    };
                    taskState.steps.push(step);
                    await params?.onStep?.(step);
                    break;
                }
                if (ctx.debug) {
                    console.log(`[agent] Wait action (${consecutiveFailuresOrWaits}/${MAX_CONSECUTIVE_FAILURES_OR_WAITS}): ${actionOutput.message}`);
                }
            }
            else if (!actionOutput.success) {
                // Action failed - increment counter
                consecutiveFailuresOrWaits++;
                if (consecutiveFailuresOrWaits >= MAX_CONSECUTIVE_FAILURES_OR_WAITS) {
                    taskState.status = types_2.TaskStatus.FAILED;
                    taskState.error = `Agent is stuck: waited or failed ${MAX_CONSECUTIVE_FAILURES_OR_WAITS} consecutive times without making progress. Last error: ${actionOutput.message}`;
                    const step = {
                        idx: currStep,
                        agentOutput: agentOutput,
                        actionOutput,
                    };
                    taskState.steps.push(step);
                    await params?.onStep?.(step);
                    break;
                }
                if (ctx.debug) {
                    console.log(`[agent] Action failed (${consecutiveFailuresOrWaits}/${MAX_CONSECUTIVE_FAILURES_OR_WAITS}): ${actionOutput.message}`);
                }
            }
            else {
                // Success - reset counter
                consecutiveFailuresOrWaits = 0;
            }
            // Wait for DOM to settle after action
            const waitStats = await (0, waitForSettledDOM_1.waitForSettledDOM)(page);
            stepMetrics.waitForSettledMs = Math.round(waitStats.durationMs);
            stepMetrics.waitForSettled = {
                totalMs: Math.round(waitStats.durationMs),
                lifecycleMs: Math.round(waitStats.lifecycleMs),
                networkMs: Math.round(waitStats.networkMs),
                requestsSeen: waitStats.requestsSeen,
                peakInflight: waitStats.peakInflight,
                reason: waitStats.resolvedByTimeout ? "timeout" : "quiet",
                forcedDrops: waitStats.forcedDrops,
            };
            const step = {
                idx: currStep,
                agentOutput,
                actionOutput,
            };
            taskState.steps.push(step);
            await params?.onStep?.(step);
            currStep = currStep + 1;
            const totalDuration = perf_hooks_1.performance.now() - stepStart;
            logPerf(ctx.debug, `[Perf][runAgentTask] step ${currStep - 1} total`, stepStart);
            stepMetrics.totalMs = Math.round(totalDuration);
            if (ctx.debug) {
                await writeFrameGraphSnapshot(page, debugStepDir, ctx.debug);
                fs_1.default.writeFileSync(`${debugStepDir}/stepOutput.json`, JSON.stringify(step, null, 2));
                fs_1.default.writeFileSync(`${debugStepDir}/perf.json`, JSON.stringify(stepMetrics, null, 2));
            }
        }
        logPerf(ctx.debug, `[Perf][runAgentTask] Task ${taskId}`, taskStart);
    }
    finally {
        cleanupDomListeners(page);
    }
    const actionCache = {
        taskId,
        createdAt: new Date().toISOString(),
        status: taskState.status,
        steps: actionCacheSteps,
    };
    if (ctx.debug) {
        fs_1.default.mkdirSync(debugDir, { recursive: true });
        fs_1.default.writeFileSync(`${debugDir}/action-cache.json`, JSON.stringify(actionCache, null, 2));
    }
    const taskOutput = {
        taskId,
        status: taskState.status,
        steps: taskState.steps,
        output,
        actionCache,
    };
    if (ctx.debug) {
        fs_1.default.writeFileSync(`${debugDir}/taskOutput.json`, JSON.stringify(taskOutput, null, 2));
    }
    await params?.onComplete?.(taskOutput);
    return taskOutput;
};
exports.runAgentTask = runAgentTask;
