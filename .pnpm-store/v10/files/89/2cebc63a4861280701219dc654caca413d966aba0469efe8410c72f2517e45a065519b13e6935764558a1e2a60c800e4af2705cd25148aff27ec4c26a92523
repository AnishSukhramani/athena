import { z } from "zod";
import { HyperAgentLLM, HyperAgentMessage, HyperAgentStructuredResult, HyperAgentCapabilities, StructuredOutputRequest } from "../types";
export interface AnthropicClientConfig {
    apiKey?: string;
    model: string;
    temperature?: number;
    maxTokens?: number;
}
export declare class AnthropicClient implements HyperAgentLLM {
    private client;
    private model;
    private temperature;
    private maxTokens;
    constructor(config: AnthropicClientConfig);
    invoke(messages: HyperAgentMessage[], options?: {
        temperature?: number;
        maxTokens?: number;
        providerOptions?: Record<string, unknown>;
    }): Promise<{
        role: "assistant";
        content: string | any[];
        toolCalls?: Array<{
            id?: string;
            name: string;
            arguments: unknown;
        }>;
        usage?: {
            inputTokens?: number;
            outputTokens?: number;
        };
    }>;
    invokeStructured<TSchema extends z.ZodTypeAny>(request: StructuredOutputRequest<TSchema>, messages: HyperAgentMessage[]): Promise<HyperAgentStructuredResult<TSchema>>;
    getProviderId(): string;
    getModelId(): string;
    getCapabilities(): HyperAgentCapabilities;
    private invokeStructuredViaTools;
    /**
     * Structured output for simple schemas (non-agent use cases like examineDom)
     * Uses the original simple tool approach with "result" wrapper
     */
    private invokeStructuredViaSimpleTool;
}
export declare function createAnthropicClient(config: AnthropicClientConfig): AnthropicClient;
