"use strict";
/**
 * Utility functions for accessibility tree processing
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanText = cleanText;
exports.formatNodeLine = formatNodeLine;
exports.formatSimplifiedTree = formatSimplifiedTree;
exports.generateFrameHeader = generateFrameHeader;
exports.isInteractive = isInteractive;
exports.removeRedundantStaticTextChildren = removeRedundantStaticTextChildren;
exports.cleanStructuralNodes = cleanStructuralNodes;
exports.parseEncodedId = parseEncodedId;
exports.createEncodedId = createEncodedId;
exports.hasInteractiveElements = hasInteractiveElements;
exports.buildFrameContextLabel = buildFrameContextLabel;
exports.createDOMFallbackNodes = createDOMFallbackNodes;
exports.resolveFrameByXPath = resolveFrameByXPath;
/**
 * Clean text by removing private-use unicode characters and normalizing whitespace
 */
function cleanText(input) {
    if (!input)
        return "";
    const PUA_START = 0xe000;
    const PUA_END = 0xf8ff;
    const NBSP_CHARS = new Set([0x00a0, 0x202f, 0x2007, 0xfeff]);
    let out = "";
    let prevWasSpace = false;
    for (let i = 0; i < input.length; i++) {
        const code = input.charCodeAt(i);
        // Skip private-use area glyphs
        if (code >= PUA_START && code <= PUA_END) {
            continue;
        }
        // Convert NBSP-family characters to a single space, collapsing repeats
        if (NBSP_CHARS.has(code)) {
            if (!prevWasSpace) {
                out += " ";
                prevWasSpace = true;
            }
            continue;
        }
        // Append the character and update space tracker
        out += input[i];
        prevWasSpace = input[i] === " ";
    }
    // Trim leading/trailing spaces
    return out.trim();
}
/**
 * Format a single accessibility node as a text line
 * Format: [id] role: name
 */
function formatNodeLine(node, level = 0) {
    const indent = "  ".repeat(level);
    const idLabel = node.encodedId ?? node.nodeId ?? "unknown";
    const namePart = node.name ? `: ${cleanText(node.name)}` : "";
    return `${indent}[${idLabel}] ${node.role}${namePart}`;
}
/**
 * Format accessibility tree as indented text
 * Recursive function to build the tree structure
 */
function formatSimplifiedTree(node, level = 0) {
    const currentLine = formatNodeLine(node, level) + "\n";
    const childrenLines = node.children
        ?.map((c) => formatSimplifiedTree(c, level + 1))
        .join("") ?? "";
    return currentLine + childrenLines;
}
/**
 * Generate frame header for tree display
 * @param frameIndex - Frame index (0 for main)
 * @param framePath - Full hierarchy path (e.g., ["Main", "Frame 1", "Frame 2"])
 * @returns Formatted header string
 */
function generateFrameHeader(frameIndex, framePath) {
    if (frameIndex === 0) {
        return "=== Frame 0 (Main) ===";
    }
    const pathStr = framePath.join(" → ");
    return `=== Frame ${frameIndex} (${pathStr}) ===`;
}
/**
 * Check if a node is interactive based on role and properties
 */
function isInteractive(node) {
    // Skip structural-only roles
    if (node.role === "none" ||
        node.role === "generic" ||
        node.role === "InlineTextBox") {
        return false;
    }
    return true;
}
/**
 * Remove redundant StaticText children when parent has same name
 */
function removeRedundantStaticTextChildren(parent, children) {
    if (children.length !== 1)
        return children;
    const child = children[0];
    if (child.role === "StaticText" &&
        child.name === parent.name &&
        !child.children?.length) {
        return [];
    }
    return children;
}
/**
 * Clean structural nodes by replacing generic roles with tag names
 */
async function cleanStructuralNodes(node, tagNameMap) {
    // Ignore negative pseudo-nodes
    if (node.nodeId && +node.nodeId < 0) {
        return null;
    }
    // Handle leaf nodes
    if (!node.children?.length) {
        return node.role === "generic" || node.role === "none" ? null : node;
    }
    // Recurse into children
    const cleanedChildren = (await Promise.all(node.children.map((c) => cleanStructuralNodes(c, tagNameMap)))).filter(Boolean);
    // Collapse or prune generic wrappers
    if (node.role === "generic" || node.role === "none") {
        if (cleanedChildren.length === 1) {
            // Collapse single-child structural node
            return cleanedChildren[0];
        }
        else if (cleanedChildren.length === 0) {
            // Remove empty structural node
            return null;
        }
    }
    // Replace generic role with real tag name for better context
    if ((node.role === "generic" || node.role === "none") &&
        node.encodedId !== undefined) {
        const tagName = tagNameMap[node.encodedId];
        if (tagName) {
            node.role = tagName;
        }
    }
    // Special case: combobox → select
    if (node.role === "combobox" &&
        node.encodedId !== undefined &&
        tagNameMap[node.encodedId] === "select") {
        node.role = "select";
    }
    // Drop redundant StaticText children
    const pruned = removeRedundantStaticTextChildren(node, cleanedChildren);
    if (!pruned.length && (node.role === "generic" || node.role === "none")) {
        return null;
    }
    // Return updated node
    return { ...node, children: pruned };
}
/**
 * Parse encoded ID to extract frame index and backend node ID
 */
function parseEncodedId(encodedId) {
    const [frameStr, backendStr] = encodedId.split("-");
    return {
        frameIndex: parseInt(frameStr, 10),
        backendNodeId: parseInt(backendStr, 10),
    };
}
/**
 * Create encoded ID from frame index and backend node ID
 */
function createEncodedId(frameIndex, backendNodeId) {
    return `${frameIndex}-${backendNodeId}`;
}
/**
 * Interactive roles that we check for in accessibility trees
 */
const INTERACTIVE_ROLES = [
    "button",
    "link",
    "textbox",
    "searchbox",
    "combobox",
    "checkbox",
    "radio",
];
/**
 * Check if accessibility nodes contain any interactive elements
 * @param nodes Array of AXNode objects to check
 * @returns true if any non-ignored interactive element is found
 */
function hasInteractiveElements(nodes) {
    return nodes.some((node) => {
        const role = node.role?.value || "";
        return (INTERACTIVE_ROLES.includes(role) &&
            !node.ignored);
    });
}
/**
 * Build a context label for an element in an iframe
 * Includes parent iframe information for nested iframes
 *
 * @param tagName HTML tag name of the element
 * @param frameIndex Frame index of the element
 * @param frameMap Map of frame metadata
 * @returns Formatted label with frame context
 */
function buildFrameContextLabel(tagName, frameIndex, frameMap) {
    const frameInfo = frameMap.get(frameIndex);
    const frameSrc = frameInfo?.src || `frame${frameIndex}`;
    // Add parent context for nested iframes
    if (frameInfo?.parentFrameIndex !== undefined &&
        frameInfo.parentFrameIndex !== null &&
        frameInfo.parentFrameIndex > 0) {
        const parentInfo = frameMap.get(frameInfo.parentFrameIndex);
        const parentSrc = parentInfo?.src || `frame${frameInfo.parentFrameIndex}`;
        return `${tagName} in ${frameSrc} (nested in ${parentSrc})`;
    }
    return `${tagName} in ${frameSrc}`;
}
/**
 * Map HTML tag names to accessibility roles
 * @param tagName HTML tag name
 * @returns Accessibility role or undefined if not interactive
 */
function mapTagToRole(tagName) {
    switch (tagName) {
        case "input":
        case "textarea":
            return "textbox";
        case "button":
            return "button";
        case "a":
            return "link";
        case "select":
            return "combobox";
        default:
            return undefined;
    }
}
/**
 * Create fallback AXNodes from DOM when accessibility tree is incomplete
 *
 * @param frameIndex Frame index to create nodes for
 * @param tagNameMap Map of encoded IDs to tag names
 * @param frameMap Map of frame metadata
 * @param accessibleNameMap Map of encoded IDs to accessible names
 * @returns Array of synthetic AXNode objects
 */
function createDOMFallbackNodes(frameIndex, tagNameMap, frameMap, accessibleNameMap) {
    const domFallbackNodes = [];
    const framePrefix = `${frameIndex}-`;
    // Look for interactive elements in DOM map
    for (const [encodedId, tagName] of Object.entries(tagNameMap)) {
        if (!encodedId.startsWith(framePrefix))
            continue;
        // Map HTML tags to accessibility roles
        const role = mapTagToRole(tagName);
        if (!role)
            continue; // Only include interactive elements
        // Extract backendNodeId from encodedId
        const backendNodeId = parseInt(encodedId.split("-")[1]);
        if (isNaN(backendNodeId))
            continue;
        // Try to get accessible name from map first
        const accessibleName = accessibleNameMap?.[encodedId];
        // Build label: use accessible name if available, otherwise use tag name with frame context
        const label = accessibleName || `${tagName} in frame ${frameIndex}`;
        // Create simple AXNode from DOM data with frame context
        domFallbackNodes.push({
            nodeId: `dom-${encodedId}`,
            backendDOMNodeId: backendNodeId,
            role: { value: role },
            name: { value: label },
            ignored: false,
        });
    }
    return domFallbackNodes;
}
/**
 * Resolve a Playwright frame for a given frame index by:
 * 1. Matching known iframe URLs against page.frames() (handles cross-origin/OOPIF)
 * 2. Falling back to XPath traversal for same-origin nested frames
 */
async function resolveFrameByXPath(page, frameMap, targetFrameIndex) {
    try {
        // Main frame is always the page's main frame
        if (targetFrameIndex === 0) {
            return page.mainFrame();
        }
        const targetFrameInfo = frameMap.get(targetFrameIndex);
        if (!targetFrameInfo) {
            console.warn(`[A11y] Frame ${targetFrameIndex} not found in frameMap`);
            return null;
        }
        // Try matching by URL (works for cross-origin frames)
        if (targetFrameInfo.src) {
            const matchByUrl = page
                .frames()
                .find((frame) => frame.url() === targetFrameInfo.src);
            if (matchByUrl) {
                return matchByUrl;
            }
        }
        // Build frame path by walking parent chain: [0, 2, 5] for nested frames
        const framePath = [];
        let currentIdx = targetFrameIndex;
        const visited = new Set();
        while (currentIdx !== null && !visited.has(currentIdx)) {
            visited.add(currentIdx);
            framePath.unshift(currentIdx);
            const frameInfo = frameMap.get(currentIdx);
            if (!frameInfo)
                break;
            currentIdx = frameInfo.parentFrameIndex;
        }
        // Start from main frame
        let currentFrame = page.mainFrame();
        // Walk through frame chain (skip main frame at index 0)
        for (let i = 1; i < framePath.length; i++) {
            const frameIndex = framePath[i];
            const frameInfo = frameMap.get(frameIndex);
            if (!frameInfo?.xpath) {
                console.warn(`[A11y] Frame ${frameIndex} missing XPath, cannot resolve`);
                return null;
            }
            // Use XPath to locate iframe element, then use contentFrame() to traverse
            try {
                const iframeLocator = currentFrame.locator(`xpath=${frameInfo.xpath}`);
                const iframeHandle = await iframeLocator.elementHandle();
                if (!iframeHandle) {
                    console.warn(`[A11y] Could not get element handle for frame ${frameIndex}`);
                    return null;
                }
                const nextFrame = await iframeHandle.contentFrame();
                if (!nextFrame) {
                    console.warn(`[A11y] Could not get content frame for frame ${frameIndex}`);
                    return null;
                }
                currentFrame = nextFrame;
            }
            catch (error) {
                console.warn(`[A11y] Error traversing frame ${frameIndex}:`, error);
                return null;
            }
        }
        return currentFrame;
    }
    catch (error) {
        console.error(`[A11y] Failed to resolve frame ${targetFrameIndex}:`, error);
        return null;
    }
}
