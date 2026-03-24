"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepSeekClient = void 0;
exports.createDeepSeekClient = createDeepSeekClient;
const openai_1 = __importDefault(require("openai"));
const message_converter_1 = require("../utils/message-converter");
const schema_converter_1 = require("../utils/schema-converter");
class DeepSeekClient {
    constructor(config) {
        this.client = new openai_1.default({
            apiKey: config.apiKey ?? process.env.DEEPSEEK_API_KEY,
            baseURL: config.baseURL ?? "https://api.deepseek.com",
        });
        this.model = config.model;
        this.temperature = config.temperature ?? 0;
        this.maxTokens = config.maxTokens;
    }
    getProviderId() {
        return "deepseek";
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
    async invoke(messages, options) {
        const openAIMessages = (0, message_converter_1.convertToOpenAIMessages)(messages);
        const response = await this.client.chat.completions.create({
            model: this.model,
            messages: openAIMessages,
            temperature: options?.temperature ?? this.temperature,
            max_tokens: options?.maxTokens ?? this.maxTokens,
            ...options?.providerOptions,
        });
        const choice = response.choices[0];
        if (!choice) {
            throw new Error("No response from DeepSeek");
        }
        const content = choice.message.content || "";
        const toolCalls = choice.message.tool_calls?.map((tc) => {
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
            content: content,
            toolCalls: toolCalls,
            usage: {
                inputTokens: response.usage?.prompt_tokens,
                outputTokens: response.usage?.completion_tokens,
            },
        };
    }
    async invokeStructured(request, messages) {
        const openAIMessages = (0, message_converter_1.convertToOpenAIMessages)(messages);
        const responseFormat = (0, schema_converter_1.convertToOpenAIJsonSchema)(request.schema);
        const response = await this.client.chat.completions.create({
            model: this.model,
            messages: openAIMessages,
            temperature: request.options?.temperature ?? this.temperature,
            max_tokens: request.options?.maxTokens ?? this.maxTokens,
            response_format: responseFormat,
            ...request.options?.providerOptions,
        });
        const choice = response.choices[0];
        if (!choice) {
            throw new Error("No response from DeepSeek");
        }
        const content = choice.message.content || "";
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
}
exports.DeepSeekClient = DeepSeekClient;
function createDeepSeekClient(config) {
    return new DeepSeekClient(config);
}
