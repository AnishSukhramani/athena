"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadItemsFormat = exports.DatasetClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const utilities_1 = require("@apify/utilities");
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
/**
 * Client for managing a specific Dataset.
 *
 * Datasets store structured data results from Actor runs. This client provides methods to push items,
 * list and retrieve items, download items in various formats (JSON, CSV, Excel, etc.), and manage
 * the dataset.
 *
 * @template Data - Type of items stored in the dataset
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const datasetClient = client.dataset('my-dataset-id');
 *
 * // Push items to the dataset
 * await datasetClient.pushItems([
 *   { url: 'https://example.com', title: 'Example' },
 *   { url: 'https://test.com', title: 'Test' }
 * ]);
 *
 * // List all items
 * const { items } = await datasetClient.listItems();
 *
 * // Download items as CSV
 * const buffer = await datasetClient.downloadItems('csv');
 * ```
 *
 * @see https://docs.apify.com/platform/storage/dataset
 */
class DatasetClient extends resource_client_1.ResourceClient {
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
     * Gets the dataset object from the Apify API.
     *
     * @returns The Dataset object, or `undefined` if it does not exist
     * @see https://docs.apify.com/api/v2/dataset-get
     */
    async get() {
        return this._get({}, resource_client_1.SMALL_TIMEOUT_MILLIS);
    }
    /**
     * Updates the dataset with specified fields.
     *
     * @param newFields - Fields to update in the dataset
     * @returns The updated Dataset object
     * @see https://docs.apify.com/api/v2/dataset-put
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields, resource_client_1.SMALL_TIMEOUT_MILLIS);
    }
    /**
     * Deletes the dataset.
     *
     * @see https://docs.apify.com/api/v2/dataset-delete
     */
    async delete() {
        return this._delete(resource_client_1.SMALL_TIMEOUT_MILLIS);
    }
    /**
     * Lists items in the dataset.
     *
     * Returns a paginated list of dataset items. You can use pagination parameters to retrieve
     * specific subsets of items, and various filtering and formatting options to customize
     * the output.
     *
     * @param options - Options for listing items
     * @param options.limit - Maximum number of items to return. Default is all items.
     * @param options.chunkSize - Maximum number of items returned in one API response. Relevant in the context of asyncIterator.
     * @param options.offset - Number of items to skip from the beginning. Default is 0.
     * @param options.desc - If `true`, items are returned in descending order (newest first). Default is `false`.
     * @param options.fields - Array of field names to include in the results. Omits all other fields.
     * @param options.omit - Array of field names to exclude from the results.
     * @param options.clean - If `true`, returns only non-empty items and skips hidden fields. Default is `false`.
     * @param options.skipEmpty - If `true`, skips empty items. Default is `false`.
     * @param options.skipHidden - If `true`, skips hidden fields (fields starting with `#`). Default is `false`.
     * @param options.flatten - Array of field names to flatten. Nested objects are converted to dot notation (e.g., `obj.field`).
     * @param options.unwind - Field name or array of field names to unwind. Each array value creates a separate item.
     * @param options.view - Name of a predefined view to use for field selection.
     * @returns A paginated list with `items`, `total` count, `offset`, `count`, and `limit`
     * @see https://docs.apify.com/api/v2/dataset-items-get
     *
     * @example
     * ```javascript
     * // Get first 100 items
     * const { items, total } = await client.dataset('my-dataset').listItems({ limit: 100 });
     * console.log(`Retrieved ${items.length} of ${total} total items`);
     *
     * // Get items with specific fields only
     * const { items } = await client.dataset('my-dataset').listItems({
     *   fields: ['url', 'title'],
     *   skipEmpty: true,
     *   limit: 50
     * });
     *
     * // Get items in descending order with pagination
     * const { items } = await client.dataset('my-dataset').listItems({
     *   desc: true,
     *   offset: 100,
     *   limit: 50
     * });
     * ```
     */
    listItems(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            clean: ow_1.default.optional.boolean,
            desc: ow_1.default.optional.boolean,
            flatten: ow_1.default.optional.array.ofType(ow_1.default.string),
            fields: ow_1.default.optional.array.ofType(ow_1.default.string),
            omit: ow_1.default.optional.array.ofType(ow_1.default.string),
            limit: ow_1.default.optional.number.not.negative,
            offset: ow_1.default.optional.number.not.negative,
            chunkSize: ow_1.default.optional.number.positive,
            skipEmpty: ow_1.default.optional.boolean,
            skipHidden: ow_1.default.optional.boolean,
            unwind: ow_1.default.optional.any(ow_1.default.string, ow_1.default.array.ofType(ow_1.default.string)),
            view: ow_1.default.optional.string,
            signature: ow_1.default.optional.string,
        }));
        const fetchItems = async (datasetListOptions = {}) => {
            var _a;
            const response = await this.httpClient.call({
                url: this._url('items'),
                method: 'GET',
                params: this._params(datasetListOptions),
                timeout: resource_client_1.DEFAULT_TIMEOUT_MILLIS,
            });
            return this._createPaginationList(response, (_a = datasetListOptions.desc) !== null && _a !== void 0 ? _a : false);
        };
        return this._listPaginatedFromCallback(fetchItems, options);
    }
    /**
     * Downloads dataset items in a specific format.
     *
     * Unlike {@link listItems} which returns a {@link PaginatedList} with an array of individual
     * dataset items, this method returns the items serialized to the provided format
     * (JSON, CSV, Excel, etc.) as a Buffer. Useful for exporting data for further processing.
     *
     * @param format - Output format: `'json'`, `'jsonl'`, `'csv'`, `'xlsx'`, `'xml'`, `'rss'`, or `'html'`
     * @param options - Download and formatting options (extends all options from {@link listItems})
     * @param options.attachment - If `true`, the response will have `Content-Disposition: attachment` header.
     * @param options.bom - If `true`, adds UTF-8 BOM to the beginning of the file (useful for Excel compatibility).
     * @param options.delimiter - CSV delimiter character. Default is `,` (comma).
     * @param options.skipHeaderRow - If `true`, CSV export will not include the header row with field names.
     * @param options.xmlRoot - Name of the root XML element. Default is `'items'`.
     * @param options.xmlRow - Name of the XML element for each item. Default is `'item'`.
     * @param options.fields - Array of field names to include in the export.
     * @param options.omit - Array of field names to exclude from the export.
     * @returns Buffer containing the serialized data in the specified format
     * @see https://docs.apify.com/api/v2/dataset-items-get
     *
     * @example
     * ```javascript
     * // Download as CSV with BOM for Excel compatibility
     * const csvBuffer = await client.dataset('my-dataset').downloadItems('csv', { bom: true });
     * require('fs').writeFileSync('output.csv', csvBuffer);
     *
     * // Download as Excel with custom options
     * const xlsxBuffer = await client.dataset('my-dataset').downloadItems('xlsx', {
     *   fields: ['url', 'title', 'price'],
     *   skipEmpty: true,
     *   limit: 1000
     * });
     *
     * // Download as XML with custom element names
     * const xmlBuffer = await client.dataset('my-dataset').downloadItems('xml', {
     *   xmlRoot: 'products',
     *   xmlRow: 'product'
     * });
     * ```
     */
    async downloadItems(format, options = {}) {
        (0, ow_1.default)(format, ow_1.default.string.oneOf(validItemFormats));
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            attachment: ow_1.default.optional.boolean,
            bom: ow_1.default.optional.boolean,
            clean: ow_1.default.optional.boolean,
            delimiter: ow_1.default.optional.string,
            desc: ow_1.default.optional.boolean,
            flatten: ow_1.default.optional.array.ofType(ow_1.default.string),
            fields: ow_1.default.optional.array.ofType(ow_1.default.string),
            omit: ow_1.default.optional.array.ofType(ow_1.default.string),
            limit: ow_1.default.optional.number.not.negative,
            offset: ow_1.default.optional.number.not.negative,
            skipEmpty: ow_1.default.optional.boolean,
            skipHeaderRow: ow_1.default.optional.boolean,
            skipHidden: ow_1.default.optional.boolean,
            unwind: ow_1.default.any(ow_1.default.optional.string, ow_1.default.optional.array.ofType(ow_1.default.string)),
            view: ow_1.default.optional.string,
            xmlRoot: ow_1.default.optional.string,
            xmlRow: ow_1.default.optional.string,
            signature: ow_1.default.optional.string,
        }));
        const { data } = await this.httpClient.call({
            url: this._url('items'),
            method: 'GET',
            params: this._params({
                format,
                ...options,
            }),
            forceBuffer: true,
            timeout: resource_client_1.DEFAULT_TIMEOUT_MILLIS,
        });
        return (0, utils_1.cast)(data);
    }
    /**
     * Stores one or more items into the dataset.
     *
     * Items can be objects, strings, or arrays thereof. Each item will be stored as a separate
     * record in the dataset. Objects are automatically serialized to JSON. If you provide an array,
     * all items will be stored in order. This method is idempotent - calling it multiple times
     * with the same data will not create duplicates, but will append items each time.
     *
     * @param items - A single item (object or string) or an array of items to store.
     *                Objects are automatically stringified to JSON. Strings are stored as-is.
     * @see https://docs.apify.com/api/v2/dataset-items-post
     *
     * @example
     * ```javascript
     * // Store a single object
     * await client.dataset('my-dataset').pushItems({
     *   url: 'https://example.com',
     *   title: 'Example Page',
     *   extractedAt: new Date()
     * });
     *
     * // Store multiple items at once
     * await client.dataset('my-dataset').pushItems([
     *   { url: 'https://example.com', title: 'Example' },
     *   { url: 'https://test.com', title: 'Test' },
     *   { url: 'https://demo.com', title: 'Demo' }
     * ]);
     *
     * // Store string items
     * await client.dataset('my-dataset').pushItems(['item1', 'item2', 'item3']);
     * ```
     */
    async pushItems(items) {
        (0, ow_1.default)(items, ow_1.default.any(ow_1.default.object, ow_1.default.string, ow_1.default.array.ofType(ow_1.default.any(ow_1.default.object, ow_1.default.string))));
        await this.httpClient.call({
            url: this._url('items'),
            method: 'POST',
            headers: {
                'content-type': 'application/json; charset=utf-8',
            },
            data: items,
            params: this._params(),
            doNotRetryTimeouts: true, // see timeout handling in http-client
            timeout: resource_client_1.MEDIUM_TIMEOUT_MILLIS,
        });
    }
    /**
     * Gets statistical information about the dataset.
     *
     * Returns statistics for each field in the dataset, including information about
     * data types, null counts, and value ranges.
     *
     * @returns Dataset statistics, or `undefined` if not available
     * @see https://docs.apify.com/api/v2/dataset-statistics-get
     */
    async getStatistics() {
        const requestOpts = {
            url: this._url('statistics'),
            method: 'GET',
            params: this._params(),
            timeout: resource_client_1.SMALL_TIMEOUT_MILLIS,
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)((0, utils_1.pluckData)(response.data));
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * Generates a public URL for accessing dataset items.
     *
     * If the client has permission to access the dataset's URL signing key,
     * the URL will include a cryptographic signature allowing access without authentication.
     * This is useful for sharing dataset results with external services or users.
     *
     * @param options - URL generation options (extends all options from {@link listItems})
     * @param options.expiresInSecs - Number of seconds until the signed URL expires. If omitted, the URL never expires.
     * @param options.fields - Array of field names to include in the response.
     * @param options.limit - Maximum number of items to return.
     * @param options.offset - Number of items to skip.
     * @returns A public URL string for accessing the dataset items
     *
     * @example
     * ```javascript
     * // Create a URL that expires in 1 hour with specific fields
     * const url = await client.dataset('my-dataset').createItemsPublicUrl({
     *   expiresInSecs: 3600,
     *   fields: ['url', 'title'],
     *   limit: 100
     * });
     * console.log(`Share this URL: ${url}`);
     *
     * // Create a permanent public URL for clean items only
     * const url = await client.dataset('my-dataset').createItemsPublicUrl({
     *   clean: true,
     *   skipEmpty: true
     * });
     * ```
     */
    async createItemsPublicUrl(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            clean: ow_1.default.optional.boolean,
            desc: ow_1.default.optional.boolean,
            flatten: ow_1.default.optional.array.ofType(ow_1.default.string),
            fields: ow_1.default.optional.array.ofType(ow_1.default.string),
            omit: ow_1.default.optional.array.ofType(ow_1.default.string),
            limit: ow_1.default.optional.number.not.negative,
            offset: ow_1.default.optional.number.not.negative,
            skipEmpty: ow_1.default.optional.boolean,
            skipHidden: ow_1.default.optional.boolean,
            unwind: ow_1.default.optional.any(ow_1.default.string, ow_1.default.array.ofType(ow_1.default.string)),
            view: ow_1.default.optional.string,
            expiresInSecs: ow_1.default.optional.number,
        }));
        const dataset = await this.get();
        const { expiresInSecs, ...queryOptions } = options;
        let createdItemsPublicUrl = new URL(this._publicUrl('items'));
        if (dataset === null || dataset === void 0 ? void 0 : dataset.urlSigningSecretKey) {
            const signature = await (0, utilities_1.createStorageContentSignatureAsync)({
                resourceId: dataset.id,
                urlSigningSecretKey: dataset.urlSigningSecretKey,
                expiresInMillis: expiresInSecs ? expiresInSecs * 1000 : undefined,
            });
            createdItemsPublicUrl.searchParams.set('signature', signature);
        }
        createdItemsPublicUrl = (0, utils_1.applyQueryParamsToUrl)(createdItemsPublicUrl, queryOptions);
        return createdItemsPublicUrl.toString();
    }
    _createPaginationList(response, userProvidedDesc) {
        var _a;
        return {
            items: response.data,
            total: Number(response.headers['x-apify-pagination-total']),
            offset: Number(response.headers['x-apify-pagination-offset']),
            count: response.data.length, // because x-apify-pagination-count returns invalid values when hidden/empty items are skipped
            limit: Number(response.headers['x-apify-pagination-limit']), // API returns 999999999999 when no limit is used
            // TODO: Replace this once https://github.com/apify/apify-core/issues/3503 is solved
            desc: JSON.parse((_a = response.headers['x-apify-pagination-desc']) !== null && _a !== void 0 ? _a : userProvidedDesc),
        };
    }
}
exports.DatasetClient = DatasetClient;
/**
 * Supported formats for downloading dataset items.
 */
var DownloadItemsFormat;
(function (DownloadItemsFormat) {
    DownloadItemsFormat["JSON"] = "json";
    DownloadItemsFormat["JSONL"] = "jsonl";
    DownloadItemsFormat["XML"] = "xml";
    DownloadItemsFormat["HTML"] = "html";
    DownloadItemsFormat["CSV"] = "csv";
    DownloadItemsFormat["XLSX"] = "xlsx";
    DownloadItemsFormat["RSS"] = "rss";
})(DownloadItemsFormat || (exports.DownloadItemsFormat = DownloadItemsFormat = {}));
const validItemFormats = [...new Set(Object.values(DownloadItemsFormat).map((item) => item.toLowerCase()))];
//# sourceMappingURL=dataset.js.map