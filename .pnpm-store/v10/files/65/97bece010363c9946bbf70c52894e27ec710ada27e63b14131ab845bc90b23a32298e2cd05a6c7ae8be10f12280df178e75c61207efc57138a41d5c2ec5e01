"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatasetCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const consts_1 = require("@apify/consts");
const resource_collection_client_1 = require("../base/resource_collection_client");
/**
 * Client for managing the collection of datasets in your account.
 *
 * Datasets store structured data results from Actor runs. This client provides methods
 * to list, create, or get datasets by name.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const datasetsClient = client.datasets();
 *
 * // List all datasets
 * const { items } = await datasetsClient.list();
 *
 * // Get or create a dataset by name
 * const dataset = await datasetsClient.getOrCreate('my-dataset');
 * ```
 *
 * @see https://docs.apify.com/platform/storage/dataset
 */
class DatasetCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'datasets',
            ...options,
        });
    }
    /**
     * Lists all Datasets.
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
     * @returns A paginated iterator of Datasets.
     * @see https://docs.apify.com/api/v2/datasets-get
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
     * Gets or creates a dataset with the specified name.
     *
     * @param name - Name of the dataset. If not provided, a default dataset is used.
     * @param options - Additional options like schema.
     * @returns The dataset object.
     * @see https://docs.apify.com/api/v2/datasets-post
     */
    async getOrCreate(name, options) {
        (0, ow_1.default)(name, ow_1.default.optional.string);
        (0, ow_1.default)(options === null || options === void 0 ? void 0 : options.schema, ow_1.default.optional.object); // TODO: Add schema validatioon
        return this._getOrCreate(name, options);
    }
}
exports.DatasetCollectionClient = DatasetCollectionClient;
//# sourceMappingURL=dataset_collection.js.map