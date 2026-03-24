"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.domSnapshotCache = void 0;
exports.markDomSnapshotDirty = markDomSnapshotDirty;
const MAX_CACHE_AGE_MS = 1000;
/**
 * Very early skeleton cache for DOM snapshots. The goal is to avoid recomputing
 * the full accessibility tree when nothing has changed. The invalidation hooks
 * (actions, navigations, explicit page events) will be wired in subsequent steps.
 */
class DomSnapshotCache {
    constructor() {
        this.entries = new WeakMap();
        this.versions = new WeakMap();
        this.dirty = new WeakSet();
    }
    get(page) {
        if (this.dirty.has(page)) {
            return null;
        }
        const entry = this.entries.get(page);
        if (!entry) {
            return null;
        }
        if (Date.now() - entry.timestamp > MAX_CACHE_AGE_MS) {
            this.invalidate(page);
            return null;
        }
        return entry.state;
    }
    set(page, state) {
        const version = (this.versions.get(page) ?? 0) + 1;
        this.versions.set(page, version);
        this.entries.set(page, {
            state,
            timestamp: Date.now(),
            version,
        });
        this.dirty.delete(page);
    }
    invalidate(page) {
        this.entries.delete(page);
        const version = (this.versions.get(page) ?? 0) + 1;
        this.versions.set(page, version);
        this.dirty.add(page);
    }
}
exports.domSnapshotCache = new DomSnapshotCache();
function markDomSnapshotDirty(page) {
    exports.domSnapshotCache.invalidate(page);
}
