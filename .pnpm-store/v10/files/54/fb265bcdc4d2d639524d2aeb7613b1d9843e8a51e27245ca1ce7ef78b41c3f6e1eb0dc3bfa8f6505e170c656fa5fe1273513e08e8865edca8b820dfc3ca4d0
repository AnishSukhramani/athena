/**
 * Batch bounding box collection utilities
 * Collects bounding boxes for multiple elements in a single browser evaluation
 */
import type { CDPSession } from "../../cdp";
import { EncodedId, DOMRect, IframeInfo } from "./types";
export type BoundingBoxTarget = {
    kind: "cdp";
    session: CDPSession;
    executionContextId?: number;
    frameId: string;
};
/**
 * Browser-side script to collect bounding boxes by backend node IDs
 * Injected once per frame for efficient reuse
 */
export declare const boundingBoxCollectionScript = "\n/**\n * Collect bounding boxes for elements by their backend node IDs\n * Uses CDP's DOM.resolveNode to get elements by backend ID\n *\n * @param backendNodeIds - Array of backend node IDs to collect boxes for\n * @returns Object mapping backend node ID to bounding box\n */\nwindow.__hyperagent_collectBoundingBoxes = function(backendNodeIds) {\n  const results = {};\n\n  for (const backendNodeId of backendNodeIds) {\n    try {\n      // Note: We can't directly access elements by backend node ID in browser context\n      // We need to use XPath as the bridge\n      // This function will be called with XPath already resolved\n      continue;\n    } catch {\n      continue;\n    }\n  }\n\n  return results;\n};\n\n/**\n * Collect bounding boxes using XPath lookup\n * More efficient than individual CDP calls\n *\n * @param xpathToBackendId - Object mapping XPath to backend node ID\n * @returns Object mapping backend node ID to bounding box\n */\nwindow.__hyperagent_collectBoundingBoxesByXPath = function(xpathToBackendId) {\n  const boundingBoxes = {};\n\n  for (const [xpath, backendNodeId] of Object.entries(xpathToBackendId)) {\n    try {\n      const result = document.evaluate(\n        xpath,\n        document.documentElement,\n        null,\n        XPathResult.FIRST_ORDERED_NODE_TYPE,\n        null\n      );\n\n      const element = result.singleNodeValue;\n      if (!element || typeof element.getBoundingClientRect !== 'function') {\n        continue;\n      }\n\n      const rect = element.getBoundingClientRect();\n\n      // Only include elements that have some size\n      if (rect.width === 0 && rect.height === 0) {\n        continue;\n      }\n\n      // For viewport checks: In iframe contexts, window.innerWidth/innerHeight\n      // refers to the iframe's viewport, but getBoundingClientRect() returns\n      // coordinates relative to the main viewport. So we skip strict viewport\n      // filtering in iframes and rely on the main frame's viewport filtering.\n      // Viewport filtering is handled later when composing the overlay\n\n      boundingBoxes[backendNodeId] = {\n        x: rect.left,\n        y: rect.top,\n        width: rect.width,\n        height: rect.height,\n        top: rect.top,\n        left: rect.left,\n        right: rect.right,\n        bottom: rect.bottom,\n      };\n    } catch (error) {\n      // Silently skip elements that fail\n      continue;\n    }\n  }\n\n  return boundingBoxes;\n};\n\n/**\n * Collect bounding boxes for same-origin iframe elements by navigating through iframe chain\n * This function runs in the main page context and navigates to iframes using XPaths\n *\n * @param elementsData - Array of {xpath, backendNodeId, frameXPaths}\n * @returns Object mapping backend node ID to bounding box\n */\nwindow.__hyperagent_collectBoundingBoxesForSameOriginIframe = function(elementsData) {\n  const boundingBoxes = {};\n\n  for (const {xpath, backendNodeId, frameXPaths} of elementsData) {\n    try {\n      // Navigate to the target frame document and track iframe offset\n      let contextDocument = document;\n      let offsetX = 0;\n      let offsetY = 0;\n\n      if (frameXPaths && frameXPaths.length > 0) {\n        // Walk through iframe chain using XPaths and accumulate offsets\n        for (let i = 0; i < frameXPaths.length; i++) {\n          const iframeXPath = frameXPaths[i];\n\n          const iframeResult = contextDocument.evaluate(\n            iframeXPath,\n            contextDocument.documentElement,\n            null,\n            XPathResult.FIRST_ORDERED_NODE_TYPE,\n            null\n          );\n\n          const iframeElement = iframeResult.singleNodeValue;\n\n          if (!iframeElement || !iframeElement.contentDocument) {\n            contextDocument = null;\n            break;\n          }\n\n          // Get iframe's position relative to its parent document\n          const iframeRect = iframeElement.getBoundingClientRect();\n          // Add the iframe's border offset (clientLeft/clientTop accounts for borders)\n          offsetX += iframeRect.left + (iframeElement.clientLeft || 0);\n          offsetY += iframeRect.top + (iframeElement.clientTop || 0);\n\n          contextDocument = iframeElement.contentDocument;\n        }\n\n        if (!contextDocument) {\n          continue;\n        }\n      }\n\n      // Now evaluate the element's XPath in the iframe document\n      const result = contextDocument.evaluate(\n        xpath,\n        contextDocument.documentElement,\n        null,\n        XPathResult.FIRST_ORDERED_NODE_TYPE,\n        null\n      );\n\n      const element = result.singleNodeValue;\n      if (!element || typeof element.getBoundingClientRect !== 'function') {\n        continue;\n      }\n\n      const rect = element.getBoundingClientRect();\n\n      // Only include elements that have some size\n      if (rect.width === 0 && rect.height === 0) {\n        continue;\n      }\n\n      // Translate coordinates from iframe to main page viewport\n      // Add accumulated iframe offsets to get coordinates relative to main page\n      const translatedLeft = rect.left + offsetX;\n      const translatedTop = rect.top + offsetY;\n      const translatedRight = rect.right + offsetX;\n      const translatedBottom = rect.bottom + offsetY;\n\n      // Viewport filtering is handled later when composing the overlay\n\n      boundingBoxes[backendNodeId] = {\n        x: translatedLeft,\n        y: translatedTop,\n        width: rect.width,\n        height: rect.height,\n        top: translatedTop,\n        left: translatedLeft,\n        right: translatedRight,\n        bottom: translatedBottom,\n      };\n    } catch (error) {\n      // Silently skip elements that fail\n      continue;\n    }\n  }\n\n  return boundingBoxes;\n};\n";
export declare function injectBoundingBoxScriptSession(session: CDPSession): Promise<void>;
/**
 * Collect bounding boxes for nodes via a CDP session with failure tracking.
 * Returns both successful boxes and a list of failed backend node IDs.
 *
 * @param target - CDP session/configuration for the frame
 * @param xpathMap - Full XPath map (encodedId → xpath)
 * @param nodesToCollect - Nodes with backendDOMNodeId and encodedId
 * @param frameIndex - Frame index for creating encoded IDs
 */
export declare function batchCollectBoundingBoxesWithFailures(target: BoundingBoxTarget, xpathMap: Record<EncodedId, string>, nodesToCollect: Array<{
    backendDOMNodeId?: number;
    encodedId?: EncodedId;
}>, frameIndex: number, frameMap?: Map<number, IframeInfo>): Promise<{
    boundingBoxMap: Map<EncodedId, DOMRect>;
    failures: Array<{
        encodedId: EncodedId;
        backendNodeId: number;
    }>;
}>;
