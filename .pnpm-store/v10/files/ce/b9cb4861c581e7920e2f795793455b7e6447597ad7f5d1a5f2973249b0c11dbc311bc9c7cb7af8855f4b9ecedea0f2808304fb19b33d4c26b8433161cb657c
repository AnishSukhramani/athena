"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildActionCacheEntry = void 0;
const types_1 = require("../../context-providers/a11y-dom/types");
const TEXT_NODE_SUFFIX = /\/text\(\)(\[\d+\])?$/iu;
const isString = (value) => typeof value === "string";
const isStringOrNumberArray = (value) => Array.isArray(value) &&
    value.every((item) => typeof item === "string" || typeof item === "number");
const normalizeXPath = (raw) => {
    if (!raw) {
        return null;
    }
    return raw.replace(TEXT_NODE_SUFFIX, "");
};
const extractInstruction = (action) => {
    const params = action.params;
    switch (action.type) {
        case "extract":
            if (isString(params.objective)) {
                return params.objective;
            }
            throw new Error(`Missing objective for extract action`);
        case "actElement":
            if (isString(params.instruction)) {
                return params.instruction;
            }
            throw new Error(`Missing instruction for actElement action`);
        default:
            // Actions like goToUrl, refreshPage, wait, analyzePdf do not require an instruction
            return isString(params.instruction) ? params.instruction : undefined;
    }
};
const extractElementId = (action) => {
    const params = action.params;
    if (isString(params.elementId)) {
        return params.elementId;
    }
    return null;
};
const extractMethod = (action) => {
    const params = action.params;
    if (isString(params.method)) {
        return params.method;
    }
    return null;
};
const extractArguments = (action) => {
    const params = action.params;
    if (isStringOrNumberArray(params.arguments)) {
        return params.arguments.map((item) => item.toString());
    }
    return [];
};
const extractFrameIndex = (elementId) => {
    if (!elementId) {
        return null;
    }
    const encodedId = (0, types_1.asEncodedId)(elementId);
    if (!encodedId) {
        return null;
    }
    const [framePart] = encodedId.split("-");
    const parsed = Number.parseInt(framePart, 10);
    return Number.isNaN(parsed) ? null : parsed;
};
const extractXPathFromDebug = (actionOutput) => {
    const debug = actionOutput.debug;
    if (!debug || typeof debug !== "object") {
        return null;
    }
    const metadata = debug.elementMetadata;
    if (metadata && isString(metadata.xpath)) {
        return metadata.xpath;
    }
    return null;
};
const buildActionCacheEntry = ({ stepIndex, action, actionOutput, domState, }) => {
    const instruction = extractInstruction(action);
    const elementId = extractElementId(action);
    const method = extractMethod(action);
    const args = extractArguments(action);
    const encodedId = elementId ? (0, types_1.asEncodedId)(elementId) : undefined;
    const frameIndex = extractFrameIndex(elementId);
    // Normalize goToUrl to use arguments[0] for URL to simplify replay paths
    let normalizedArgs = args;
    if (action.type === "goToUrl" &&
        (!args || args.length === 0) &&
        action.params &&
        typeof action.params.url === "string") {
        normalizedArgs = [action.params.url];
    }
    const xpathFromDom = encodedId ? domState.xpathMap?.[encodedId] || null : null;
    const xpath = normalizeXPath(xpathFromDom || extractXPathFromDebug(actionOutput));
    return {
        stepIndex,
        instruction,
        elementId,
        method,
        arguments: normalizedArgs,
        actionParams: action.params || undefined,
        frameIndex,
        xpath,
        actionType: action.type,
        success: actionOutput.success,
        message: actionOutput.message,
    };
};
exports.buildActionCacheEntry = buildActionCacheEntry;
