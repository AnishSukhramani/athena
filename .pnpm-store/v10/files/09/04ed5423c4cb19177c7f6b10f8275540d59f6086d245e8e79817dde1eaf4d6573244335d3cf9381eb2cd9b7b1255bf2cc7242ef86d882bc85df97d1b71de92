"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_collection_client_1 = require("../base/resource_collection_client");
/**
 * Client for managing the collection of Webhooks.
 *
 * Webhooks allow you to receive notifications when specific events occur in your Actors or tasks.
 * This client provides methods to list and create webhooks for specific Actors or tasks.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 *
 * // List webhooks for an Actor
 * const actorWebhooksClient = client.actor('my-actor-id').webhooks();
 * const { items } = await actorWebhooksClient.list();
 *
 * // Create a webhook
 * const newWebhook = await actorWebhooksClient.create({
 *   eventTypes: ['ACTOR.RUN.SUCCEEDED'],
 *   requestUrl: 'https://example.com/webhook'
 * });
 * ```
 *
 * @see https://docs.apify.com/platform/integrations/webhooks
 */
class WebhookCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
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
     * Lists all Webhooks.
     *
     * Awaiting the return value (as you would with a Promise) will result in a single API call. The amount of fetched
     * items in a single API call is limited.
     * ```javascript
     * const paginatedList = await client.list(options);
     * ```
     *
     * Asynchronous iteration is also supported. This will fetch additional pages if needed until all items are
     * retrieved.
     *
     * ```javascript
     * for await (const singleItem of client.list(options)) {...}
     * ```
     *
     * @param options - Pagination and sorting options.
     * @returns A paginated iterator of webhooks.
     * @see https://docs.apify.com/api/v2/webhooks-get
     */
    list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number.not.negative,
            offset: ow_1.default.optional.number.not.negative,
            desc: ow_1.default.optional.boolean,
        }));
        return this._listPaginated(options);
    }
    /**
     * Creates a new webhook.
     *
     * @param webhook - The webhook data.
     * @returns The created webhook object.
     * @see https://docs.apify.com/api/v2/webhooks-post
     */
    async create(webhook) {
        (0, ow_1.default)(webhook, ow_1.default.optional.object);
        return this._create(webhook);
    }
}
exports.WebhookCollectionClient = WebhookCollectionClient;
//# sourceMappingURL=webhook_collection.js.map