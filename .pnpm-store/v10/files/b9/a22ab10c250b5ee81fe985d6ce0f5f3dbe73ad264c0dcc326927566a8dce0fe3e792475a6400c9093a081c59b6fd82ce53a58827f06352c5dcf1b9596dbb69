/**
 * Shared color palette for element highlighting across DOM and A11y modes
 */
/**
 * Rainbow color palette (12 colors)
 * Used for cycling through element highlights
 */
export declare const HIGHLIGHT_COLORS: string[];
/**
 * Convert hex color to RGBA number (for Jimp)
 * @param hex - Hex color string (e.g., "#FF0000")
 * @param alpha - Alpha value (0-255), default 255
 * @returns Unsigned 32-bit integer in RGBA format
 */
export declare function hexToRgba(hex: string, alpha?: number): number;
/**
 * Get highlight color based on index and color scheme
 * @param index - Element index (0-based)
 * @param scheme - Color scheme: 'red' for single color, 'rainbow' for cycling
 */
export declare function getHighlightColor(index: number, scheme?: 'red' | 'rainbow'): {
    baseColor: string;
    backgroundColor: string;
};
/**
 * Get color as RGBA number for Jimp
 */
export declare function getHighlightColorRgba(index: number, scheme?: 'red' | 'rainbow'): number;
