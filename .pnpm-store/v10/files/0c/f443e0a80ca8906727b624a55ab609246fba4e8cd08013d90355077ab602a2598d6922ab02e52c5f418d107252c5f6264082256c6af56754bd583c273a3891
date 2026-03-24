/**
 * Debug writer utility for aiAction debugging
 * Creates a debug folder structure similar to the agent task debugging
 */
export interface DebugData {
    instruction: string;
    url: string;
    timestamp: string;
    domElementCount: number;
    domTree: string;
    screenshot?: Buffer;
    foundElement?: {
        elementId: string;
        method: string;
        arguments: any[];
        xpath?: string;
    };
    availableElements?: Array<{
        id: string;
        role: string;
        label: string;
    }>;
    llmResponse?: {
        rawText: string;
        parsed: unknown;
    };
    error?: {
        message: string;
        stack?: string;
    };
    success: boolean;
    frameDebugInfo?: Array<{
        frameIndex: number;
        frameUrl: string;
        totalNodes: number;
        treeElementCount: number;
        interactiveCount: number;
        sampleNodes?: Array<{
            role?: string;
            name?: string;
            nodeId?: string;
            ignored?: boolean;
            childIds?: number;
        }>;
    }>;
}
/**
 * Initialize a new debug session
 */
export declare function initDebugSession(): string;
/**
 * Write debug data for an aiAction call
 */
export declare function writeAiActionDebug(debugData: DebugData, baseDir?: string): Promise<string>;
/**
 * Reset the action counter (useful for testing or new sessions)
 */
export declare function resetDebugSession(): void;
