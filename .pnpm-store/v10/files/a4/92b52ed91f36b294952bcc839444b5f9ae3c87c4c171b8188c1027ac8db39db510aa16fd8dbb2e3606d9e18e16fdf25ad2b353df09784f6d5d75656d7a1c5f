"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyValueStoreCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const consts_1 = require("@apify/consts");
const resource_collection_client_1 = require("../base/resource_collection_client");
/**
 * Client for managing the collection of Key-value stores in your account.
 *
 * Key-value stores are used to store arbitrary data records or files. This client provides
 * methods to list, create, or get key-value stores by name.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const storesClient = client.keyValueStores();
 *
 * // List all key-value stores
 * const { items } = await storesClient.list();
 *
 * // Get or create a key-value store by name
 * const store = await storesClient.getOrCreate('my-store');
 * ```
 *
 * @see https://docs.apify.com/platform/storage/key-value-store
 */
class KeyValueStoreCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'key-value-stores',
            ...options,
        });
    }
    /**
     * Lists all Key-value stores.
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
     * @returns A paginated iterator of Key-value stores.
     * @see https://docs.apify.com/api/v2/key-value-stores-get
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
     * Gets or creates a key-value store with the specified name.
     *
     * @param name - Name of the key-value store. If not provided, a default store is used.
     * @param options - Additional options like schema.
     * @returns The key-value store object.
     * @see https://docs.apify.com/api/v2/key-value-stores-post
     */
    async getOrCreate(name, options) {
        (0, ow_1.default)(name, ow_1.default.optional.string);
        (0, ow_1.default)(options === null || options === void 0 ? void 0 : options.schema, ow_1.default.optional.object); // TODO: Add schema validatioon
        return this._getOrCreate(name, options);
    }
}
exports.KeyValueStoreCollectionClient = KeyValueStoreCollectionClient;
//# sourceMappingURL=key_value_store_collection.js.map