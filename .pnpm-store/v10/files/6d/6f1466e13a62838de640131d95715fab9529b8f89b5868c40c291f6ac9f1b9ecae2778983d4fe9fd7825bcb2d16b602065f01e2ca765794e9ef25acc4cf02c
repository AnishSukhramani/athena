/**
 * Types for accessibility tree extraction using Chrome DevTools Protocol
 */
/**
 * Raw AX Node from CDP Accessibility.getFullAXTree
 * Matches Chrome DevTools Protocol format
 */
export interface AXNode {
    role?: {
        value: string;
    };
    name?: {
        value: string;
    };
    description?: {
        value: string;
    };
    value?: {
        value: string;
    };
    nodeId: string;
    backendDOMNodeId?: number;
    parentId?: string;
    childIds?: string[];
    properties?: Array<{
        name: string;
        value: {
            type: string;
            value?: string;
        };
    }>;
    ignored?: boolean;
    ignoredReasons?: Array<{
        name: string;
        value?: {
            value: string;
        };
    }>;
}
/**
 * Bounding box information for an element
 */
export interface DOMRect {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    left: number;
    right: number;
    bottom: number;
}
/**
 * Simplified AccessibilityNode with parsed values
 * Used for tree building and filtering
 */
export interface AccessibilityNode {
    role: string;
    name?: string;
    description?: string;
    value?: string;
    children?: AccessibilityNode[];
    childIds?: string[];
    parentId?: string;
    nodeId?: string;
    backendDOMNodeId?: number;
    properties?: Array<{
        name: string;
        value: {
            type: string;
            value?: string;
        };
    }>;
    /**
     * Bounding box data (only populated when enableVisualMode is true)
     */
    boundingBox?: DOMRect;
}
/**
 * DOM Node from CDP DOM.getDocument
 */
export interface DOMNode {
    backendNodeId?: number;
    nodeName?: string;
    children?: DOMNode[];
    shadowRoots?: DOMNode[];
    contentDocument?: DOMNode;
    nodeType: number;
    frameId?: string;
    /**
     * Attributes of the Element node in the form of flat array [name1, value1, name2, value2]
     */
    attributes?: string[];
}
/**
 * Iframe metadata for frame resolution
 */
export interface IframeInfo {
    frameIndex: number;
    src?: string;
    name?: string;
    xpath: string;
    /**
     * CDP frame identifier (mirrors chrome Frame.id). Prefer this over the legacy cdpFrameId field.
     */
    frameId?: string;
    cdpFrameId?: string;
    cdpSessionId?: string;
    executionContextId?: number;
    parentFrameIndex: number | null;
    siblingPosition: number;
    iframeBackendNodeId?: number;
    contentDocumentBackendNodeId?: number;
    framePath?: string[];
    /**
     * Absolute bounding box of the iframe element relative to the main viewport (populated in visual mode)
     */
    absoluteBoundingBox?: DOMRect;
}
/**
 * Maps for backend node IDs to tag names, xpaths, and accessible names
 * Built from the full DOM tree
 */
export interface BackendIdMaps {
    tagNameMap: Record<EncodedId, string>;
    xpathMap: Record<EncodedId, string>;
    accessibleNameMap: Record<EncodedId, string>;
    backendNodeMap: Record<EncodedId, number>;
    frameMap?: Map<number, IframeInfo>;
}
/**
 * Encoded ID format: frameIndex-nodeIndex
 * Used for stable element identification across frames
 */
export type EncodedId = `${number}-${number}`;
/**
 * Enhanced node with encodedId for element identification
 */
export interface RichNode extends AccessibilityNode {
    encodedId?: EncodedId;
}
/**
 * Result from accessibility tree extraction
 */
export interface TreeResult {
    tree: AccessibilityNode[];
    simplified: string;
    xpathMap: Record<EncodedId, string>;
    idToElement: Map<EncodedId, AccessibilityNode>;
    /**
     * Map of encodedId to bounding box (only when enableVisualMode is true)
     */
    boundingBoxMap?: Map<EncodedId, DOMRect>;
}
/**
 * Configuration for A11y DOM extraction
 */
export interface A11yDOMConfig {
    /**
     * DOM extraction mode
     * - 'a11y': Pure text tree, no screenshot (fastest)
     * - 'hybrid': Text tree + clean screenshot
     * - 'visual-debug': Text tree + DOM injection + bounding boxes
     */
    mode?: "a11y" | "hybrid" | "visual-debug";
    /**
     * Whether to inject data-hyperagent-id attributes into DOM
     * Required for visual-debug mode
     */
    injectIdentifiers?: boolean;
    /**
     * Whether to draw bounding boxes around elements
     * Only works if injectIdentifiers is true
     */
    drawBoundingBoxes?: boolean;
    /**
     * Whether to include ignored nodes in the tree
     * Default: false (exclude ignored nodes)
     */
    includeIgnored?: boolean;
}
/**
 * Frame metadata for multi-frame support
 */
export interface FrameMetadata {
    frameIndex: number;
    frameUrl: string;
    frameName: string;
}
export interface FrameChunkEvent {
    frameIndex: number;
    framePath?: string[];
    frameUrl?: string;
    simplified: string;
    totalNodes: number;
    order: number;
}
/**
 * Debug information about frame extraction
 */
export interface FrameDebugInfo {
    frameIndex: number;
    frameUrl: string;
    totalNodes: number;
    treeElementCount: number;
    interactiveCount: number;
    sampleNodes?: Array<{
        role?: string;
        name?: string;
        nodeId?: string;
        ignored?: boolean;
        childIds?: number;
    }>;
}
/**
 * Accessibility DOM State returned to agent
 */
export interface A11yDOMState {
    /**
     * Map of encoded IDs to accessibility nodes
     */
    elements: Map<EncodedId, AccessibilityNode>;
    /**
     * Simplified text representation of the tree (sent to LLM)
     */
    domState: string;
    /**
     * Map of encoded IDs to XPaths for element location
     */
    xpathMap: Record<EncodedId, string>;
    /**
     * Map of encoded IDs to backend node IDs for CDP resolution
     */
    backendNodeMap: Record<EncodedId, number>;
    /**
     * Optional screenshot (only in hybrid/visual-debug modes)
     */
    screenshot?: string;
    /**
     * Metadata about frames (for iframe support)
     */
    frameMetadata?: FrameMetadata[];
    /**
     * Map of frame indices to iframe metadata (for frame resolution)
     */
    frameMap?: Map<number, IframeInfo>;
    /**
     * Debug information about frame extraction (for debugging iframe issues)
     */
    frameDebugInfo?: FrameDebugInfo[];
    /**
     * Map of encodedId to bounding box (only when enableVisualMode is true)
     */
    boundingBoxMap?: Map<EncodedId, DOMRect>;
    /**
     * Visual overlay PNG as base64 string (only when enableVisualMode is true)
     */
    visualOverlay?: string;
}
/**
 * Interactive roles that should be included in the accessibility tree
 * Based on ARIA roles and common interactive elements
 */
export declare const INTERACTIVE_ROLES: Set<string>;
/**
 * Structural roles to replace with tag names
 */
export declare const STRUCTURAL_ROLES: Set<string>;
/**
 * Pattern to validate encoded IDs (frameIndex-nodeIndex)
 */
export declare const ID_PATTERN: RegExp;
/**
 * Type guard to check if a string is a valid EncodedId
 */
export declare function isEncodedId(id: string): id is EncodedId;
/**
 * Type assertion to convert string to EncodedId with validation
 * @throws Error if the string is not a valid EncodedId format
 */
export declare function toEncodedId(id: string): EncodedId;
/**
 * Safe conversion that returns undefined if invalid
 */
export declare function asEncodedId(id: string): EncodedId | undefined;
