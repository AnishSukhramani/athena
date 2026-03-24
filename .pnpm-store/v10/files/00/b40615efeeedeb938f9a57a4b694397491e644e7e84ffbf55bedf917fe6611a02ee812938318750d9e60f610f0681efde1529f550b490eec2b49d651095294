"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeepSeekClient = exports.createGeminiClient = exports.createAnthropicClient = exports.createOpenAIClient = void 0;
exports.createLLMClient = createLLMClient;
const openai_1 = require("./openai");
const anthropic_1 = require("./anthropic");
const gemini_1 = require("./gemini");
const deepseek_1 = require("./deepseek");
function createLLMClient(config) {
    switch (config.provider) {
        case "openai":
            return (0, openai_1.createOpenAIClient)({
                apiKey: config.apiKey,
                model: config.model,
                temperature: config.temperature,
                maxTokens: config.maxTokens,
                baseURL: config.baseURL,
            });
        case "anthropic":
            return (0, anthropic_1.createAnthropicClient)({
                apiKey: config.apiKey,
                model: config.model,
                temperature: config.temperature,
                maxTokens: config.maxTokens,
            });
        case "gemini":
            return (0, gemini_1.createGeminiClient)({
                apiKey: config.apiKey,
                model: config.model,
                temperature: config.temperature,
                maxTokens: config.maxTokens,
            });
        case "deepseek":
            return (0, deepseek_1.createDeepSeekClient)({
                apiKey: config.apiKey,
                model: config.model,
                temperature: config.temperature,
                maxTokens: config.maxTokens,
                baseURL: config.baseURL,
            });
        default:
            throw new Error(`Unsupported provider: ${config.provider}`);
    }
}
// Export individual provider creators for direct use
var openai_2 = require("./openai");
Object.defineProperty(exports, "createOpenAIClient", { enumerable: true, get: function () { return openai_2.createOpenAIClient; } });
var anthropic_2 = require("./anthropic");
Object.defineProperty(exports, "createAnthropicClient", { enumerable: true, get: function () { return anthropic_2.createAnthropicClient; } });
var gemini_2 = require("./gemini");
Object.defineProperty(exports, "createGeminiClient", { enumerable: true, get: function () { return gemini_2.createGeminiClient; } });
var deepseek_2 = require("./deepseek");
Object.defineProperty(exports, "createDeepSeekClient", { enumerable: true, get: function () { return deepseek_2.createDeepSeekClient; } });
// Export utility functions
__exportStar(require("../utils/message-converter"), exports);
__exportStar(require("../utils/schema-converter"), exports);
