"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookDispatchCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_collection_client_1 = require("../base/resource_collection_client");
/**
 * Client for managing the collection of webhook dispatches.
 *
 * Webhook dispatches represent individual notifications sent by a webhook. This client provides
 * methods to list all dispatches for a specific webhook.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const webhookClient = client.webhook('my-webhook-id');
 *
 * // List all dispatches for this webhook
 * const dispatchesClient = webhookClient.dispatches();
 * const { items } = await dispatchesClient.list();
 * ```
 *
 * @see https://docs.apify.com/platform/integrations/webhooks
 */
class WebhookDispatchCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
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
     * Lists all webhook dispatches.
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
     * @returns A paginated iterator of webhook dispatches.
     * @see https://docs.apify.com/api/v2/webhook-dispatches-get
     */
    list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number.not.negative,
            offset: ow_1.default.optional.number.not.negative,
            desc: ow_1.default.optional.boolean,
        }));
        return this._listPaginated(options);
    }
}
exports.WebhookDispatchCollectionClient = WebhookDispatchCollectionClient;
//# sourceMappingURL=webhook_dispatch_collection.js.map