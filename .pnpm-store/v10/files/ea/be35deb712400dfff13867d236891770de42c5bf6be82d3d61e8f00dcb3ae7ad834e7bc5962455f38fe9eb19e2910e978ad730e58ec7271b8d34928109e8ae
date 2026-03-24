import { HyperAgentMessage } from "../types";
import type { MessageParam } from "@anthropic-ai/sdk/resources/messages/index";
/**
 * Utility functions for converting between different message formats
 */
export declare function convertToOpenAIMessages(messages: HyperAgentMessage[]): Record<string, unknown>[];
export declare function convertToAnthropicMessages(messages: HyperAgentMessage[]): {
    messages: MessageParam[];
    system: string | undefined;
};
export declare function convertToGeminiMessages(messages: HyperAgentMessage[]): {
    messages: Record<string, unknown>[];
    systemInstruction: string | undefined;
};
export declare function extractImageDataFromUrl(url: string): {
    mimeType: string;
    data: string;
};
