"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyValueStoreClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const log_1 = tslib_1.__importDefault(require("@apify/log"));
const utilities_1 = require("@apify/utilities");
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
/**
 * Client for managing a specific key-value store.
 *
 * Key-value stores are used to store arbitrary data records or files. Each record is identified by
 * a unique key and can contain any type of data. This client provides methods to get, set, and delete
 * records, list keys, and manage the store.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const storeClient = client.keyValueStore('my-store-id');
 *
 * // Set a record
 * await storeClient.setRecord({
 *   key: 'OUTPUT',
 *   value: { foo: 'bar' },
 *   contentType: 'application/json'
 * });
 *
 * // Get a record
 * const record = await storeClient.getRecord('OUTPUT');
 *
 * // List all keys
 * const { items } = await storeClient.listKeys();
 * ```
 *
 * @see https://docs.apify.com/platform/storage/key-value-store
 */
class KeyValueStoreClient extends resource_client_1.ResourceClient {
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
     * Gets the key-value store object from the Apify API.
     *
     * @returns The KeyValueStore object, or `undefined` if it does not exist
     * @see https://docs.apify.com/api/v2/key-value-store-get
     */
    async get() {
        return this._get({}, resource_client_1.SMALL_TIMEOUT_MILLIS);
    }
    /**
     * Updates the key-value store with specified fields.
     *
     * @param newFields - Fields to update in the key-value store
     * @param newFields.name - New name for the store
     * @param newFields.title - New title for the store
     * @param newFields.generalAccess - General resource access level ('FOLLOW_USER_SETTING', 'ANYONE_WITH_ID_CAN_READ' or 'RESTRICTED')
     * @returns The updated KeyValueStore object
     * @see https://docs.apify.com/api/v2/key-value-store-put
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields, resource_client_1.DEFAULT_TIMEOUT_MILLIS);
    }
    /**
     * Deletes the key-value store.
     *
     * @see https://docs.apify.com/api/v2/key-value-store-delete
     */
    async delete() {
        return this._delete(resource_client_1.SMALL_TIMEOUT_MILLIS);
    }
    /**
     * Lists all keys in the key-value store.
     *
     * Returns a paginated list of all record keys in the store. Use pagination parameters
     * to retrieve large lists efficiently.
     *
     * @param options - Listing options
     * @param options.limit - Maximum number of keys to return. Default is 1000.
     * @param options.exclusiveStartKey - Key to start listing from (for pagination). The listing starts with the next key after this one.
     * @param options.collection - Filter keys by collection name.
     * @param options.prefix - Filter keys that start with this prefix.
     * @returns Object containing `items` array of key metadata, pagination info (`count`, `limit`, `isTruncated`, `nextExclusiveStartKey`)
     * @see https://docs.apify.com/api/v2/key-value-store-keys-get
     *
     * @example
     * ```javascript
     * // List all keys
     * const { items, isTruncated } = await client.keyValueStore('my-store').listKeys();
     * items.forEach(item => console.log(`${item.key}: ${item.size} bytes`));
     *
     * // List keys with prefix
     * const { items } = await client.keyValueStore('my-store').listKeys({ prefix: 'user-' });
     *
     * // Paginate through all keys
     * let exclusiveStartKey;
     * do {
     *   const result = await client.keyValueStore('my-store').listKeys({
     *     limit: 100,
     *     exclusiveStartKey
     *   });
     *   // Process result.items...
     *   exclusiveStartKey = result.nextExclusiveStartKey;
     * } while (result.isTruncated);
     * ```
     */
    listKeys(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number.not.negative,
            exclusiveStartKey: ow_1.default.optional.string,
            collection: ow_1.default.optional.string,
            prefix: ow_1.default.optional.string,
            signature: ow_1.default.optional.string,
        }));
        const getPaginatedList = async (kvsListOptions = {}) => {
            const response = await this.httpClient.call({
                url: this._url('keys'),
                method: 'GET',
                params: this._params(kvsListOptions),
                timeout: resource_client_1.MEDIUM_TIMEOUT_MILLIS,
            });
            return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
        };
        const paginatedListPromise = getPaginatedList(options);
        async function* asyncGenerator() {
            let currentPage = await paginatedListPromise;
            yield* currentPage.items;
            let remainingItems = options.limit ? options.limit - currentPage.items.length : undefined;
            while (currentPage.items.length > 0 && // Continue only if at least some items were returned in the last page.
                currentPage.nextExclusiveStartKey !== null && // Continue only if there is some next key.
                (remainingItems === undefined || remainingItems > 0) // Continue only if the limit was not exceeded.
            ) {
                const newOptions = {
                    ...options,
                    limit: remainingItems,
                    exclusiveStartKey: currentPage.nextExclusiveStartKey,
                };
                currentPage = await getPaginatedList(newOptions);
                yield* currentPage.items;
                if (remainingItems) {
                    remainingItems -= currentPage.items.length;
                }
            }
        }
        return Object.defineProperty(paginatedListPromise, Symbol.asyncIterator, {
            value: asyncGenerator,
        });
    }
    /**
     * Generates a public URL for accessing a specific record in the key-value store.
     *
     * If the client has permission to access the key-value store's URL signing key,
     * the URL will include a cryptographic signature for authenticated access without
     * requiring an API token.
     *
     * @param key - The record key
     * @returns A public URL string for accessing the record
     *
     * @example
     * ```javascript
     * const url = await client.keyValueStore('my-store').getRecordPublicUrl('OUTPUT');
     * console.log(`Public URL: ${url}`);
     * // You can now share this URL or use it in a browser
     * ```
     */
    async getRecordPublicUrl(key) {
        (0, ow_1.default)(key, ow_1.default.string.nonEmpty);
        const store = await this.get();
        const recordPublicUrl = new URL(this._publicUrl(`records/${key}`));
        if (store === null || store === void 0 ? void 0 : store.urlSigningSecretKey) {
            const signature = await (0, utilities_1.createHmacSignatureAsync)(store.urlSigningSecretKey, key);
            recordPublicUrl.searchParams.append('signature', signature);
        }
        return recordPublicUrl.toString();
    }
    /**
     * Generates a public URL for accessing the list of keys in the key-value store.
     *
     * If the client has permission to access the key-value store's URL signing key,
     * the URL will include a cryptographic signature which allows access without authentication.
     *
     * @param options - URL generation options (extends all options from {@link listKeys})
     * @param options.expiresInSecs - Number of seconds until the signed URL expires. If omitted, the URL never expires.
     * @param options.limit - Maximum number of keys to return.
     * @param options.prefix - Filter keys by prefix.
     * @returns A public URL string for accessing the keys list
     *
     * @example
     * ```javascript
     * // Create a URL that expires in 1 hour
     * const url = await client.keyValueStore('my-store').createKeysPublicUrl({
     *   expiresInSecs: 3600,
     *   prefix: 'image-'
     * });
     * console.log(`Share this URL: ${url}`);
     * ```
     */
    async createKeysPublicUrl(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number.not.negative,
            exclusiveStartKey: ow_1.default.optional.string,
            collection: ow_1.default.optional.string,
            prefix: ow_1.default.optional.string,
            expiresInSecs: ow_1.default.optional.number,
        }));
        const store = await this.get();
        const { expiresInSecs, ...queryOptions } = options;
        let createdPublicKeysUrl = new URL(this._publicUrl('keys'));
        if (store === null || store === void 0 ? void 0 : store.urlSigningSecretKey) {
            const signature = await (0, utilities_1.createStorageContentSignatureAsync)({
                resourceId: store.id,
                urlSigningSecretKey: store.urlSigningSecretKey,
                expiresInMillis: expiresInSecs ? expiresInSecs * 1000 : undefined,
            });
            createdPublicKeysUrl.searchParams.set('signature', signature);
        }
        createdPublicKeysUrl = (0, utils_1.applyQueryParamsToUrl)(createdPublicKeysUrl, queryOptions);
        return createdPublicKeysUrl.toString();
    }
    /**
     * Tests whether a record with the given key exists in the key-value store without retrieving its value.
     *
     * This is more efficient than {@link getRecord} when you only need to check for existence.
     *
     * @param key - The record key to check
     * @returns `true` if the record exists, `false` if it does not
     * @see https://docs.apify.com/api/v2/key-value-store-record-get
     *
     * @example
     * ```javascript
     * const exists = await client.keyValueStore('my-store').recordExists('OUTPUT');
     * if (exists) {
     *   console.log('OUTPUT record exists');
     * }
     * ```
     */
    async recordExists(key) {
        const requestOpts = {
            url: this._url(`records/${key}`),
            method: 'HEAD',
            params: this._params(),
        };
        try {
            await this.httpClient.call(requestOpts);
            return true;
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return false;
    }
    async getRecord(key, options = {}) {
        (0, ow_1.default)(key, ow_1.default.string);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            buffer: ow_1.default.optional.boolean,
            stream: ow_1.default.optional.boolean,
            disableRedirect: ow_1.default.optional.boolean,
            signature: ow_1.default.optional.string,
        }));
        if (options.stream && !(0, utils_1.isNode)()) {
            throw new Error('The stream option can only be used in Node.js environment.');
        }
        if ('disableRedirect' in options) {
            log_1.default.deprecated('The disableRedirect option for getRecord() is deprecated. ' +
                'It has no effect and will be removed in the following major release.');
        }
        const queryParams = { attachment: 'true' };
        if (options.signature)
            queryParams.signature = options.signature;
        const requestOpts = {
            url: this._url(`records/${key}`),
            method: 'GET',
            params: this._params(queryParams),
            timeout: resource_client_1.DEFAULT_TIMEOUT_MILLIS,
        };
        if (options.buffer)
            requestOpts.forceBuffer = true;
        if (options.stream)
            requestOpts.responseType = 'stream';
        try {
            const response = await this.httpClient.call(requestOpts);
            return {
                key,
                value: response.data,
                contentType: response.headers['content-type'],
            };
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * Stores a record in the key-value store.
     *
     * The record value can be any JSON-serializable object, a string, or a Buffer/Stream.
     * The content type is automatically determined based on the value type, but can be
     * overridden using the `contentType` property.
     *
     * **Note about streams:** If the value is a stream object (has `.pipe` and `.on` methods),
     * the upload cannot be retried on failure or follow redirects. For reliable uploads,
     * buffer the entire stream into memory first.
     *
     * @param record - The record to store
     * @param record.key - Record key (unique identifier)
     * @param record.value - Record value (object, string, Buffer, or Stream)
     * @param record.contentType - Optional MIME type. Auto-detected if not provided:
     *                             - Objects: `'application/json; charset=utf-8'`
     *                             - Strings: `'text/plain; charset=utf-8'`
     *                             - Buffers/Streams: `'application/octet-stream'`
     * @param options - Storage options
     * @param options.timeoutSecs - Timeout for the upload in seconds. Default varies by value size.
     * @param options.doNotRetryTimeouts - If `true`, don't retry on timeout errors. Default is `false`.
     * @see https://docs.apify.com/api/v2/key-value-store-record-put
     *
     * @example
     * ```javascript
     * // Store JSON object
     * await client.keyValueStore('my-store').setRecord({
     *   key: 'OUTPUT',
     *   value: { crawledUrls: 100, items: [...] }
     * });
     *
     * // Store text
     * await client.keyValueStore('my-store').setRecord({
     *   key: 'README',
     *   value: 'This is my readme text',
     *   contentType: 'text/plain'
     * });
     *
     * // Store binary data
     * const imageBuffer = await fetchImageBuffer();
     * await client.keyValueStore('my-store').setRecord({
     *   key: 'screenshot.png',
     *   value: imageBuffer,
     *   contentType: 'image/png'
     * });
     * ```
     */
    async setRecord(record, options = {}) {
        (0, ow_1.default)(record, ow_1.default.object.exactShape({
            key: ow_1.default.string,
            value: ow_1.default.any(ow_1.default.null, ow_1.default.string, ow_1.default.number, ow_1.default.object, ow_1.default.boolean),
            contentType: ow_1.default.optional.string.nonEmpty,
        }));
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            timeoutSecs: ow_1.default.optional.number,
            doNotRetryTimeouts: ow_1.default.optional.boolean,
        }));
        const { key } = record;
        let { value, contentType } = record;
        const { timeoutSecs, doNotRetryTimeouts } = options;
        const isValueStreamOrBuffer = (0, utils_1.isStream)(value) || (0, utils_1.isBuffer)(value);
        // To allow saving Objects to JSON without providing content type
        if (!contentType) {
            if (isValueStreamOrBuffer)
                contentType = 'application/octet-stream';
            else if (typeof value === 'string')
                contentType = 'text/plain; charset=utf-8';
            else
                contentType = 'application/json; charset=utf-8';
        }
        const isContentTypeJson = /^application\/json/.test(contentType);
        if (isContentTypeJson && !isValueStreamOrBuffer && typeof value !== 'string') {
            try {
                value = JSON.stringify(value, null, 2);
            }
            catch (err) {
                const msg = `The record value cannot be stringified to JSON. Please provide other content type.\nCause: ${err.message}`;
                throw new Error(msg);
            }
        }
        const uploadOpts = {
            url: this._url(`records/${key}`),
            method: 'PUT',
            params: this._params(),
            data: value,
            headers: contentType ? { 'content-type': contentType } : undefined,
            doNotRetryTimeouts,
            timeout: timeoutSecs !== undefined ? timeoutSecs * 1000 : resource_client_1.DEFAULT_TIMEOUT_MILLIS,
        };
        await this.httpClient.call(uploadOpts);
    }
    /**
     * Deletes a record from the key-value store.
     *
     * @param key - The record key to delete
     * @see https://docs.apify.com/api/v2/key-value-store-record-delete
     *
     * @example
     * ```javascript
     * await client.keyValueStore('my-store').deleteRecord('temp-data');
     * ```
     */
    async deleteRecord(key) {
        (0, ow_1.default)(key, ow_1.default.string);
        await this.httpClient.call({
            url: this._url(`records/${key}`),
            method: 'DELETE',
            params: this._params(),
            timeout: resource_client_1.SMALL_TIMEOUT_MILLIS,
        });
    }
}
exports.KeyValueStoreClient = KeyValueStoreClient;
//# sourceMappingURL=key_value_store.js.map