"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoundingBox = getBoundingBox;
// Track which domains have been enabled per session
const enabledDomains = new WeakMap();
async function ensureDomainEnabled(session, domain) {
    let enabled = enabledDomains.get(session);
    if (!enabled) {
        enabled = new Set();
        enabledDomains.set(session, enabled);
    }
    if (enabled.has(domain))
        return;
    try {
        await session.send(`${domain}.enable`);
        enabled.add(domain);
    }
    catch (error) {
        console.warn(`[CDP][BoundingBox] Failed to enable ${domain} domain:`, error);
    }
}
async function getBoundingBoxFromScript(session, backendNodeId, xpath) {
    try {
        await ensureDomainEnabled(session, "Runtime");
        const payload = JSON.stringify({ [xpath]: backendNodeId });
        const expression = `(() => {
      if (typeof window.__hyperagent_collectBoundingBoxesByXPath !== "function") {
        return null;
      }
      const result = window.__hyperagent_collectBoundingBoxesByXPath(${payload});
      return result && result["${backendNodeId}"] ? result["${backendNodeId}"] : null;
    })()`;
        const response = await session.send("Runtime.evaluate", {
            expression,
            returnByValue: true,
        });
        const value = response.result?.value;
        if (!value || typeof value !== "object") {
            return null;
        }
        const { x, y, width, height, top, left, right, bottom } = value;
        if ([x, y, width, height, top, left, right, bottom].some((n) => typeof n !== "number")) {
            return null;
        }
        return {
            x,
            y,
            width,
            height,
            top,
            left,
            right,
            bottom,
        };
    }
    catch {
        return null;
    }
}
async function getBoundingBoxFromQuads(session, backendNodeId) {
    try {
        await ensureDomainEnabled(session, "DOM");
        const response = await session.send("DOM.getContentQuads", { backendNodeId });
        const quad = response.quads?.[0];
        if (!quad)
            return null;
        const xs = [quad[0], quad[2], quad[4], quad[6]];
        const ys = [quad[1], quad[3], quad[5], quad[7]];
        const left = Math.min(...xs);
        const right = Math.max(...xs);
        const top = Math.min(...ys);
        const bottom = Math.max(...ys);
        return {
            x: left,
            y: top,
            width: right - left,
            height: bottom - top,
            top,
            left,
            right,
            bottom,
        };
    }
    catch (error) {
        console.warn("[CDP][BoundingBox] Failed to get content quads:", error);
        return null;
    }
}
async function getBoundingBox(options) {
    const { session, backendNodeId, xpath, preferScript } = options;
    if (preferScript && xpath) {
        const scriptResult = await getBoundingBoxFromScript(session, backendNodeId, xpath);
        if (scriptResult) {
            return scriptResult;
        }
    }
    return getBoundingBoxFromQuads(session, backendNodeId);
}
