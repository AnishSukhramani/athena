/**
 * Action restrictions for element interactions
 * Defines which Playwright methods are allowed for different contexts
 */
export type AiActionAllowedAction = (typeof AIACTION_ALLOWED_ACTIONS)[number];
/**
 * Actions allowed for agent-driven element interactions (actElement)
 * These are the Playwright methods that the executeTask agent can use
 *
 * Agent actions use fewer retries (3) because the agent loop itself
 * provides higher-level retry and error recovery logic.
 *
 * Currently uses the same action set as aiAction.
 */
export declare const AGENT_ELEMENT_ACTIONS: readonly ["click", "fill", "type", "press", "selectOptionFromDropdown", "check", "uncheck", "hover", "scrollToElement", "scrollToPercentage", "nextChunk", "prevChunk"];
/**
 * Actions allowed for aiAction (executeSingleAction)
 * Mirrors AGENT_ELEMENT_ACTIONS because both flows support the same action set.
 */
export declare const AIACTION_ALLOWED_ACTIONS: readonly ["click", "fill", "type", "press", "selectOptionFromDropdown", "check", "uncheck", "hover", "scrollToElement", "scrollToPercentage", "nextChunk", "prevChunk"];
export type AgentElementAction = (typeof AGENT_ELEMENT_ACTIONS)[number];
/**
 * Action descriptions for documentation and prompts
 * Maps each action to its description and example usage
 */
export declare const ACTION_DESCRIPTIONS: {
    readonly click: {
        readonly arguments: "none";
        readonly description: "Click on an element";
        readonly example: "click the Login button";
    };
    readonly fill: {
        readonly arguments: "text: string";
        readonly description: "Fill input (clears first)";
        readonly example: "fill 'john@example.com' into email field";
    };
    readonly type: {
        readonly arguments: "text: string";
        readonly description: "Type character by character";
        readonly example: "type 'search query' into search box";
    };
    readonly press: {
        readonly arguments: "key: string";
        readonly description: "Press keyboard key";
        readonly example: "press Enter";
    };
    readonly selectOptionFromDropdown: {
        readonly arguments: "option: string";
        readonly description: "Select from <select>";
        readonly example: "select 'California' from state dropdown";
    };
    readonly check: {
        readonly arguments: "none";
        readonly description: "Check a checkbox";
        readonly example: "check the terms checkbox";
    };
    readonly uncheck: {
        readonly arguments: "none";
        readonly description: "Uncheck a checkbox";
        readonly example: "uncheck the newsletter checkbox";
    };
    readonly hover: {
        readonly arguments: "none";
        readonly description: "Hover over element";
        readonly example: "hover over profile menu";
    };
    readonly scrollToElement: {
        readonly arguments: "none";
        readonly description: "Scroll element into view";
        readonly example: "scroll to the pricing section";
    };
    readonly scrollToPercentage: {
        readonly arguments: "position: string";
        readonly description: "Scroll to a specific percentage";
        readonly example: "scroll to 50%";
    };
    readonly nextChunk: {
        readonly arguments: "none";
        readonly description: "Scroll down one viewport";
        readonly example: "scroll down one page";
    };
    readonly prevChunk: {
        readonly arguments: "none";
        readonly description: "Scroll up one viewport";
        readonly example: "scroll up one page";
    };
};
