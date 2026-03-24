"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIClient = void 0;
exports.createOpenAIClient = createOpenAIClient;
const openai_1 = __importDefault(require("openai"));
const message_converter_1 = require("../utils/message-converter");
const schema_converter_1 = require("../utils/schema-converter");
const options_1 = require("../../debug/options");
const ENV_STRUCTURED_SCHEMA_DEBUG = process.env.HYPERAGENT_DEBUG_STRUCTURED_SCHEMA === "1" ||
    process.env.HYPERAGENT_DEBUG_STRUCTURED_SCHEMA === "true";
function shouldDebugStructuredSchema() {
    const opts = (0, options_1.getDebugOptions)();
    if (opts.enabled && typeof opts.structuredSchema === "boolean") {
        return opts.structuredSchema;
    }
    return ENV_STRUCTURED_SCHEMA_DEBUG;
}
/**
 * Convert OpenAI's content format back to HyperAgentContentPart format
 */
function convertFromOpenAIContent(content) {
    if (typeof content === "string") {
        return content;
    }
    if (Array.isArray(content)) {
        return content.map((part) => {
            if (part.type === "text") {
                return { type: "text", text: part.text };
            }
            else if (part.type === "image_url") {
                return {
                    type: "image",
                    url: part.image_url.url,
                    mimeType: "image/png", // Default, could be extracted from URL if needed
                };
            }
            else if (part.type === "tool_call") {
                return {
                    type: "tool_call",
                    toolName: part.function.name,
                    arguments: JSON.parse(part.function.arguments),
                };
            }
            // Fallback for unknown types
            return { type: "text", text: JSON.stringify(part) };
        });
    }
    // Fallback for unexpected content types
    return String(content);
}
class OpenAIClient {
    constructor(config) {
        this.client = new openai_1.default({
            apiKey: config.apiKey || process.env.OPENAI_API_KEY,
            baseURL: config.baseURL,
        });
        this.model = config.model;
        this.temperature = config.temperature ?? 0;
        this.maxTokens = config.maxTokens;
    }
    async invoke(messages, options) {
        const openAIMessages = (0, message_converter_1.convertToOpenAIMessages)(messages);
        // GPT-5 only supports temperature=1 (default), so omit temperature for this model
        const temperature = options?.temperature ?? this.temperature;
        const shouldIncludeTemperature = !this.model.startsWith("gpt-5") || temperature === 1;
        const response = await this.client.chat.completions.create({
            model: this.model,
            messages: openAIMessages,
            ...(shouldIncludeTemperature ? { temperature } : {}),
            max_tokens: options?.maxTokens ?? this.maxTokens,
            ...options?.providerOptions,
        });
        const choice = response.choices[0];
        if (!choice) {
            throw new Error("No response from OpenAI");
        }
        const message = choice.message;
        const toolCalls = message.tool_calls?.map((tc) => {
            // Handle both function and custom tool calls in OpenAI v6
            if (tc.type === "function") {
                return {
                    id: tc.id,
                    name: tc.function.name,
                    arguments: JSON.parse(tc.function.arguments),
                };
            }
            else if (tc.type === "custom") {
                return {
                    id: tc.id,
                    name: tc.custom.name,
                    arguments: JSON.parse(tc.custom.input),
                };
            }
            throw new Error(`Unknown tool call type: ${tc.type}`);
        });
        return {
            role: "assistant",
            content: convertFromOpenAIContent(message.content),
            toolCalls,
            usage: {
                inputTokens: response.usage?.prompt_tokens,
                outputTokens: response.usage?.completion_tokens,
            },
        };
    }
    async invokeStructured(request, messages) {
        const openAIMessages = (0, message_converter_1.convertToOpenAIMessages)(messages);
        const responseFormat = (0, schema_converter_1.convertToOpenAIJsonSchema)(request.schema);
        if (shouldDebugStructuredSchema()) {
            const schemaPayload = responseFormat.json_schema
                ?.schema ?? responseFormat;
            console.log("[LLM][OpenAI] Structured output schema:", JSON.stringify(schemaPayload, null, 2));
        }
        // GPT-5 only supports temperature=1 (default), so omit temperature for this model
        const temperature = request.options?.temperature ?? this.temperature;
        const shouldIncludeTemperature = !this.model.startsWith("gpt-5") || temperature === 1;
        const response = await this.client.chat.completions.create({
            model: this.model,
            messages: openAIMessages,
            ...(shouldIncludeTemperature ? { temperature } : {}),
            max_tokens: request.options?.maxTokens ?? this.maxTokens,
            response_format: responseFormat,
            ...request.options?.providerOptions,
        });
        const choice = response.choices[0];
        if (!choice) {
            throw new Error("No response from OpenAI");
        }
        const content = choice.message.content;
        if (!content || typeof content !== "string") {
            return {
                rawText: "",
                parsed: null,
            };
        }
        try {
            const parsed = JSON.parse(content);
            const validated = request.schema.parse(parsed);
            return {
                rawText: content,
                parsed: validated,
            };
        }
        catch {
            return {
                rawText: content,
                parsed: null,
            };
        }
    }
    getProviderId() {
        return "openai";
    }
    getModelId() {
        return this.model;
    }
    getCapabilities() {
        return {
            multimodal: true,
            toolCalling: true,
            jsonMode: true,
        };
    }
}
exports.OpenAIClient = OpenAIClient;
function createOpenAIClient(config) {
    return new OpenAIClient(config);
}
