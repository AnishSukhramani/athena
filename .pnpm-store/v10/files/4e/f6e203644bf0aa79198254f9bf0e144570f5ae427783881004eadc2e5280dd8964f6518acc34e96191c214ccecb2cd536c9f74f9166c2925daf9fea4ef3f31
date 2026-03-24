import { ActionContext, ActionOutput } from "../../../types";
export interface PerformActionParams {
    elementId: string;
    method: string;
    arguments?: string[];
    instruction: string;
    confidence?: number;
}
/**
 * Performs a single action on an element
 * Consolidates logic for choosing between CDP and Playwright execution paths
 */
export declare function performAction(ctx: ActionContext, params: PerformActionParams): Promise<ActionOutput>;
