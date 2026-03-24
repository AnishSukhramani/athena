"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnthropicClient = void 0;
exports.createAnthropicClient = createAnthropicClient;
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
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
class AnthropicClient {
    constructor(config) {
        this.client = new sdk_1.default({
            apiKey: config.apiKey || process.env.ANTHROPIC_API_KEY,
        });
        this.model = config.model;
        this.temperature = config.temperature ?? 0;
        this.maxTokens = config.maxTokens ?? 4096; // Anthropic requires explicit max_tokens
    }
    async invoke(messages, options) {
        const { messages: anthropicMessages, system } = (0, message_converter_1.convertToAnthropicMessages)(messages);
        const response = await this.client.messages.create({
            model: this.model,
            messages: anthropicMessages,
            system,
            temperature: options?.temperature ?? this.temperature,
            max_tokens: options?.maxTokens ?? this.maxTokens,
            ...options?.providerOptions,
        });
        const content = response.content[0];
        if (!content || content.type !== "text") {
            throw new Error("No text response from Anthropic");
        }
        return {
            role: "assistant",
            content: content.text,
            usage: {
                inputTokens: response.usage.input_tokens,
                outputTokens: response.usage.output_tokens,
            },
        };
    }
    async invokeStructured(request, messages) {
        const { messages: anthropicMessages, system } = (0, message_converter_1.convertToAnthropicMessages)(messages);
        // If actions are provided, use the agent-style tool calling path
        if (request.actions && request.actions.length > 0) {
            return await this.invokeStructuredViaTools(request, anthropicMessages, system);
        }
        // Otherwise, use simple tool calling for arbitrary schemas
        return await this.invokeStructuredViaSimpleTool(request, anthropicMessages, system);
    }
    getProviderId() {
        return "anthropic";
    }
    getModelId() {
        return this.model;
    }
    getCapabilities() {
        return {
            multimodal: true,
            toolCalling: true,
            jsonMode: false, // Anthropic uses tool calling for structured output
        };
    }
    async invokeStructuredViaTools(request, messages, system) {
        if (!request.actions || request.actions.length === 0) {
            throw new Error("Anthropic client requires at least one action definition");
        }
        const tools = (0, schema_converter_1.convertActionsToAnthropicTools)(request.actions);
        const toolChoice = tools.length === 1
            ? { type: "tool", name: tools[0].name }
            : { type: "any", disable_parallel_tool_use: true };
        const response = await this.client.messages.create({
            model: this.model,
            messages,
            ...(system ? { system } : {}),
            temperature: request.options?.temperature ?? this.temperature,
            max_tokens: request.options?.maxTokens ?? this.maxTokens,
            tools: tools,
            tool_choice: toolChoice,
            ...request.options?.providerOptions,
        });
        const toolContent = response.content.find((block) => block.type === "tool_use");
        if (!toolContent) {
            return {
                rawText: JSON.stringify(response.content ?? []),
                parsed: null,
            };
        }
        const actionDefinition = request.actions.find((action) => (action.toolName ?? action.type) === toolContent.name);
        if (!actionDefinition) {
            return {
                rawText: JSON.stringify(toolContent),
                parsed: null,
            };
        }
        const input = toolContent.input ?? {};
        const actionInput = input.action ?? {};
        const params = actionInput.params ?? {};
        const thoughts = input.thoughts;
        const memory = input.memory;
        let validatedParams;
        try {
            validatedParams = actionDefinition.actionParams.parse(params);
        }
        catch (error) {
            console.warn(`[LLM][Anthropic] Failed to validate params for action ${actionDefinition.type}:`, error);
            return {
                rawText: JSON.stringify(toolContent),
                parsed: null,
            };
        }
        const structuredOutput = {
            thoughts,
            memory,
            action: {
                type: actionDefinition.type,
                params: validatedParams,
            },
        };
        try {
            const validated = request.schema.parse(structuredOutput);
            return {
                rawText: JSON.stringify(toolContent),
                parsed: validated,
            };
        }
        catch (error) {
            console.warn("[LLM][Anthropic] Failed to validate structured output against schema:", error);
            return {
                rawText: JSON.stringify(toolContent),
                parsed: null,
            };
        }
    }
    /**
     * Structured output for simple schemas (non-agent use cases like examineDom)
     * Uses the original simple tool approach with "result" wrapper
     */
    async invokeStructuredViaSimpleTool(request, messages, system) {
        const tool = (0, schema_converter_1.convertToAnthropicTool)(request.schema);
        const toolChoice = (0, schema_converter_1.createAnthropicToolChoice)("structured_output");
        if (shouldDebugStructuredSchema()) {
            console.log("[LLM][Anthropic] Simple structured output tool:", JSON.stringify(tool, null, 2));
        }
        const response = await this.client.messages.create({
            model: this.model,
            messages,
            ...(system ? { system } : {}),
            temperature: request.options?.temperature ?? this.temperature,
            max_tokens: request.options?.maxTokens ?? this.maxTokens,
            tools: [tool],
            tool_choice: toolChoice,
            ...request.options?.providerOptions,
        });
        const content = response.content[0];
        if (!content || content.type !== "tool_use") {
            return {
                rawText: "",
                parsed: null,
            };
        }
        try {
            const input = content.input;
            const validated = request.schema.parse(input.result);
            return {
                rawText: JSON.stringify(input),
                parsed: validated,
            };
        }
        catch {
            return {
                rawText: JSON.stringify(content.input),
                parsed: null,
            };
        }
    }
}
exports.AnthropicClient = AnthropicClient;
function createAnthropicClient(config) {
    return new AnthropicClient(config);
}
