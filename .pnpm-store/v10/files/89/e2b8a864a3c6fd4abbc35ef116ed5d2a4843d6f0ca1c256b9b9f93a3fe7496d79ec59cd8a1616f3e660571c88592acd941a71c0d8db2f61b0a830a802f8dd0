"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestQueueCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const consts_1 = require("@apify/consts");
const resource_collection_client_1 = require("../base/resource_collection_client");
/**
 * Client for managing the collection of Request queues in your account.
 *
 * Request queues store URLs to be crawled and their metadata. This client provides methods
 * to list, create, or get request queues by name.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const queuesClient = client.requestQueues();
 *
 * // List all request queues
 * const { items } = await queuesClient.list();
 *
 * // Get or create a request queue by name
 * const queue = await queuesClient.getOrCreate('my-queue');
 * ```
 *
 * @see https://docs.apify.com/platform/storage/request-queue
 */
class RequestQueueCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'request-queues',
            ...options,
        });
    }
    /**
     * Lists all Request queues.
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
     * @param options - Pagination options.
     * @returns A paginated iterator of Request queues.
     * @see https://docs.apify.com/api/v2/request-queues-get
     */
    list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            unnamed: ow_1.default.optional.boolean,
            limit: ow_1.default.optional.number.not.negative,
            offset: ow_1.default.optional.number.not.negative,
            desc: ow_1.default.optional.boolean,
            ownership: ow_1.default.optional.string.oneOf(Object.values(consts_1.STORAGE_OWNERSHIP_FILTER)),
        }));
        return this._listPaginated(options);
    }
    /**
     * Gets or creates a Request queue with the specified name.
     *
     * @param name - Name of the Request queue. If not provided, a default queue is used.
     * @returns The Request queue object.
     * @see https://docs.apify.com/api/v2/request-queues-post
     */
    async getOrCreate(name) {
        (0, ow_1.default)(name, ow_1.default.optional.string);
        return this._getOrCreate(name);
    }
}
exports.RequestQueueCollectionClient = RequestQueueCollectionClient;
//# sourceMappingURL=request_queue_collection.js.map