/**
 * Utilities for filtering ad and tracking frames
 * Prevents non-interactive ad iframes from polluting the frame graph
 */
export interface FrameFilterContext {
    url: string;
    name?: string;
    parentUrl?: string;
}
/**
 * Check if a frame is likely an ad or tracking iframe
 *
 * Detection criteria:
 * 1. Tiny pixel frames (1x1) - common for tracking pixels
 * 2. Known ad/tracking keywords in URL or name
 * 3. Known ad network domains
 * 4. Common tracking file extensions
 */
export declare function isAdOrTrackingFrame(context: FrameFilterContext): boolean;
