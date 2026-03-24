import type { EncodedId } from "../context-providers/a11y-dom/types";
export interface FrameRecord {
    frameId: string;
    parentFrameId: string | null;
    loaderId?: string;
    name?: string;
    url?: string;
    sessionId?: string;
    executionContextId?: number;
    isolatedWorldId?: number;
    backendNodeId?: number;
    iframeEncodedId?: EncodedId;
    lastUpdated: number;
}
export declare class FrameGraph {
    private readonly frames;
    private readonly children;
    private readonly frameIndexMap;
    private readonly frameIdToIndex;
    getFrame(frameId: string): FrameRecord | undefined;
    getFrameIndex(frameId: string): number | undefined;
    getFrameIdByIndex(index: number): string | undefined;
    getChildren(parentFrameId: string | null): string[];
    getAllFrames(): FrameRecord[];
    upsertFrame(record: Omit<FrameRecord, "lastUpdated"> & {
        lastUpdated?: number;
    }): FrameRecord;
    removeFrame(frameId: string): void;
    assignFrameIndex(frameId: string, index: number): void;
    toJSON(): {
        frames: FrameRecord[];
        frameIndexMap: Record<number, string>;
    };
    clear(): void;
    private updateParentRelation;
}
