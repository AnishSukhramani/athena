"use strict";
/**
 * Types for accessibility tree extraction using Chrome DevTools Protocol
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ID_PATTERN = exports.STRUCTURAL_ROLES = exports.INTERACTIVE_ROLES = void 0;
exports.isEncodedId = isEncodedId;
exports.toEncodedId = toEncodedId;
exports.asEncodedId = asEncodedId;
/**
 * Interactive roles that should be included in the accessibility tree
 * Based on ARIA roles and common interactive elements
 */
exports.INTERACTIVE_ROLES = new Set([
    "button",
    "link",
    "textbox",
    "searchbox",
    "combobox",
    "listbox",
    "option",
    "checkbox",
    "radio",
    "radiogroup",
    "switch",
    "tab",
    "tablist",
    "menu",
    "menubar",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "slider",
    "spinbutton",
    "grid",
    "gridcell",
    "tree",
    "treeitem",
    "row",
    "cell",
    "columnheader",
    "rowheader",
    "heading",
    "img",
    "figure",
]);
/**
 * Structural roles to replace with tag names
 */
exports.STRUCTURAL_ROLES = new Set(["generic", "none", "StaticText"]);
/**
 * Pattern to validate encoded IDs (frameIndex-nodeIndex)
 */
exports.ID_PATTERN = /^\d+-\d+$/;
/**
 * Type guard to check if a string is a valid EncodedId
 */
function isEncodedId(id) {
    return exports.ID_PATTERN.test(id);
}
/**
 * Type assertion to convert string to EncodedId with validation
 * @throws Error if the string is not a valid EncodedId format
 */
function toEncodedId(id) {
    if (!isEncodedId(id)) {
        throw new Error(`Invalid EncodedId format: "${id}". Expected format: "number-number"`);
    }
    return id;
}
/**
 * Safe conversion that returns undefined if invalid
 */
function asEncodedId(id) {
    return isEncodedId(id) ? id : undefined;
}
