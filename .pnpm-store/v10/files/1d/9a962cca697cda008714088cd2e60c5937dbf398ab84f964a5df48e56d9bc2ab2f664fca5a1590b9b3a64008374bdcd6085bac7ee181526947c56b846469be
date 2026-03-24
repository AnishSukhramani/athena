import { HyperAgentLLM, HyperAgentMessage, HyperAgentCapabilities, HyperAgentInvokeOptions, HyperAgentStructuredResult, StructuredOutputRequest, HyperAgentContentPart } from "../types";
import { z } from "zod";
export interface DeepSeekClientConfig {
    apiKey?: string;
    model: string;
    temperature?: number;
    maxTokens?: number;
    baseURL?: string;
}
export declare class DeepSeekClient implements HyperAgentLLM {
    private client;
    private model;
    private temperature;
    private maxTokens;
    constructor(config: DeepSeekClientConfig);
    getProviderId(): string;
    getModelId(): string;
    getCapabilities(): HyperAgentCapabilities;
    invoke(messages: HyperAgentMessage[], options?: HyperAgentInvokeOptions): Promise<{
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
}
export declare function createDeepSeekClient(config: DeepSeekClientConfig): DeepSeekClient;
