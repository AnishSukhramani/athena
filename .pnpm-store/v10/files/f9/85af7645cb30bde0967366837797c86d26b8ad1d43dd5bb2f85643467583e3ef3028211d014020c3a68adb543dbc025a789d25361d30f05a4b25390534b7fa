"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveXPathWithCDP = resolveXPathWithCDP;
const error_1 = require("../error");
async function resolveXPathWithCDP(params) {
    const { xpath, frameIndex = 0, cdpClient, frameContextManager, debug } = params;
    // Use a DOM session without detaching the shared session; this keeps root session intact.
    const session = await cdpClient.acquireSession("dom");
    let targetFrameId;
    if (frameContextManager) {
        const frameInfo = frameContextManager.getFrameByIndex(frameIndex ?? 0);
        targetFrameId = frameInfo?.frameId;
    }
    if (!targetFrameId) {
        throw new error_1.HyperagentError(`Unable to resolve frameId for frameIndex ${frameIndex}`, 404);
    }
    const executionContextId = frameContextManager
        ? await frameContextManager.waitForExecutionContext(targetFrameId)
        : undefined;
    if (!executionContextId && debug) {
        console.warn(`[resolveXPathWithCDP] Missing executionContextId for frame ${frameIndex} (${targetFrameId}), continuing`);
    }
    await session.send("DOM.enable").catch(() => { });
    await session.send("Runtime.enable").catch(() => { });
    const evalResponse = await session.send("Runtime.evaluate", {
        expression: buildXPathEvaluationExpression(xpath),
        contextId: executionContextId,
        includeCommandLineAPI: false,
        returnByValue: false,
        awaitPromise: false,
    });
    const objectId = evalResponse.result.objectId || undefined;
    if (!objectId) {
        throw new error_1.HyperagentError(`Failed to resolve XPath to objectId in frame ${frameIndex}`, 404);
    }
    const describeNode = await session.send("DOM.describeNode", { objectId });
    const backendNodeId = describeNode.node?.backendNodeId;
    if (typeof backendNodeId !== "number") {
        throw new error_1.HyperagentError(`DOM.describeNode did not return backendNodeId for frame ${frameIndex}`, 404);
    }
    return {
        backendNodeId,
        frameId: targetFrameId,
        objectId,
    };
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
