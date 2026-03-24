import { z } from "zod";
import { HyperAgentLLM, HyperAgentMessage, HyperAgentStructuredResult, HyperAgentCapabilities, StructuredOutputRequest, HyperAgentContentPart } from "../types";
export interface OpenAIClientConfig {
    apiKey?: string;
    model: string;
    temperature?: number;
    maxTokens?: number;
    baseURL?: string;
}
export declare class OpenAIClient implements HyperAgentLLM {
    private client;
    private model;
    private temperature;
    private maxTokens?;
    constructor(config: OpenAIClientConfig);
    invoke(messages: HyperAgentMessage[], options?: {
        temperature?: number;
        maxTokens?: number;
        providerOptions?: Record<string, unknown>;
    }): Promise<{
        role: "assistant";
        content: string | HyperAgentContentPart[];
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
}
export declare function createOpenAIClient(config: OpenAIClientConfig): OpenAIClient;
