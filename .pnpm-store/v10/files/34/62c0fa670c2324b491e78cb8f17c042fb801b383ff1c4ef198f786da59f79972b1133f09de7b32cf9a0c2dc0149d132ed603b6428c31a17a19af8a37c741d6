"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAgentStepMessages = void 0;
const utils_1 = require("./utils");
const retry_1 = require("../../utils/retry");
const buildAgentStepMessages = async (baseMessages, steps, task, page, domState, screenshot, variables) => {
    const messages = [...baseMessages];
    // Add the final goal section
    messages.push({
        role: "user",
        content: `=== Final Goal ===\n${task}\n`,
    });
    // Add current URL section
    messages.push({
        role: "user",
        content: `=== Current URL ===\n${page.url()}\n`,
    });
    // Add variables section
    messages.push({
        role: "user",
        content: `=== Variables ===\n${variables.map((v) => `<<${v.key}>> - ${v.description}`).join("\n")}\n`,
    });
    // Add previous actions section if there are steps
    if (steps.length > 0) {
        messages.push({
            role: "user",
            content: "=== Previous Actions ===\n",
        });
        for (const step of steps) {
            const { thoughts, memory, action } = step.agentOutput;
            messages.push({
                role: "assistant",
                content: `Thoughts: ${thoughts}\nMemory: ${memory}\nAction: ${JSON.stringify(action)}`,
            });
            const actionResult = step.actionOutput;
            messages.push({
                role: "user",
                content: actionResult.extract
                    ? `${actionResult.message} :\n ${JSON.stringify(actionResult.extract)}`
                    : actionResult.message,
            });
        }
    }
    // Add elements section with DOM tree
    messages.push({
        role: "user",
        content: `=== Elements ===\n${domState.domState}\n`,
    });
    // Add page screenshot section (only if screenshot is available)
    if (screenshot) {
        const scrollInfo = await (0, retry_1.retry)({ func: () => (0, utils_1.getScrollInfo)(page) });
        messages.push({
            role: "user",
            content: [
                {
                    type: "text",
                    text: "=== Page Screenshot ===\n",
                },
                {
                    type: "image",
                    url: `data:image/png;base64,${screenshot}`,
                    mimeType: "image/png",
                },
                {
                    type: "text",
                    text: `=== Page State ===\nPixels above: ${scrollInfo[0]}\nPixels below: ${scrollInfo[1]}\n`,
                },
            ],
        });
    }
    return messages;
};
exports.buildAgentStepMessages = buildAgentStepMessages;
