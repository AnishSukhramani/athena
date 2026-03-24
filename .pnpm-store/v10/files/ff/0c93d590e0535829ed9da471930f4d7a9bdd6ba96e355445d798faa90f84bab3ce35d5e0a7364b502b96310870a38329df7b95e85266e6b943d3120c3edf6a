"use strict";
/**
 * Build hierarchical accessibility tree from flat CDP nodes
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHierarchicalTree = buildHierarchicalTree;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const utils_1 = require("./utils");
const scrollable_detection_1 = require("./scrollable-detection");
const bounding_box_batch_1 = require("./bounding-box-batch");
/**
 * Convert raw CDP AXNode to simplified AccessibilityNode
 * Optionally decorates role with "scrollable" prefix if element is scrollable
 */
function convertAXNode(node, scrollableIds) {
    const baseRole = node.role?.value ?? "unknown";
    // Decorate role if element is scrollable
    const role = scrollableIds
        ? (0, scrollable_detection_1.decorateRoleIfScrollable)(baseRole, node.backendDOMNodeId, scrollableIds)
        : baseRole;
    return {
        role,
        name: node.name?.value,
        description: node.description?.value,
        value: node.value?.value,
        nodeId: node.nodeId,
        backendDOMNodeId: node.backendDOMNodeId,
        parentId: node.parentId,
        childIds: node.childIds,
        properties: node.properties,
    };
}
/**
 * Build a hierarchical accessibility tree from flat CDP nodes
 *
 * @param nodes - Flat array of accessibility nodes from CDP
 * @param tagNameMap - Map of encoded IDs to tag names
 * @param xpathMap - Map of encoded IDs to XPaths
 * @param frameIndex - Frame index for encoded ID generation
 * @param scrollableIds - Set of backend node IDs that are scrollable
 * @param debug - Whether to collect debug information
 * @param enableVisualMode - Whether to collect bounding boxes for visual overlay
 * @param pageOrFrame - Playwright Page or Frame for batch bounding box collection
 * @param debugDir - Directory to write debug files
 * @returns TreeResult with cleaned tree, simplified text, and maps
 */
async function buildHierarchicalTree(nodes, { tagNameMap, xpathMap, frameMap }, frameIndex = 0, scrollableIds, debug = false, enableVisualMode = false, boundingBoxTarget, debugDir) {
    // Convert raw AX nodes to simplified format, decorating scrollable elements
    const accessibilityNodes = nodes.map((node) => convertAXNode(node, scrollableIds));
    // Map to store processed nodes
    const nodeMap = new Map();
    // Map to store bounding boxes (only if visual mode enabled)
    let boundingBoxMap = new Map();
    let boundingBoxFailures = [];
    // Batch collect bounding boxes BEFORE Pass 1 if visual mode enabled
    if ((debug || enableVisualMode) && boundingBoxTarget) {
        // First pass: identify nodes we want to keep and collect their info
        const nodesToCollect = [];
        for (const node of accessibilityNodes) {
            // Skip nodes without nodeId or negative pseudo-nodes
            if (!node.nodeId || +node.nodeId < 0)
                continue;
            // Keep nodes that have:
            // - A name (visible text)
            // - Children (structural importance)
            // - Interactive role
            const keep = node.name?.trim() || node.childIds?.length || (0, utils_1.isInteractive)(node);
            if (!keep)
                continue;
            // Create encoded ID
            let encodedId;
            if (node.backendDOMNodeId !== undefined) {
                encodedId = (0, utils_1.createEncodedId)(frameIndex, node.backendDOMNodeId);
            }
            if (node.backendDOMNodeId !== undefined && encodedId) {
                nodesToCollect.push({
                    backendDOMNodeId: node.backendDOMNodeId,
                    encodedId,
                });
            }
        }
        // Batch collect all bounding boxes in a single CDP call
        if (nodesToCollect.length > 0) {
            const startTime = Date.now();
            const result = await (0, bounding_box_batch_1.batchCollectBoundingBoxesWithFailures)(boundingBoxTarget, xpathMap, nodesToCollect, frameIndex, frameMap);
            const duration = Date.now() - startTime;
            boundingBoxMap = result.boundingBoxMap;
            boundingBoxFailures = result.failures;
            if (debug) {
                console.debug(`[A11y] Frame ${frameIndex}: Batch collected ${boundingBoxMap.size}/${nodesToCollect.length} bounding boxes in ${duration}ms (${boundingBoxFailures.length} elements without layout)`);
            }
            // Write failures to debug file
            if (debugDir && boundingBoxFailures.length > 0) {
                const failureDetails = boundingBoxFailures
                    .map(f => `${f.encodedId} (backendNodeId=${f.backendNodeId})`)
                    .join('\n');
                fs.writeFileSync(path.join(debugDir, `frame-${frameIndex}-bounding-box-failures.txt`), `Failed to get bounding boxes for ${boundingBoxFailures.length} elements:\n\n${failureDetails}\n`);
            }
        }
    }
    // Pass 1: Copy and filter nodes we want to keep
    for (const node of accessibilityNodes) {
        // Skip nodes without nodeId or negative pseudo-nodes
        if (!node.nodeId || +node.nodeId < 0)
            continue;
        // Keep nodes that have:
        // - A name (visible text)
        // - Children (structural importance)
        // - Interactive role
        const keep = node.name?.trim() || node.childIds?.length || (0, utils_1.isInteractive)(node);
        if (!keep)
            continue;
        // Resolve encoded ID - directly construct from frameIndex and backendNodeId
        // EncodedId format is "frameIndex-backendNodeId", no complex lookup needed
        let encodedId;
        if (node.backendDOMNodeId !== undefined) {
            encodedId = (0, utils_1.createEncodedId)(frameIndex, node.backendDOMNodeId);
        }
        // Store node with encodedId
        const richNode = {
            encodedId,
            role: node.role,
            nodeId: node.nodeId,
            ...(node.name && { name: node.name }),
            ...(node.description && { description: node.description }),
            ...(node.value && { value: node.value }),
            ...(node.backendDOMNodeId !== undefined && {
                backendDOMNodeId: node.backendDOMNodeId,
            }),
        };
        nodeMap.set(node.nodeId, richNode);
        // Attach bounding box if it was collected in batch
        if (encodedId && boundingBoxMap.has(encodedId)) {
            const boundingBox = boundingBoxMap.get(encodedId);
            richNode.boundingBox = boundingBox;
        }
    }
    // Pass 2: Wire parent-child relationships
    for (const node of accessibilityNodes) {
        if (!node.parentId || !node.nodeId)
            continue;
        const parent = nodeMap.get(node.parentId);
        const current = nodeMap.get(node.nodeId);
        if (parent && current) {
            (parent.children ??= []).push(current);
        }
    }
    // Pass 3: Find root nodes (nodes without parents)
    const roots = accessibilityNodes
        .filter((n) => !n.parentId && n.nodeId && nodeMap.has(n.nodeId))
        .map((n) => nodeMap.get(n.nodeId));
    // Pass 4: Clean structural nodes
    const cleanedRoots = (await Promise.all(roots.map((n) => (0, utils_1.cleanStructuralNodes)(n, tagNameMap)))).filter(Boolean);
    // Pass 5: Generate simplified text tree
    const treeContent = cleanedRoots.map(utils_1.formatSimplifiedTree).join("\n");
    // Pass 5.5: Prepend frame header
    const frameInfo = frameMap?.get(frameIndex);
    const framePath = frameInfo?.framePath ||
        (frameIndex === 0 ? ["Main"] : [`Frame ${frameIndex}`]);
    const header = (0, utils_1.generateFrameHeader)(frameIndex, framePath);
    const simplified = `${header}\n${treeContent}`;
    // Pass 6: Build idToElement map for quick lookup
    const idToElement = new Map();
    const collectNodes = (node) => {
        if (node.encodedId) {
            idToElement.set(node.encodedId, node);
        }
        node.children?.forEach((child) => collectNodes(child));
    };
    cleanedRoots.forEach((root) => collectNodes(root));
    // Pass 7: Build final bounding box map from cleaned tree only
    // This ensures the visual overlay only shows elements that made it through tree cleaning
    const finalBoundingBoxMap = new Map();
    if (enableVisualMode) {
        for (const encodedId of idToElement.keys()) {
            const boundingBox = boundingBoxMap.get(encodedId);
            if (boundingBox) {
                finalBoundingBoxMap.set(encodedId, boundingBox);
            }
        }
    }
    return {
        tree: cleanedRoots,
        simplified,
        xpathMap,
        idToElement,
        ...(enableVisualMode && { boundingBoxMap: finalBoundingBoxMap }),
    };
}
