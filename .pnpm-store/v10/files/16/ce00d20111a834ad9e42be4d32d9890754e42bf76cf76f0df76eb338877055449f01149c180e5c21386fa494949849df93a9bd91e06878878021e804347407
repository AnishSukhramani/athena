import { HyperAgentLLM } from "../types";
export type LLMProvider = "openai" | "anthropic" | "gemini" | "deepseek";
export interface LLMConfig {
    provider: LLMProvider;
    apiKey?: string;
    model: string;
    temperature?: number;
    maxTokens?: number;
    baseURL?: string;
}
export declare function createLLMClient(config: LLMConfig): HyperAgentLLM;
export { createOpenAIClient } from "./openai";
export { createAnthropicClient } from "./anthropic";
export { createGeminiClient } from "./gemini";
export { createDeepSeekClient } from "./deepseek";
export type { HyperAgentLLM } from "../types";
export * from "../utils/message-converter";
export * from "../utils/schema-converter";
