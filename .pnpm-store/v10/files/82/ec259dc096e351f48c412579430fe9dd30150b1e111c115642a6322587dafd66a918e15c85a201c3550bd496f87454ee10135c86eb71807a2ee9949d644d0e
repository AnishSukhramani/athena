"use strict";
/**
 * Debug writer utility for aiAction debugging
 * Creates a debug folder structure similar to the agent task debugging
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDebugSession = initDebugSession;
exports.writeAiActionDebug = writeAiActionDebug;
exports.resetDebugSession = resetDebugSession;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let actionCounter = 0;
let sessionId = null;
/**
 * Initialize a new debug session
 */
function initDebugSession() {
    sessionId = new Date().toISOString().replace(/[:.]/g, '-');
    actionCounter = 0;
    return sessionId;
}
/**
 * Get current session ID (create one if doesn't exist)
 */
function getSessionId() {
    if (!sessionId) {
        sessionId = initDebugSession();
    }
    return sessionId;
}
/**
 * Write debug data for an aiAction call
 */
async function writeAiActionDebug(debugData, baseDir = 'debug/aiAction') {
    const session = getSessionId();
    const actionNum = actionCounter++;
    const debugDir = path_1.default.join(baseDir, session, `action-${actionNum}`);
    // Create debug directory
    fs_1.default.mkdirSync(debugDir, { recursive: true });
    // Write instruction and metadata
    const metadata = {
        actionNumber: actionNum,
        timestamp: debugData.timestamp,
        instruction: debugData.instruction,
        url: debugData.url,
        domElementCount: debugData.domElementCount,
        success: debugData.success,
    };
    fs_1.default.writeFileSync(path_1.default.join(debugDir, 'metadata.json'), JSON.stringify(metadata, null, 2));
    // Write DOM tree
    fs_1.default.writeFileSync(path_1.default.join(debugDir, 'dom-tree.txt'), debugData.domTree);
    // Write screenshot if available
    if (debugData.screenshot) {
        fs_1.default.writeFileSync(path_1.default.join(debugDir, 'screenshot.png'), debugData.screenshot);
    }
    // Write found element info
    if (debugData.foundElement) {
        fs_1.default.writeFileSync(path_1.default.join(debugDir, 'found-element.json'), JSON.stringify(debugData.foundElement, null, 2));
    }
    // Write LLM response if available
    if (debugData.llmResponse) {
        fs_1.default.writeFileSync(path_1.default.join(debugDir, 'llm-response.json'), JSON.stringify(debugData.llmResponse, null, 2));
        // Also write just the raw text for easy viewing
        fs_1.default.writeFileSync(path_1.default.join(debugDir, 'llm-response.txt'), debugData.llmResponse.rawText);
    }
    // Write available elements if provided (for debugging failures)
    if (debugData.availableElements) {
        const elementsText = debugData.availableElements
            .map((e) => `[${e.id}] ${e.role}: "${e.label}"`)
            .join('\n');
        fs_1.default.writeFileSync(path_1.default.join(debugDir, 'available-elements.txt'), elementsText);
        fs_1.default.writeFileSync(path_1.default.join(debugDir, 'available-elements.json'), JSON.stringify(debugData.availableElements, null, 2));
    }
    // Write error if present
    if (debugData.error) {
        fs_1.default.writeFileSync(path_1.default.join(debugDir, 'error.json'), JSON.stringify(debugData.error, null, 2));
    }
    // Write frame debug info if available
    if (debugData.frameDebugInfo && debugData.frameDebugInfo.length > 0) {
        fs_1.default.writeFileSync(path_1.default.join(debugDir, 'frame-debug-info.json'), JSON.stringify(debugData.frameDebugInfo, null, 2));
        // Also write a human-readable summary
        const frameSummary = debugData.frameDebugInfo
            .map((frame) => {
            const lines = [
                `Frame ${frame.frameIndex}: ${frame.frameUrl}`,
                `  Total Nodes: ${frame.totalNodes}`,
                `  Tree Elements: ${frame.treeElementCount}`,
                `  Interactive Elements: ${frame.interactiveCount}`,
            ];
            if (frame.sampleNodes && frame.sampleNodes.length > 0) {
                lines.push(`  Sample Nodes (${frame.sampleNodes.length}):`);
                frame.sampleNodes.forEach((node, idx) => {
                    const ignored = node.ignored ? ' [IGNORED]' : '';
                    const role = node.role || 'unknown';
                    const name = node.name ? ` "${node.name}"` : '';
                    const childCount = node.childIds ? ` (${node.childIds} children)` : '';
                    lines.push(`    ${idx + 1}. ${role}${name}${childCount}${ignored}`);
                });
            }
            return lines.join('\n');
        })
            .join('\n\n');
        fs_1.default.writeFileSync(path_1.default.join(debugDir, 'frame-debug-summary.txt'), frameSummary);
    }
    return debugDir;
}
/**
 * Reset the action counter (useful for testing or new sessions)
 */
function resetDebugSession() {
    actionCounter = 0;
    sessionId = null;
}
