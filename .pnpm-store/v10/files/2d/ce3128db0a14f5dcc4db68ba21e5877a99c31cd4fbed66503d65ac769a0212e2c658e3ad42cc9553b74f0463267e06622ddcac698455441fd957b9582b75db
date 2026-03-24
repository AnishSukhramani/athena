import { CompleteActionDefinition } from "./complete";
import { generateCompleteActionWithOutputDefinition } from "./complete-with-output-schema";
/**
 * Custom error class for when an action is not found in the registry
 * This helps distinguish between general errors and specifically when an action type doesn't exist
 */
export declare class ActionNotFoundError extends Error {
    constructor(actionType: string);
}
declare const DEFAULT_ACTIONS: import("../../types").AgentActionDefinition<import("zod").ZodType<any, unknown, import("zod/v4/core").$ZodTypeInternals<any, unknown>>>[];
export { DEFAULT_ACTIONS, CompleteActionDefinition, generateCompleteActionWithOutputDefinition, };
