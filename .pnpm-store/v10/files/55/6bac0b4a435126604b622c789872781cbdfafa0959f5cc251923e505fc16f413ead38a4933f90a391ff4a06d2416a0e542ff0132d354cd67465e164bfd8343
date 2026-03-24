"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDebugOptions = setDebugOptions;
exports.getDebugOptions = getDebugOptions;
let currentDebugOptions = {};
let debugOptionsEnabled = false;
function setDebugOptions(options, enabled = false) {
    currentDebugOptions = options ?? {};
    debugOptionsEnabled = enabled;
}
function getDebugOptions() {
    return { ...currentDebugOptions, enabled: debugOptionsEnabled };
}
