import { z } from "zod";
import { AgentActionDefinition } from "../../types/agent/actions/types";
/**
 * Utility functions for converting Zod schemas to provider-specific formats
 */
export declare function convertToOpenAIJsonSchema(schema: z.ZodTypeAny): Record<string, unknown>;
/**
 * Convert a simple Zod schema to an Anthropic tool (for non-agent use cases)
 * Wraps the schema in a "result" field for consistent parsing
 */
export declare function convertToAnthropicTool(schema: z.ZodTypeAny): Record<string, unknown>;
/**
 * Create tool choice object for Anthropic
 */
export declare function createAnthropicToolChoice(toolName: string): Record<string, unknown>;
export declare function convertActionsToAnthropicTools(actions: AgentActionDefinition[]): Array<Record<string, unknown>>;
/**
 * Convert Zod schema to Gemini's OpenAPI 3.0 Schema format
 * Gemini requires: uppercase types, propertyOrdering, no empty objects
 */
export declare function convertToGeminiResponseSchema(schema: z.ZodTypeAny): Record<string, unknown>;
