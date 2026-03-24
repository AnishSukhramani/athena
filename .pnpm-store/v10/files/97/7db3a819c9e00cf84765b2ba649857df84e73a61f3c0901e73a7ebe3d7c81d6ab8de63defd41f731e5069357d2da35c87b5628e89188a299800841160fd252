"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiClient = void 0;
exports.createGeminiClient = createGeminiClient;
const genai_1 = require("@google/genai");
const message_converter_1 = require("../utils/message-converter");
const schema_converter_1 = require("../utils/schema-converter");
class GeminiClient {
    constructor(config) {
        this.client = new genai_1.GoogleGenAI({
            apiKey: config.apiKey ||
                process.env.GEMINI_API_KEY ||
                process.env.GOOGLE_API_KEY,
        });
        this.model = config.model;
        this.temperature = config.temperature ?? 0;
        this.maxTokens = config.maxTokens;
    }
    async invoke(messages, options) {
        const { messages: geminiMessages } = (0, message_converter_1.convertToGeminiMessages)(messages);
        const response = await this.client.models.generateContent({
            model: this.model,
            contents: geminiMessages,
        });
        const text = response.text;
        if (!text) {
            throw new Error("No text response from Gemini");
        }
        return {
            role: "assistant",
            content: text,
            usage: {
                inputTokens: response.usageMetadata?.promptTokenCount,
                outputTokens: response.usageMetadata?.candidatesTokenCount,
            },
        };
    }
    async invokeStructured(request, messages) {
        const { messages: geminiMessages } = (0, message_converter_1.convertToGeminiMessages)(messages);
        const responseSchema = (0, schema_converter_1.convertToGeminiResponseSchema)(request.schema);
        const response = await this.client.models.generateContent({
            model: this.model,
            contents: geminiMessages,
            config: {
                temperature: request.options?.temperature ?? this.temperature,
                maxOutputTokens: request.options?.maxTokens ?? this.maxTokens,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        const text = response.text;
        if (!text) {
            return {
                rawText: "",
                parsed: null,
            };
        }
        try {
            // Gemini returns pure JSON when using responseJsonSchema
            const parsed = JSON.parse(text);
            const validated = request.schema.parse(parsed);
            return {
                rawText: text,
                parsed: validated,
            };
        }
        catch {
            return {
                rawText: text,
                parsed: null,
            };
        }
    }
    getProviderId() {
        return "gemini";
    }
    getModelId() {
        return this.model;
    }
    getCapabilities() {
        return {
            multimodal: true,
            toolCalling: false, // Gemini has limited tool calling support
            jsonMode: true,
        };
    }
}
exports.GeminiClient = GeminiClient;
function createGeminiClient(config) {
    return new GeminiClient(config);
}
