"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToOpenAIJsonSchema = convertToOpenAIJsonSchema;
exports.convertToAnthropicTool = convertToAnthropicTool;
exports.createAnthropicToolChoice = createAnthropicToolChoice;
exports.convertActionsToAnthropicTools = convertActionsToAnthropicTools;
exports.convertToGeminiResponseSchema = convertToGeminiResponseSchema;
const zod_1 = require("zod");
/**
 * Utility functions for converting Zod schemas to provider-specific formats
 */
function convertToOpenAIJsonSchema(schema) {
    const jsonSchema = zod_1.z.toJSONSchema(schema, {
        target: "draft-7",
        io: "output",
    });
    return {
        type: "json_schema",
        json_schema: {
            name: "structured_output",
            strict: true,
            schema: jsonSchema,
        },
    };
}
const THOUGHTS_DESCRIPTION = "Your reasoning about the current state and what needs to be done next based on the task goal and previous actions.";
const MEMORY_DESCRIPTION = "A summary of successful actions completed so far and key state changes (e.g., 'Clicked login button -> login form appeared').";
/**
 * Convert a simple Zod schema to an Anthropic tool (for non-agent use cases)
 * Wraps the schema in a "result" field for consistent parsing
 */
function convertToAnthropicTool(schema) {
    const jsonSchema = zod_1.z.toJSONSchema(schema, {
        target: "draft-7",
        io: "output",
    });
    return {
        name: "structured_output",
        description: "Generate structured output according to the provided schema",
        input_schema: {
            type: "object",
            properties: {
                result: jsonSchema,
            },
            required: ["result"],
        },
    };
}
/**
 * Create tool choice object for Anthropic
 */
function createAnthropicToolChoice(toolName) {
    return {
        type: "tool",
        name: toolName,
    };
}
function convertActionsToAnthropicTools(actions) {
    return actions.map((action) => {
        const paramsSchema = zod_1.z.toJSONSchema(action.actionParams, {
            target: "draft-4",
            io: "output",
        });
        // Create enhanced description with structure example
        const baseDescription = action.toolDescription ?? action.actionParams.description;
        const enhancedDescription = `${baseDescription}

IMPORTANT: Response must have this exact structure:
{
  "thoughts": "your reasoning",
  "memory": "summary of actions",
  "action": {
    "type": "${action.type}",
    "params": { ...action parameters here... }
  }
}

Do NOT put params directly at root level. They MUST be nested inside action.params.`;
        return {
            name: action.toolName ?? action.type,
            description: enhancedDescription,
            input_schema: {
                type: "object",
                additionalProperties: false,
                properties: {
                    thoughts: {
                        type: "string",
                        description: THOUGHTS_DESCRIPTION,
                    },
                    memory: {
                        type: "string",
                        description: MEMORY_DESCRIPTION,
                    },
                    action: {
                        type: "object",
                        description: `The action object. MUST contain 'type' field set to "${action.type}" and 'params' field with the action parameters.`,
                        additionalProperties: false,
                        properties: {
                            type: {
                                type: "string",
                                const: action.type,
                                description: `Must be exactly "${action.type}"`,
                            },
                            params: {
                                ...paramsSchema,
                                description: `Parameters for the ${action.type} action. These must be nested here, not at the root level.`,
                            },
                        },
                        required: ["type", "params"],
                    },
                },
                required: ["thoughts", "memory", "action"],
            },
        };
    });
}
/**
 * Convert Zod schema to Gemini's OpenAPI 3.0 Schema format
 * Gemini requires: uppercase types, propertyOrdering, no empty objects
 */
function convertToGeminiResponseSchema(schema) {
    const jsonSchema = zod_1.z.toJSONSchema(schema, {
        target: "draft-7",
        io: "output",
    });
    return convertJsonSchemaToGemini(jsonSchema);
}
/**
 * Recursively convert JSON Schema to Gemini's OpenAPI 3.0 format
 */
function convertJsonSchemaToGemini(jsonSchema) {
    const result = {};
    // Map JSON Schema type to Gemini type (uppercase)
    if (jsonSchema.type) {
        const type = jsonSchema.type;
        result.type = type.toUpperCase();
    }
    // Handle object properties
    if (jsonSchema.properties && typeof jsonSchema.properties === "object") {
        const properties = jsonSchema.properties;
        // If properties is empty, Gemini rejects it - skip the entire object by returning null placeholder
        if (Object.keys(properties).length === 0) {
            return {
                type: "OBJECT",
                properties: {
                    _placeholder: {
                        type: "STRING",
                        description: "Empty object placeholder",
                        nullable: true,
                    },
                },
                propertyOrdering: ["_placeholder"],
                required: [],
            };
        }
        const convertedProps = {};
        for (const [key, value] of Object.entries(properties)) {
            convertedProps[key] = convertJsonSchemaToGemini(value);
        }
        result.properties = convertedProps;
        result.propertyOrdering = Object.keys(properties);
    }
    // Handle array items
    if (jsonSchema.items) {
        result.items = convertJsonSchemaToGemini(jsonSchema.items);
    }
    // Handle union types (anyOf, oneOf)
    if (jsonSchema.anyOf && Array.isArray(jsonSchema.anyOf)) {
        result.anyOf = jsonSchema.anyOf.map((schema) => convertJsonSchemaToGemini(schema));
    }
    if (jsonSchema.oneOf && Array.isArray(jsonSchema.oneOf)) {
        result.oneOf = jsonSchema.oneOf.map((schema) => convertJsonSchemaToGemini(schema));
    }
    // Pass through supported fields
    if (jsonSchema.required)
        result.required = jsonSchema.required;
    if (jsonSchema.description)
        result.description = jsonSchema.description;
    if (jsonSchema.enum)
        result.enum = jsonSchema.enum;
    // Convert JSON Schema "const" to "enum" for Gemini
    if (jsonSchema.const !== undefined) {
        result.enum = [jsonSchema.const];
    }
    if (jsonSchema.format)
        result.format = jsonSchema.format;
    if (jsonSchema.minimum !== undefined)
        result.minimum = jsonSchema.minimum;
    if (jsonSchema.maximum !== undefined)
        result.maximum = jsonSchema.maximum;
    if (jsonSchema.minItems !== undefined)
        result.minItems = jsonSchema.minItems;
    if (jsonSchema.maxItems !== undefined)
        result.maxItems = jsonSchema.maxItems;
    if (jsonSchema.nullable !== undefined)
        result.nullable = jsonSchema.nullable;
    return result;
}
