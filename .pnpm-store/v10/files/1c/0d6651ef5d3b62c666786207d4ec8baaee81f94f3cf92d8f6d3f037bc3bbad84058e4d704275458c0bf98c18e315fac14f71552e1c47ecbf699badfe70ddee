import type { Page } from "playwright-core";
import type { A11yDOMState } from "./types";
/**
 * Very early skeleton cache for DOM snapshots. The goal is to avoid recomputing
 * the full accessibility tree when nothing has changed. The invalidation hooks
 * (actions, navigations, explicit page events) will be wired in subsequent steps.
 */
declare class DomSnapshotCache {
    private readonly entries;
    private readonly versions;
    private readonly dirty;
    get(page: Page): A11yDOMState | null;
    set(page: Page, state: A11yDOMState): void;
    invalidate(page: Page): void;
}
export declare const domSnapshotCache: DomSnapshotCache;
export declare function markDomSnapshotDirty(page: Page): void;
export {};
