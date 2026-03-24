/**
 * Build hierarchical accessibility tree from flat CDP nodes
 */
import { AXNode, TreeResult, BackendIdMaps } from "./types";
import { BoundingBoxTarget } from "./bounding-box-batch";
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
export declare function buildHierarchicalTree(nodes: AXNode[], { tagNameMap, xpathMap, frameMap }: BackendIdMaps, frameIndex?: number, scrollableIds?: Set<number>, debug?: boolean, enableVisualMode?: boolean, boundingBoxTarget?: BoundingBoxTarget, debugDir?: string): Promise<TreeResult>;
