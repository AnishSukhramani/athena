import type { CDPSession } from "../cdp/types";
export interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    left: number;
    right: number;
    bottom: number;
}
interface BoundingBoxOptions {
    session: CDPSession;
    backendNodeId: number;
    xpath?: string;
    preferScript?: boolean;
}
export declare function getBoundingBox(options: BoundingBoxOptions): Promise<BoundingBox | null>;
export {};
