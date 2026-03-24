"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameGraph = void 0;
class FrameGraph {
    constructor() {
        this.frames = new Map();
        this.children = new Map();
        this.frameIndexMap = new Map();
        this.frameIdToIndex = new Map();
    }
    getFrame(frameId) {
        return this.frames.get(frameId);
    }
    getFrameIndex(frameId) {
        return this.frameIdToIndex.get(frameId);
    }
    getFrameIdByIndex(index) {
        return this.frameIndexMap.get(index);
    }
    getChildren(parentFrameId) {
        return Array.from(this.children.get(parentFrameId) ?? []);
    }
    getAllFrames() {
        return Array.from(this.frames.values());
    }
    upsertFrame(record) {
        const existing = this.frames.get(record.frameId);
        const lastUpdated = record.lastUpdated ?? Date.now();
        const merged = {
            frameId: record.frameId,
            parentFrameId: record.parentFrameId ?? null,
            loaderId: record.loaderId ?? existing?.loaderId,
            name: record.name ?? existing?.name,
            url: record.url ?? existing?.url,
            sessionId: record.sessionId ?? existing?.sessionId,
            executionContextId: record.executionContextId ?? existing?.executionContextId,
            isolatedWorldId: record.isolatedWorldId ?? existing?.isolatedWorldId,
            backendNodeId: record.backendNodeId ?? existing?.backendNodeId,
            iframeEncodedId: record.iframeEncodedId ?? existing?.iframeEncodedId,
            lastUpdated,
        };
        this.frames.set(merged.frameId, merged);
        this.updateParentRelation(merged.frameId, existing?.parentFrameId ?? null, merged.parentFrameId);
        return merged;
    }
    removeFrame(frameId) {
        const record = this.frames.get(frameId);
        if (!record)
            return;
        this.frames.delete(frameId);
        const parentChildren = this.children.get(record.parentFrameId ?? null);
        if (parentChildren) {
            this.children.set(record.parentFrameId ?? null, parentChildren.filter((id) => id !== frameId));
        }
        const index = this.frameIdToIndex.get(frameId);
        if (typeof index === "number") {
            this.frameIndexMap.delete(index);
            this.frameIdToIndex.delete(frameId);
        }
        const childIds = this.children.get(frameId) ?? [];
        this.children.delete(frameId);
        childIds.forEach((childId) => this.removeFrame(childId));
    }
    assignFrameIndex(frameId, index) {
        this.frameIndexMap.set(index, frameId);
        this.frameIdToIndex.set(frameId, index);
    }
    toJSON() {
        return {
            frames: Array.from(this.frames.values()),
            frameIndexMap: Object.fromEntries(this.frameIndexMap),
        };
    }
    clear() {
        this.frames.clear();
        this.children.clear();
        this.frameIndexMap.clear();
        this.frameIdToIndex.clear();
    }
    updateParentRelation(frameId, prevParent, nextParent) {
        if (prevParent === nextParent)
            return;
        const prevChildren = this.children.get(prevParent) ?? [];
        if (prevChildren.length) {
            this.children.set(prevParent, prevChildren.filter((id) => id !== frameId));
        }
        const list = this.children.get(nextParent) ?? [];
        if (!list.includes(frameId)) {
            list.push(frameId);
        }
        this.children.set(nextParent, list);
    }
}
exports.FrameGraph = FrameGraph;
