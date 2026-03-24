import type { BoundingBox } from "../cdp/bounding-box";
import type { ResolvedCDPElement } from "../cdp/element-resolver";
export type CDPActionMethod = "click" | "doubleClick" | "hover" | "type" | "fill" | "press" | "check" | "uncheck" | "selectOptionFromDropdown" | "scrollTo" | "scrollToElement" | "scrollToPercentage" | "nextChunk" | "prevChunk";
export interface CDPActionElement extends ResolvedCDPElement {
    xpath?: string;
}
export interface CDPActionContext {
    element: CDPActionElement;
    debug?: boolean;
    /**
     * Existing bounding box data (e.g., from visual/debug mode)
     */
    boundingBox?: BoundingBox | null;
    /**
     * Optional lazy supplier for bounding boxes (e.g., from DOM state maps)
     */
    getBoundingBox?: () => Promise<BoundingBox | null>;
    /**
     * Prefer using injected script path for bounding boxes when possible.
     */
    preferScriptBoundingBox?: boolean;
}
export declare function dispatchCDPAction(method: CDPActionMethod, args: unknown[], ctx: CDPActionContext): Promise<void>;
