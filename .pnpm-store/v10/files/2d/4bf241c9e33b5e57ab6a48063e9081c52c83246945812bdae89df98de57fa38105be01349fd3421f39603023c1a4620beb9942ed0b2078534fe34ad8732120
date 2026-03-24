"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookDispatchStatus = exports.WebhookDispatchClient = void 0;
const resource_client_1 = require("../base/resource_client");
/**
 * Client for managing a specific webhook dispatch.
 *
 * Webhook dispatches represent individual notifications sent by webhooks. This client provides
 * methods to retrieve details about a specific dispatch.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const webhookClient = client.webhook('my-webhook-id');
 *
 * // Get a specific dispatch
 * const dispatchClient = webhookClient.dispatches().get('dispatch-id');
 * const dispatch = await dispatchClient.get();
 * ```
 *
 * @see https://docs.apify.com/platform/integrations/webhooks
 */
class WebhookDispatchClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'webhook-dispatches',
            ...options,
        });
    }
    /**
     * Retrieves the webhook dispatch.
     *
     * @returns The webhook dispatch object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/webhook-dispatch-get
     */
    async get() {
        return this._get();
    }
}
exports.WebhookDispatchClient = WebhookDispatchClient;
var WebhookDispatchStatus;
(function (WebhookDispatchStatus) {
    WebhookDispatchStatus["Active"] = "ACTIVE";
    WebhookDispatchStatus["Succeeded"] = "SUCCEEDED";
    WebhookDispatchStatus["Failed"] = "FAILED";
})(WebhookDispatchStatus || (exports.WebhookDispatchStatus = WebhookDispatchStatus = {}));
//# sourceMappingURL=webhook_dispatch.js.map