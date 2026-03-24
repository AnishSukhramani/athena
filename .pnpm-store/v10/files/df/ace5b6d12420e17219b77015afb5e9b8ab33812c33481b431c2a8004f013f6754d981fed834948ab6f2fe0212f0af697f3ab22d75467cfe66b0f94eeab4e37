/**
 * Utility functions for accessibility tree processing
 */
import { Page, Frame } from "playwright-core";
import { AccessibilityNode, EncodedId, AXNode, IframeInfo } from "./types";
/**
 * Clean text by removing private-use unicode characters and normalizing whitespace
 */
export declare function cleanText(input: string): string;
/**
 * Format a single accessibility node as a text line
 * Format: [id] role: name
 */
export declare function formatNodeLine(node: AccessibilityNode & {
    encodedId?: EncodedId;
}, level?: number): string;
/**
 * Format accessibility tree as indented text
 * Recursive function to build the tree structure
 */
export declare function formatSimplifiedTree(node: AccessibilityNode & {
    encodedId?: EncodedId;
}, level?: number): string;
/**
 * Generate frame header for tree display
 * @param frameIndex - Frame index (0 for main)
 * @param framePath - Full hierarchy path (e.g., ["Main", "Frame 1", "Frame 2"])
 * @returns Formatted header string
 */
export declare function generateFrameHeader(frameIndex: number, framePath: string[]): string;
/**
 * Check if a node is interactive based on role and properties
 */
export declare function isInteractive(node: AccessibilityNode): boolean;
/**
 * Remove redundant StaticText children when parent has same name
 */
export declare function removeRedundantStaticTextChildren(parent: AccessibilityNode, children: AccessibilityNode[]): AccessibilityNode[];
/**
 * Clean structural nodes by replacing generic roles with tag names
 */
export declare function cleanStructuralNodes(node: AccessibilityNode & {
    encodedId?: EncodedId;
}, tagNameMap: Record<EncodedId, string>): Promise<AccessibilityNode | null>;
/**
 * Parse encoded ID to extract frame index and backend node ID
 */
export declare function parseEncodedId(encodedId: EncodedId): {
    frameIndex: number;
    backendNodeId: number;
};
/**
 * Create encoded ID from frame index and backend node ID
 */
export declare function createEncodedId(frameIndex: number, backendNodeId: number): EncodedId;
/**
 * Check if accessibility nodes contain any interactive elements
 * @param nodes Array of AXNode objects to check
 * @returns true if any non-ignored interactive element is found
 */
export declare function hasInteractiveElements(nodes: AXNode[]): boolean;
/**
 * Build a context label for an element in an iframe
 * Includes parent iframe information for nested iframes
 *
 * @param tagName HTML tag name of the element
 * @param frameIndex Frame index of the element
 * @param frameMap Map of frame metadata
 * @returns Formatted label with frame context
 */
export declare function buildFrameContextLabel(tagName: string, frameIndex: number, frameMap: Map<number, IframeInfo>): string;
/**
 * Create fallback AXNodes from DOM when accessibility tree is incomplete
 *
 * @param frameIndex Frame index to create nodes for
 * @param tagNameMap Map of encoded IDs to tag names
 * @param frameMap Map of frame metadata
 * @param accessibleNameMap Map of encoded IDs to accessible names
 * @returns Array of synthetic AXNode objects
 */
export declare function createDOMFallbackNodes(frameIndex: number, tagNameMap: Record<string, string>, frameMap: Map<number, IframeInfo>, accessibleNameMap?: Record<string, string>): AXNode[];
/**
 * Resolve a Playwright frame for a given frame index by:
 * 1. Matching known iframe URLs against page.frames() (handles cross-origin/OOPIF)
 * 2. Falling back to XPath traversal for same-origin nested frames
 */
export declare function resolveFrameByXPath(page: Page, frameMap: Map<number, IframeInfo>, targetFrameIndex: number): Promise<Frame | null>;
