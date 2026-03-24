"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = retry;
const sleep_1 = require("./sleep");
async function retry({ func, params, onError, }) {
    let err = null;
    const retryCount = params?.retryCount || 3;
    for (let i = 0; i < retryCount; i++) {
        try {
            const resp = await func();
            return resp;
        }
        catch (error) {
            onError?.(`Retry Attempt: ${i}`, error);
            err = error;
            await (0, sleep_1.sleep)(Math.pow(2, i) * 1000);
            continue;
        }
    }
    throw err;
}
