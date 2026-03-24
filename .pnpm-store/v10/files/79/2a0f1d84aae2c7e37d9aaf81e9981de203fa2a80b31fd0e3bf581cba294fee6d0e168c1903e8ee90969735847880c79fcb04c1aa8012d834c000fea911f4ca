"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performAction = performAction;
const perf_hooks_1 = require("perf_hooks");
const types_1 = require("../../../context-providers/a11y-dom/types");
const element_locator_1 = require("../../shared/element-locator");
const execute_playwright_method_1 = require("../../shared/execute-playwright-method");
/**
 * Performs a single action on an element
 * Consolidates logic for choosing between CDP and Playwright execution paths
 */
async function performAction(ctx, params) {
    const { instruction, elementId, method, arguments: methodArgs = [], confidence, } = params;
    if (!(0, types_1.isEncodedId)(elementId)) {
        return {
            success: false,
            message: `Failed to execute "${instruction}": elementId "${elementId}" is not in encoded format (frameIndex-backendNodeId).`,
        };
    }
    const encodedId = elementId;
    const elementMetadata = ctx.domState.elements.get(encodedId);
    if (!elementMetadata) {
        return {
            success: false,
            message: `Failed to execute "${instruction}": elementId "${elementId}" not present in current DOM.`,
        };
    }
    const timings = ctx.debug ? {} : undefined;
    const debugInfo = ctx.debug && elementMetadata
        ? {
            requestedAction: {
                elementId,
                method,
                arguments: methodArgs,
                confidence,
                instruction,
            },
            elementMetadata,
            ...(timings ? { timings } : {}),
        }
        : undefined;
    const shouldUseCDP = !!ctx.cdp && ctx.cdpActions !== false && !!ctx.domState.backendNodeMap;
    if (shouldUseCDP) {
        const resolvedElementsCache = new Map();
        try {
            const resolveStart = perf_hooks_1.performance.now();
            const resolved = await ctx.cdp.resolveElement(encodedId, {
                page: ctx.page,
                cdpClient: ctx.cdp.client,
                backendNodeMap: ctx.domState.backendNodeMap,
                xpathMap: ctx.domState.xpathMap,
                frameMap: ctx.domState.frameMap,
                resolvedElementsCache,
                frameContextManager: ctx.cdp.frameContextManager,
                debug: ctx.debug,
                strictFrameValidation: true,
            });
            if (timings) {
                timings.resolveElementMs = Math.round(perf_hooks_1.performance.now() - resolveStart);
            }
            const dispatchStart = perf_hooks_1.performance.now();
            await ctx.cdp.dispatchCDPAction(method, methodArgs, {
                element: {
                    ...resolved,
                    xpath: ctx.domState.xpathMap?.[encodedId],
                },
                boundingBox: ctx.domState.boundingBoxMap?.get(encodedId) ?? undefined,
                preferScriptBoundingBox: ctx.cdp.preferScriptBoundingBox,
                debug: ctx.cdp?.debug ?? ctx.debug,
            });
            if (timings) {
                timings.dispatchMs = Math.round(perf_hooks_1.performance.now() - dispatchStart);
            }
            return {
                success: true,
                message: `Successfully executed: ${instruction}`,
                debug: debugInfo,
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return {
                success: false,
                message: `Failed to execute "${instruction}": ${errorMessage}`,
                debug: debugInfo,
            };
        }
    }
    try {
        // Get Playwright locator using shared utility
        const locatorStart = perf_hooks_1.performance.now();
        const { locator } = await (0, element_locator_1.getElementLocator)(elementId, ctx.domState.xpathMap, ctx.page, ctx.domState.frameMap, !!ctx.debugDir);
        if (timings) {
            timings.locatorMs = Math.round(perf_hooks_1.performance.now() - locatorStart);
        }
        // Execute Playwright method using shared utility
        const pwStart = perf_hooks_1.performance.now();
        await (0, execute_playwright_method_1.executePlaywrightMethod)(method, methodArgs, locator, {
            clickTimeout: 3500,
            debug: !!ctx.debugDir,
        });
        if (timings) {
            timings.playwrightActionMs = Math.round(perf_hooks_1.performance.now() - pwStart);
        }
        return {
            success: true,
            message: `Successfully executed: ${instruction}`,
            debug: debugInfo,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
            success: false,
            message: `Failed to execute "${instruction}": ${errorMessage}`,
            debug: debugInfo,
        };
    }
}
