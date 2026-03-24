/**
 * Renders visual overlay with numbered/labeled bounding boxes
 * Labels use encodedId format (e.g., "0-1234", "2-5678")
 */
import type { DOMRect, EncodedId } from "./types";
export interface OverlayOptions {
    width: number;
    height: number;
    showEncodedIds?: boolean;
    colorScheme?: "red" | "rainbow";
}
/**
 * Render a11y tree elements as visual overlay
 *
 * @param boundingBoxMap - Map of encodedId to bounding boxes
 * @param options - Rendering options
 * @returns Base64-encoded PNG image
 */
export declare function renderA11yOverlay(boundingBoxMap: Map<EncodedId, DOMRect>, options: OverlayOptions): Promise<string>;
