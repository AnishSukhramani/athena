import type { Page } from "playwright-core";
import type { CDPClient, CDPSession } from "../cdp/types";
import type { FrameContextManager } from "../cdp/frame-context-manager";
import type { EncodedId, IframeInfo } from "../context-providers/a11y-dom/types";
export interface ElementResolveContext {
    page: Page;
    cdpClient: CDPClient;
    backendNodeMap: Record<EncodedId, number>;
    xpathMap: Record<EncodedId, string>;
    frameMap?: Map<number, IframeInfo>;
    resolvedElementsCache?: Map<EncodedId, ResolvedCDPElement>;
    frameContextManager?: FrameContextManager;
    debug?: boolean;
    strictFrameValidation?: boolean;
}
export interface ResolvedCDPElement {
    session: CDPSession;
    frameId: string;
    backendNodeId: number;
    objectId?: string;
}
export declare function resolveElement(encodedId: EncodedId, ctx: ElementResolveContext): Promise<ResolvedCDPElement>;
