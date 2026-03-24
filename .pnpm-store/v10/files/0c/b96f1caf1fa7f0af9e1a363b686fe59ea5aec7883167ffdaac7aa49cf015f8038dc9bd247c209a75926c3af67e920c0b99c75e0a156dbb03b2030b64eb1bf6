"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTION_DESCRIPTIONS = exports.AIACTION_ALLOWED_ACTIONS = exports.AGENT_ELEMENT_ACTIONS = void 0;
/**
 * Actions allowed for agent-driven element interactions (actElement)
 * These are the Playwright methods that the executeTask agent can use
 *
 * Agent actions use fewer retries (3) because the agent loop itself
 * provides higher-level retry and error recovery logic.
 *
 * Currently uses the same action set as aiAction.
 */
exports.AGENT_ELEMENT_ACTIONS = [
    // Click actions
    "click",
    // Input actions
    "fill", // Clear and fill input
    "type", // Type character by character
    "press", // Press keyboard key
    // Selection actions
    "selectOptionFromDropdown", // For <select> elements
    // Checkbox actions
    "check",
    "uncheck",
    // Hover action
    "hover",
    // Scroll actions
    "scrollToElement", // Scroll until the element is visible
    "scrollToPercentage", // Scroll container/page to a percentage position
    "nextChunk", // Scroll down one viewport
    "prevChunk", // Scroll up one viewport
];
/**
 * Actions allowed for aiAction (executeSingleAction)
 * Mirrors AGENT_ELEMENT_ACTIONS because both flows support the same action set.
 */
exports.AIACTION_ALLOWED_ACTIONS = exports.AGENT_ELEMENT_ACTIONS;
/**
 * Action descriptions for documentation and prompts
 * Maps each action to its description and example usage
 */
exports.ACTION_DESCRIPTIONS = {
    click: {
        arguments: "none",
        description: "Click on an element",
        example: 'click the Login button',
    },
    fill: {
        arguments: "text: string",
        description: "Fill input (clears first)",
        example: "fill 'john@example.com' into email field",
    },
    type: {
        arguments: "text: string",
        description: "Type character by character",
        example: "type 'search query' into search box",
    },
    press: {
        arguments: "key: string",
        description: "Press keyboard key",
        example: "press Enter",
    },
    selectOptionFromDropdown: {
        arguments: "option: string",
        description: "Select from <select>",
        example: "select 'California' from state dropdown",
    },
    check: {
        arguments: "none",
        description: "Check a checkbox",
        example: "check the terms checkbox",
    },
    uncheck: {
        arguments: "none",
        description: "Uncheck a checkbox",
        example: "uncheck the newsletter checkbox",
    },
    hover: {
        arguments: "none",
        description: "Hover over element",
        example: "hover over profile menu",
    },
    scrollToElement: {
        arguments: "none",
        description: "Scroll element into view",
        example: "scroll to the pricing section",
    },
    scrollToPercentage: {
        arguments: "position: string",
        description: "Scroll to a specific percentage",
        example: "scroll to 50%",
    },
    nextChunk: {
        arguments: "none",
        description: "Scroll down one viewport",
        example: "scroll down one page",
    },
    prevChunk: {
        arguments: "none",
        description: "Scroll up one viewport",
        example: "scroll up one page",
    },
};
