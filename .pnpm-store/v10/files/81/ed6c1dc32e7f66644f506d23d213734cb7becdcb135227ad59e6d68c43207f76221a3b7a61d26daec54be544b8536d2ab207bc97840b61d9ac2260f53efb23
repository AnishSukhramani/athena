"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCompleteActionWithOutputDefinition = exports.CompleteActionDefinition = exports.DEFAULT_ACTIONS = exports.ActionNotFoundError = void 0;
const go_to_url_1 = require("./go-to-url");
const complete_1 = require("./complete");
Object.defineProperty(exports, "CompleteActionDefinition", { enumerable: true, get: function () { return complete_1.CompleteActionDefinition; } });
const complete_with_output_schema_1 = require("./complete-with-output-schema");
Object.defineProperty(exports, "generateCompleteActionWithOutputDefinition", { enumerable: true, get: function () { return complete_with_output_schema_1.generateCompleteActionWithOutputDefinition; } });
const extract_1 = require("./extract");
const refresh_page_1 = require("./refresh-page");
const pdf_1 = require("./pdf");
const act_element_1 = require("./act-element");
const wait_1 = require("./wait");
/**
 * Custom error class for when an action is not found in the registry
 * This helps distinguish between general errors and specifically when an action type doesn't exist
 */
class ActionNotFoundError extends Error {
    constructor(actionType) {
        super(`Action type "${actionType}" not found in the action registry`);
        this.name = "ActionNotFoundError";
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ActionNotFoundError);
        }
    }
}
exports.ActionNotFoundError = ActionNotFoundError;
const DEFAULT_ACTIONS = [
    // Navigation actions
    go_to_url_1.GoToURLActionDefinition,
    // PageBackActionDefinition,
    // PageForwardActionDefinition,
    refresh_page_1.RefreshPageActionDefinition,
    // Element interaction (natural language)
    act_element_1.ActElementActionDefinition,
    // Other actions
    extract_1.ExtractActionDefinition,
    // ThinkingActionDefinition, // Disabled: agents waste steps thinking instead of acting; thoughts field already provides reasoning
    wait_1.WaitActionDefinition,
];
exports.DEFAULT_ACTIONS = DEFAULT_ACTIONS;
if (process.env.GEMINI_API_KEY) {
    DEFAULT_ACTIONS.push(pdf_1.PDFActionDefinition);
}
