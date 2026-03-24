"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputerActionService = void 0;
const computer_action_1 = require("../types/computer-action");
const base_1 = require("./base");
const client_1 = require("../client");
class ComputerActionService extends base_1.BaseService {
    async executeRequest(session, params) {
        try {
            let sessionDetail;
            if (typeof session === "string") {
                sessionDetail = await this.request(`/session/${session}`);
            }
            else {
                sessionDetail = session;
            }
            if (!sessionDetail.computerActionEndpoint) {
                throw new client_1.HyperbrowserError("Computer action endpoint not available for this session", undefined);
            }
            return await this.request(sessionDetail.computerActionEndpoint, {
                method: "POST",
                body: JSON.stringify(params),
            }, undefined, true);
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError("Failed to execute computer action", undefined);
        }
    }
    async click(session, x, y, button = "left", numClicks = 1, returnScreenshot = false) {
        return this.executeRequest(session, {
            action: computer_action_1.ComputerAction.CLICK,
            x,
            y,
            button,
            numClicks,
            returnScreenshot,
        });
    }
    async typeText(session, text, returnScreenshot = false) {
        return this.executeRequest(session, {
            action: computer_action_1.ComputerAction.TYPE_TEXT,
            text,
            returnScreenshot,
        });
    }
    async screenshot(session) {
        return this.executeRequest(session, {
            action: computer_action_1.ComputerAction.SCREENSHOT,
        });
    }
    async pressKeys(session, keys, returnScreenshot = false) {
        return this.executeRequest(session, {
            action: computer_action_1.ComputerAction.PRESS_KEYS,
            keys,
            returnScreenshot,
        });
    }
    async drag(session, path, returnScreenshot = false) {
        return this.executeRequest(session, {
            action: computer_action_1.ComputerAction.DRAG,
            path,
            returnScreenshot,
        });
    }
    async moveMouse(session, x, y, returnScreenshot = false) {
        return this.executeRequest(session, {
            action: computer_action_1.ComputerAction.MOVE_MOUSE,
            x,
            y,
            returnScreenshot,
        });
    }
    async scroll(session, x, y, scrollX, scrollY, returnScreenshot = false) {
        return this.executeRequest(session, {
            action: computer_action_1.ComputerAction.SCROLL,
            x,
            y,
            scrollX,
            scrollY,
            returnScreenshot,
        });
    }
    async holdKey(session, key, duration, returnScreenshot = false) {
        return this.executeRequest(session, {
            action: computer_action_1.ComputerAction.HOLD_KEY,
            key,
            duration,
            returnScreenshot,
        });
    }
    async mouseDown(session, button = "left", returnScreenshot = false) {
        return this.executeRequest(session, {
            action: computer_action_1.ComputerAction.MOUSE_DOWN,
            button,
            returnScreenshot,
        });
    }
    async mouseUp(session, button = "left", returnScreenshot = false) {
        return this.executeRequest(session, {
            action: computer_action_1.ComputerAction.MOUSE_UP,
            button,
            returnScreenshot,
        });
    }
    async getClipboardText(session, returnScreenshot = false) {
        return this.executeRequest(session, {
            action: computer_action_1.ComputerAction.GET_CLIPBOARD_TEXT,
            returnScreenshot,
        });
    }
    async putSelectionText(session, text, returnScreenshot = false) {
        return this.executeRequest(session, {
            action: computer_action_1.ComputerAction.PUT_SELECTION_TEXT,
            text,
            returnScreenshot,
        });
    }
}
exports.ComputerActionService = ComputerActionService;
