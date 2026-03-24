import { TaskOutput } from "../../types/agent/types";
export interface CachedActionInput {
    actionType: string;
    xpath?: string | null;
    frameIndex?: number | null;
    method?: string | null;
    arguments?: Array<string | number>;
    actionParams?: Record<string, unknown>;
}
export interface RunCachedStepParams {
    page: import("playwright-core").Page;
    instruction: string;
    cachedAction: CachedActionInput;
    maxSteps?: number;
    debug?: boolean;
    tokenLimit: number;
    llm: any;
    mcpClient: any;
    variables: Array<{
        key: string;
        value: string;
        description: string;
    }>;
    preferScriptBoundingBox?: boolean;
    cdpActionsEnabled?: boolean;
    performFallback?: (instruction: string) => Promise<TaskOutput>;
}
export declare function runCachedStep(params: RunCachedStepParams): Promise<TaskOutput>;
export declare function performGoTo(page: import("playwright-core").Page, url: string, waitUntil?: "domcontentloaded" | "load" | "networkidle"): Promise<void>;
