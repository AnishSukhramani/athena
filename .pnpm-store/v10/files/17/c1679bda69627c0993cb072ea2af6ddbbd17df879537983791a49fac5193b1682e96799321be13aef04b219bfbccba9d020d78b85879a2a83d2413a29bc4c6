import { CDPClient } from "../../cdp/types";
import { FrameContextManager } from "../../cdp/frame-context-manager";
export interface ResolvedCDPFromXPath {
    backendNodeId: number;
    frameId: string;
    objectId?: string;
}
export interface ResolveXPathWithCDPParams {
    xpath: string;
    frameIndex: number | null | undefined;
    cdpClient: CDPClient;
    frameContextManager?: FrameContextManager;
    debug?: boolean;
}
export declare function resolveXPathWithCDP(params: ResolveXPathWithCDPParams): Promise<ResolvedCDPFromXPath>;
