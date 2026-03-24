"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestQueueClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const consts_1 = require("@apify/consts");
const log_1 = tslib_1.__importDefault(require("@apify/log"));
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
const DEFAULT_PARALLEL_BATCH_ADD_REQUESTS = 5;
const DEFAULT_UNPROCESSED_RETRIES_BATCH_ADD_REQUESTS = 3;
const DEFAULT_MIN_DELAY_BETWEEN_UNPROCESSED_REQUESTS_RETRIES_MILLIS = 500;
const DEFAULT_REQUEST_QUEUE_REQUEST_PAGE_LIMIT = 1000;
const SAFETY_BUFFER_PERCENT = 0.01 / 100; // 0.01%
/**
 * Client for managing a specific Request queue.
 *
 * Request queues store URLs to be crawled and their metadata. Each request in the queue has a unique ID
 * and can be in various states (pending, handled). This client provides methods to add, get, update,
 * and delete requests, as well as manage the queue itself.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const queueClient = client.requestQueue('my-queue-id');
 *
 * // Add a request to the queue
 * await queueClient.addRequest({
 *   url: 'https://example.com',
 *   uniqueKey: 'example-com'
 * });
 *
 * // Get the next request from the queue
 * const request = await queueClient.listHead();
 *
 * // Mark request as handled
 * await queueClient.updateRequest({
 *   id: request.id,
 *   handledAt: new Date().toISOString()
 * });
 * ```
 *
 * @see https://docs.apify.com/platform/storage/request-queue
 */
class RequestQueueClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options, userOptions = {}) {
        super({
            resourcePath: 'request-queues',
            ...options,
        });
        Object.defineProperty(this, "clientKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timeoutMillis", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.clientKey = userOptions.clientKey;
        this.timeoutMillis = userOptions.timeoutSecs ? userOptions.timeoutSecs * 1e3 : undefined;
    }
    /**
     * Gets the Request queue object from the Apify API.
     *
     * @returns The RequestQueue object, or `undefined` if it does not exist
     * @see https://docs.apify.com/api/v2/request-queue-get
     */
    async get() {
        return this._get({}, resource_client_1.SMALL_TIMEOUT_MILLIS);
    }
    /**
     * Updates the Request queue with specified fields.
     *
     * @param newFields - Fields to update in the Request queue
     * @returns The updated RequestQueue object
     * @see https://docs.apify.com/api/v2/request-queue-put
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields, resource_client_1.SMALL_TIMEOUT_MILLIS);
    }
    /**
     * Deletes the Request queue.
     *
     * @see https://docs.apify.com/api/v2/request-queue-delete
     */
    async delete() {
        return this._delete(resource_client_1.SMALL_TIMEOUT_MILLIS);
    }
    /**
     * Lists requests from the beginning of the queue (head).
     *
     * Returns the first N requests from the queue without locking them. This is useful for
     * inspecting what requests are waiting to be processed.
     *
     * @param options - Options for listing (e.g., limit)
     * @returns List of requests from the queue head
     * @see https://docs.apify.com/api/v2/request-queue-head-get
     */
    async listHead(options = {}) {
        var _a;
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number.not.negative,
        }));
        const response = await this.httpClient.call({
            url: this._url('head'),
            method: 'GET',
            timeout: Math.min(resource_client_1.SMALL_TIMEOUT_MILLIS, (_a = this.timeoutMillis) !== null && _a !== void 0 ? _a : Infinity),
            params: this._params({
                limit: options.limit,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * Gets and locks the next requests from the queue head for processing.
     *
     * This method retrieves requests from the beginning of the queue and locks them for
     * the specified duration to prevent other clients from processing them simultaneously.
     * This is the primary method used by distributed web crawlers to coordinate work across
     * multiple workers. Locked requests won't be returned to other clients until the lock expires
     * or is explicitly released using {@link deleteRequestLock}.
     *
     * @param options - Lock configuration
     * @param options.lockSecs - **Required.** Duration in seconds to lock the requests. After this time, the locks expire and requests can be retrieved by other clients.
     * @param options.limit - Maximum number of requests to return. Default is 25.
     * @returns Object containing `items` (locked requests), `queueModifiedAt`, `hadMultipleClients`, and lock information
     * @see https://docs.apify.com/api/v2/request-queue-head-lock-post
     *
     * @example
     * ```javascript
     * // Get and lock up to 10 requests for 60 seconds
     * const { items, lockSecs } = await client.requestQueue('my-queue').listAndLockHead({
     *   lockSecs: 60,
     *   limit: 10
     * });
     *
     * // Process each locked request
     * for (const request of items) {
     *   console.log(`Processing: ${request.url}`);
     *   // ... process request ...
     *   // Delete lock after successful processing
     *   await client.requestQueue('my-queue').deleteRequestLock(request.id);
     * }
     * ```
     */
    async listAndLockHead(options) {
        var _a;
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            lockSecs: ow_1.default.number,
            limit: ow_1.default.optional.number.not.negative,
        }));
        const response = await this.httpClient.call({
            url: this._url('head/lock'),
            method: 'POST',
            timeout: Math.min(resource_client_1.MEDIUM_TIMEOUT_MILLIS, (_a = this.timeoutMillis) !== null && _a !== void 0 ? _a : Infinity),
            params: this._params({
                limit: options.limit,
                lockSecs: options.lockSecs,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * Adds a single request to the queue.
     *
     * If a request with the same `uniqueKey` already exists, the method will return information
     * about the existing request without adding a duplicate. The `uniqueKey` is used for
     * deduplication - typically it's the URL, but you can use any string to identify the request.
     *
     * @param request - The request object to add (excluding `id`, which is assigned by the API)
     * @param request.url - URL to be crawled
     * @param request.uniqueKey - Unique identifier for request deduplication. If not provided, defaults to `url`.
     * @param request.method - HTTP method. Default is `'GET'`.
     * @param request.userData - Custom user data (arbitrary JSON object) associated with the request.
     * @param request.headers - HTTP headers to use for the request.
     * @param request.payload - HTTP payload for POST/PUT requests (string).
     * @param options - Additional options
     * @param options.forefront - If `true`, adds the request to the beginning of the queue. Default is `false` (adds to the end).
     * @returns Object with `requestId`, `wasAlreadyPresent`, and `wasAlreadyHandled` flags
     * @see https://docs.apify.com/api/v2/request-queue-requests-post
     *
     * @example
     * ```javascript
     * const result = await client.requestQueue('my-queue').addRequest({
     *   url: 'https://example.com',
     *   uniqueKey: 'example-page',
     *   method: 'GET',
     *   userData: { label: 'START', depth: 0 }
     * });
     * console.log(`Request ID: ${result.requestId}`);
     * console.log(`Already present: ${result.wasAlreadyPresent}`);
     * console.log(`Already handled: ${result.wasAlreadyHandled}`);
     *
     * // Add urgent request to the front of the queue
     * await client.requestQueue('my-queue').addRequest(
     *   { url: 'https://priority.com', uniqueKey: 'priority-page' },
     *   { forefront: true }
     * );
     * ```
     */
    async addRequest(request, options = {}) {
        var _a;
        (0, ow_1.default)(request, ow_1.default.object.partialShape({
            id: ow_1.default.undefined,
        }));
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            forefront: ow_1.default.optional.boolean,
        }));
        const response = await this.httpClient.call({
            url: this._url('requests'),
            method: 'POST',
            timeout: Math.min(resource_client_1.SMALL_TIMEOUT_MILLIS, (_a = this.timeoutMillis) !== null && _a !== void 0 ? _a : Infinity),
            data: request,
            params: this._params({
                forefront: options.forefront,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * Writes requests to Request queue in batch.
     *
     * @private
     */
    async _batchAddRequests(requests, options = {}) {
        var _a;
        (0, ow_1.default)(requests, ow_1.default.array
            .ofType(ow_1.default.object.partialShape({
            id: ow_1.default.undefined,
        }))
            .minLength(1)
            .maxLength(consts_1.REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION));
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            forefront: ow_1.default.optional.boolean,
        }));
        const { data } = await this.httpClient.call({
            url: this._url('requests/batch'),
            method: 'POST',
            timeout: Math.min(resource_client_1.MEDIUM_TIMEOUT_MILLIS, (_a = this.timeoutMillis) !== null && _a !== void 0 ? _a : Infinity),
            data: requests,
            params: this._params({
                forefront: options.forefront,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(data)));
    }
    async _batchAddRequestsWithRetries(requests, options = {}) {
        const { forefront, maxUnprocessedRequestsRetries = DEFAULT_UNPROCESSED_RETRIES_BATCH_ADD_REQUESTS, minDelayBetweenUnprocessedRequestsRetriesMillis = DEFAULT_MIN_DELAY_BETWEEN_UNPROCESSED_REQUESTS_RETRIES_MILLIS, } = options;
        // Keep track of the requests that remain to be processed (in parameter format)
        let remainingRequests = requests;
        // Keep track of the requests that have been processed (in api format)
        const processedRequests = [];
        // The requests we have not been able to process in the last call
        // ie. those we have not been able to process at all
        let unprocessedRequests = [];
        for (let i = 0; i < 1 + maxUnprocessedRequestsRetries; i++) {
            try {
                const response = await this._batchAddRequests(remainingRequests, {
                    forefront,
                });
                processedRequests.push(...response.processedRequests);
                unprocessedRequests = response.unprocessedRequests;
                // Consider request with unprocessed requests as rate limited.
                // NOTE: This is important for SDK, the rate limit errors are read by AutoScalePool and used to potentially downscale.
                if (unprocessedRequests.length !== 0) {
                    this.httpClient.stats.addRateLimitError(i + 1);
                }
                // Get unique keys of all requests processed so far
                const processedRequestsUniqueKeys = processedRequests.map(({ uniqueKey }) => uniqueKey);
                // Requests remaining to be processed are the all that remain
                remainingRequests = requests.filter(({ uniqueKey }) => !processedRequestsUniqueKeys.includes(uniqueKey));
                // Stop if all requests have been processed
                if (remainingRequests.length === 0) {
                    break;
                }
            }
            catch (err) {
                log_1.default.exception(err, 'Request batch insert failed');
                // When something fails and http client does not retry, the remaining requests are treated as unprocessed.
                // This ensures that this method does not throw and keeps the signature.
                const processedRequestsUniqueKeys = processedRequests.map(({ uniqueKey }) => uniqueKey);
                unprocessedRequests = requests
                    .filter(({ uniqueKey }) => !processedRequestsUniqueKeys.includes(uniqueKey))
                    .map(({ method, uniqueKey, url }) => ({ method, uniqueKey, url }));
                break;
            }
            // Exponential backoff
            const delayMillis = Math.floor((1 + Math.random()) * 2 ** i * minDelayBetweenUnprocessedRequestsRetriesMillis);
            await new Promise((resolve) => {
                setTimeout(resolve, delayMillis);
            });
        }
        const result = { processedRequests, unprocessedRequests };
        return (0, utils_1.cast)((0, utils_1.parseDateFields)(result));
    }
    /**
     * Adds multiple requests to the queue in a single operation.
     *
     * This is significantly more efficient than calling {@link addRequest} multiple times, especially
     * for large batches. The method automatically handles batching (max 25 requests per API call),
     * retries on rate limiting, and parallel processing. Requests are sent in chunks respecting the
     * API payload size limit, and any unprocessed requests due to rate limits are automatically
     * retried with exponential backoff.
     *
     * @param requests - Array of request objects to add (excluding `id` fields)
     * @param options - Batch operation configuration
     * @param options.forefront - If `true`, adds all requests to the beginning of the queue. Default is `false`.
     * @param options.maxUnprocessedRequestsRetries - Maximum number of retry attempts for rate-limited requests. Default is 3.
     * @param options.maxParallel - Maximum number of parallel batch API calls. Default is 5.
     * @param options.minDelayBetweenUnprocessedRequestsRetriesMillis - Minimum delay before retrying rate-limited requests. Default is 500ms.
     * @returns Object with `processedRequests` (successfully added) and `unprocessedRequests` (failed after all retries)
     * @see https://docs.apify.com/api/v2/request-queue-requests-batch-post
     *
     * @example
     * ```javascript
     * // Add a batch of URLs to crawl
     * const requests = [
     *   { url: 'https://example.com', uniqueKey: 'page1', userData: { depth: 1 } },
     *   { url: 'https://example.com/2', uniqueKey: 'page2', userData: { depth: 1 } },
     *   { url: 'https://example.com/3', uniqueKey: 'page3', userData: { depth: 1 } }
     * ];
     * const result = await client.requestQueue('my-queue').batchAddRequests(requests);
     * console.log(`Successfully added: ${result.processedRequests.length}`);
     * console.log(`Failed: ${result.unprocessedRequests.length}`);
     *
     * // Batch add with custom retry settings
     * const result = await client.requestQueue('my-queue').batchAddRequests(
     *   requests,
     *   { maxUnprocessedRequestsRetries: 5, maxParallel: 10 }
     * );
     * ```
     */
    async batchAddRequests(requests, options = {}) {
        const { forefront, maxUnprocessedRequestsRetries = DEFAULT_UNPROCESSED_RETRIES_BATCH_ADD_REQUESTS, maxParallel = DEFAULT_PARALLEL_BATCH_ADD_REQUESTS, minDelayBetweenUnprocessedRequestsRetriesMillis = DEFAULT_MIN_DELAY_BETWEEN_UNPROCESSED_REQUESTS_RETRIES_MILLIS, } = options;
        (0, ow_1.default)(requests, ow_1.default.array
            .ofType(ow_1.default.object.partialShape({
            id: ow_1.default.undefined,
        }))
            .minLength(1));
        (0, ow_1.default)(forefront, ow_1.default.optional.boolean);
        (0, ow_1.default)(maxUnprocessedRequestsRetries, ow_1.default.optional.number);
        (0, ow_1.default)(maxParallel, ow_1.default.optional.number);
        (0, ow_1.default)(minDelayBetweenUnprocessedRequestsRetriesMillis, ow_1.default.optional.number);
        const executingRequests = new Set();
        const individualResults = [];
        const payloadSizeLimitBytes = consts_1.MAX_PAYLOAD_SIZE_BYTES - Math.ceil(consts_1.MAX_PAYLOAD_SIZE_BYTES * SAFETY_BUFFER_PERCENT);
        // Keep a pool of up to `maxParallel` requests running at once
        let i = 0;
        while (i < requests.length) {
            const slicedRequests = requests.slice(i, i + consts_1.REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION);
            const requestsInBatch = (0, utils_1.sliceArrayByByteLength)(slicedRequests, payloadSizeLimitBytes, i);
            const requestPromise = this._batchAddRequestsWithRetries(requestsInBatch, options);
            executingRequests.add(requestPromise);
            void requestPromise.then((batchAddResult) => {
                executingRequests.delete(requestPromise);
                individualResults.push(batchAddResult);
            });
            if (executingRequests.size >= maxParallel) {
                await Promise.race(executingRequests);
            }
            i += requestsInBatch.length;
        }
        // Get results from remaining operations
        await Promise.all(executingRequests);
        // Combine individual results together
        const result = {
            processedRequests: [],
            unprocessedRequests: [],
        };
        individualResults.forEach(({ processedRequests, unprocessedRequests }) => {
            result.processedRequests.push(...processedRequests);
            result.unprocessedRequests.push(...unprocessedRequests);
        });
        return result;
    }
    /**
     * Deletes multiple requests from the queue in a single operation.
     *
     * Requests can be identified by either their ID or unique key.
     *
     * @param requests - Array of requests to delete (by id or uniqueKey)
     * @returns Result containing processed and unprocessed requests
     * @see https://docs.apify.com/api/v2/request-queue-requests-batch-delete
     */
    async batchDeleteRequests(requests) {
        var _a;
        (0, ow_1.default)(requests, ow_1.default.array
            .ofType(ow_1.default.any(ow_1.default.object.partialShape({ id: ow_1.default.string }), ow_1.default.object.partialShape({ uniqueKey: ow_1.default.string })))
            .minLength(1)
            .maxLength(consts_1.REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION));
        const { data } = await this.httpClient.call({
            url: this._url('requests/batch'),
            method: 'DELETE',
            timeout: Math.min(resource_client_1.SMALL_TIMEOUT_MILLIS, (_a = this.timeoutMillis) !== null && _a !== void 0 ? _a : Infinity),
            data: requests,
            params: this._params({
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(data)));
    }
    /**
     * Gets a specific request from the queue by its ID.
     *
     * @param id - Request ID
     * @returns The request object, or `undefined` if not found
     * @see https://docs.apify.com/api/v2/request-queue-request-get
     */
    async getRequest(id) {
        var _a;
        (0, ow_1.default)(id, ow_1.default.string);
        const requestOpts = {
            url: this._url(`requests/${id}`),
            method: 'GET',
            timeout: Math.min(resource_client_1.SMALL_TIMEOUT_MILLIS, (_a = this.timeoutMillis) !== null && _a !== void 0 ? _a : Infinity),
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * Updates a request in the queue.
     *
     * @param request - The updated request object (must include id)
     * @param options - Update options such as whether to move to front
     * @returns Information about the updated request
     * @see https://docs.apify.com/api/v2/request-queue-request-put
     */
    async updateRequest(request, options = {}) {
        var _a;
        (0, ow_1.default)(request, ow_1.default.object.partialShape({
            id: ow_1.default.string,
        }));
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            forefront: ow_1.default.optional.boolean,
        }));
        const response = await this.httpClient.call({
            url: this._url(`requests/${request.id}`),
            method: 'PUT',
            timeout: Math.min(resource_client_1.MEDIUM_TIMEOUT_MILLIS, (_a = this.timeoutMillis) !== null && _a !== void 0 ? _a : Infinity),
            data: request,
            params: this._params({
                forefront: options.forefront,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * Deletes a specific request from the queue.
     *
     * @param id - Request ID
     */
    async deleteRequest(id) {
        var _a;
        (0, ow_1.default)(id, ow_1.default.string);
        await this.httpClient.call({
            url: this._url(`requests/${id}`),
            method: 'DELETE',
            timeout: Math.min(resource_client_1.SMALL_TIMEOUT_MILLIS, (_a = this.timeoutMillis) !== null && _a !== void 0 ? _a : Infinity),
            params: this._params({
                clientKey: this.clientKey,
            }),
        });
    }
    /**
     * Prolongs the lock on a request to prevent it from being returned to other clients.
     *
     * This is useful when processing a request takes longer than expected and you need
     * to extend the lock duration to prevent other workers from picking it up. The lock
     * expiration time is reset to the current time plus the specified duration.
     *
     * @param id - Request ID (obtained from {@link listAndLockHead} or {@link getRequest})
     * @param options - Lock extension options
     * @param options.lockSecs - **Required.** New lock duration in seconds from now.
     * @param options.forefront - If `true`, moves the request to the beginning of the queue when the lock expires. Default is `false`.
     * @returns Object with new `lockExpiresAt` timestamp
     * @see https://docs.apify.com/api/v2/request-queue-request-lock-put
     *
     * @example
     * ```javascript
     * // Lock request for initial processing
     * const { items } = await client.requestQueue('my-queue').listAndLockHead({ lockSecs: 60, limit: 1 });
     * const request = items[0];
     *
     * // Processing takes longer than expected, extend the lock
     * await client.requestQueue('my-queue').prolongRequestLock(request.id, { lockSecs: 120 });
     * ```
     */
    async prolongRequestLock(id, options) {
        var _a;
        (0, ow_1.default)(id, ow_1.default.string);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            lockSecs: ow_1.default.number,
            forefront: ow_1.default.optional.boolean,
        }));
        const response = await this.httpClient.call({
            url: this._url(`requests/${id}/lock`),
            method: 'PUT',
            timeout: Math.min(resource_client_1.MEDIUM_TIMEOUT_MILLIS, (_a = this.timeoutMillis) !== null && _a !== void 0 ? _a : Infinity),
            params: this._params({
                forefront: options.forefront,
                lockSecs: options.lockSecs,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * Releases the lock on a request, allowing other clients to process it.
     *
     * This should be called after successfully processing a request or when you decide
     * not to process it.
     *
     * @param id - Request ID
     * @param options - Options such as whether to move to front
     * @see https://docs.apify.com/api/v2/request-queue-request-lock-delete
     */
    async deleteRequestLock(id, options = {}) {
        var _a;
        (0, ow_1.default)(id, ow_1.default.string);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            forefront: ow_1.default.optional.boolean,
        }));
        await this.httpClient.call({
            url: this._url(`requests/${id}/lock`),
            method: 'DELETE',
            timeout: Math.min(resource_client_1.SMALL_TIMEOUT_MILLIS, (_a = this.timeoutMillis) !== null && _a !== void 0 ? _a : Infinity),
            params: this._params({
                forefront: options.forefront,
                clientKey: this.clientKey,
            }),
        });
    }
    /**
     * Lists all requests in the queue.
     *
     * Returns a paginated list of all requests, allowing you to iterate through the entire
     * queue contents.
     *
     * @param options - Pagination options
     * @returns List of requests with pagination information
     * @see https://docs.apify.com/api/v2/request-queue-requests-get
     */
    listRequests(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number.not.negative,
            exclusiveStartId: ow_1.default.optional.string,
        }));
        const getPaginatedList = async (rqListOptions = {}) => {
            var _a;
            const response = await this.httpClient.call({
                url: this._url('requests'),
                method: 'GET',
                timeout: Math.min(resource_client_1.MEDIUM_TIMEOUT_MILLIS, (_a = this.timeoutMillis) !== null && _a !== void 0 ? _a : Infinity),
                params: this._params({ ...rqListOptions, clientKey: this.clientKey }),
            });
            return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
        };
        const paginatedListPromise = getPaginatedList(options);
        async function* asyncGenerator() {
            let currentPage = await paginatedListPromise;
            yield* currentPage.items;
            let remainingItems = options.limit ? options.limit - currentPage.items.length : undefined;
            // RQ API response does not indicate whether there are more requests left, so we have to try and in case
            // of exhausting all requests we get response with empty items which ends the loop.
            while (currentPage.items.length > 0 && // Continue only if at least some items were returned in the last page.
                (remainingItems === undefined || remainingItems > 0) // Continue only if the limit was not exceeded.
            ) {
                const exclusiveStartId = currentPage.items[currentPage.items.length - 1].id;
                const newOptions = { ...options, limit: remainingItems, exclusiveStartId };
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
     * Unlocks all requests locked by this client.
     *
     * This is useful for releasing all locks at once, for example when shutting down
     * a crawler gracefully.
     *
     * @returns Number of requests that were unlocked
     * @see https://docs.apify.com/api/v2/request-queue-requests-unlock-post
     */
    async unlockRequests() {
        var _a;
        const response = await this.httpClient.call({
            url: this._url('requests/unlock'),
            method: 'POST',
            timeout: Math.min(resource_client_1.MEDIUM_TIMEOUT_MILLIS, (_a = this.timeoutMillis) !== null && _a !== void 0 ? _a : Infinity),
            params: this._params({
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * Returns an async iterable for paginating through all requests in the queue.
     *
     * This allows you to efficiently process all requests using a for-await-of loop,
     * automatically handling pagination behind the scenes.
     *
     * @param options - Pagination options
     * @returns An async iterable of request pages
     * @see https://docs.apify.com/api/v2/request-queue-requests-get
     *
     * @example
     * ```javascript
     * for await (const { items } of client.requestQueue('my-queue').paginateRequests({ limit: 100 })) {
     *   items.forEach((request) => console.log(request.url));
     * }
     * ```
     */
    paginateRequests(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number.not.negative,
            maxPageLimit: ow_1.default.optional.number,
            exclusiveStartId: ow_1.default.optional.string,
        }));
        const { limit, exclusiveStartId, maxPageLimit = DEFAULT_REQUEST_QUEUE_REQUEST_PAGE_LIMIT } = options;
        return new utils_1.PaginationIterator({
            getPage: this.listRequests.bind(this),
            limit,
            exclusiveStartId,
            maxPageLimit,
        });
    }
}
exports.RequestQueueClient = RequestQueueClient;
//# sourceMappingURL=request_queue.js.map