"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
const webhook_dispatch_collection_1 = require("./webhook_dispatch_collection");
/**
 * Client for managing a specific webhook.
 *
 * Webhooks allow you to receive notifications when specific events occur in your Actors or tasks.
 * This client provides methods to get, update, delete, and test webhooks, as well as retrieve
 * webhook dispatches.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const webhookClient = client.webhook('my-webhook-id');
 *
 * // Get webhook details
 * const webhook = await webhookClient.get();
 *
 * // Update webhook
 * await webhookClient.update({
 *   isEnabled: true,
 *   eventTypes: ['ACTOR.RUN.SUCCEEDED'],
 *   requestUrl: 'https://example.com/webhook'
 * });
 *
 * // Test webhook
 * await webhookClient.test();
 * ```
 *
 * @see https://docs.apify.com/platform/integrations/webhooks
 */
class WebhookClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'webhooks',
            ...options,
        });
    }
    /**
     * Retrieves the webhook.
     *
     * @returns The webhook object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/webhook-get
     */
    async get() {
        return this._get();
    }
    /**
     * Updates the webhook with the specified fields.
     *
     * @param newFields - Fields to update.
     * @returns The updated webhook object.
     * @see https://docs.apify.com/api/v2/webhook-put
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * Deletes the webhook.
     *
     * @see https://docs.apify.com/api/v2/webhook-delete
     */
    async delete() {
        return this._delete();
    }
    /**
     * Tests the webhook by dispatching a test event.
     *
     * @returns The webhook dispatch object, or `undefined` if the test fails.
     * @see https://docs.apify.com/api/v2/webhook-test-post
     */
    async test() {
        const request = {
            url: this._url('test'),
            method: 'POST',
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(request);
            return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * Returns a client for the dispatches of this webhook.
     *
     * @returns A client for the webhook's dispatches.
     * @see https://docs.apify.com/api/v2/webhook-webhook-dispatches-get
     */
    dispatches() {
        return new webhook_dispatch_collection_1.WebhookDispatchCollectionClient(this._subResourceOptions({
            resourcePath: 'dispatches',
        }));
    }
}
exports.WebhookClient = WebhookClient;
//# sourceMappingURL=webhook.js.map