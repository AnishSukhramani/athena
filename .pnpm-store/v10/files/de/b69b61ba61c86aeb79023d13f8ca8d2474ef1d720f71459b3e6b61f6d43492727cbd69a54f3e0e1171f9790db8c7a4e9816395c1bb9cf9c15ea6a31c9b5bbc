"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApifyClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const consts_1 = require("@apify/consts");
const log_1 = tslib_1.__importDefault(require("@apify/log"));
const http_client_1 = require("./http_client");
const actor_1 = require("./resource_clients/actor");
const actor_collection_1 = require("./resource_clients/actor_collection");
const build_1 = require("./resource_clients/build");
const build_collection_1 = require("./resource_clients/build_collection");
const dataset_1 = require("./resource_clients/dataset");
const dataset_collection_1 = require("./resource_clients/dataset_collection");
const key_value_store_1 = require("./resource_clients/key_value_store");
const key_value_store_collection_1 = require("./resource_clients/key_value_store_collection");
const log_2 = require("./resource_clients/log");
const request_queue_1 = require("./resource_clients/request_queue");
const request_queue_collection_1 = require("./resource_clients/request_queue_collection");
const run_1 = require("./resource_clients/run");
const run_collection_1 = require("./resource_clients/run_collection");
const schedule_1 = require("./resource_clients/schedule");
const schedule_collection_1 = require("./resource_clients/schedule_collection");
const store_collection_1 = require("./resource_clients/store_collection");
const task_1 = require("./resource_clients/task");
const task_collection_1 = require("./resource_clients/task_collection");
const user_1 = require("./resource_clients/user");
const webhook_1 = require("./resource_clients/webhook");
const webhook_collection_1 = require("./resource_clients/webhook_collection");
const webhook_dispatch_1 = require("./resource_clients/webhook_dispatch");
const webhook_dispatch_collection_1 = require("./resource_clients/webhook_dispatch_collection");
const statistics_1 = require("./statistics");
const DEFAULT_TIMEOUT_SECS = 360;
/**
 * The official JavaScript client for the Apify API.
 *
 * Provides programmatic access to all Apify platform resources including Actors, runs, datasets,
 * key-value stores, request queues, and more. Works in both Node.js and browser environments.
 *
 * @example
 * ```javascript
 * import { ApifyClient } from 'apify-client';
 *
 * const client = new ApifyClient({ token: 'my-token' });
 *
 * // Start an Actor and wait for it to finish
 * const run = await client.actor('my-actor-id').call();
 *
 * // Fetch dataset items
 * const { items } = await client.dataset(run.defaultDatasetId).listItems();
 * ```
 *
 * @see https://docs.apify.com/api/v2
 */
class ApifyClient {
    constructor(options = {}) {
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "publicBaseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "token", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stats", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "httpClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            baseUrl: ow_1.default.optional.string,
            publicBaseUrl: ow_1.default.optional.string,
            maxRetries: ow_1.default.optional.number,
            minDelayBetweenRetriesMillis: ow_1.default.optional.number,
            requestInterceptors: ow_1.default.optional.array,
            timeoutSecs: ow_1.default.optional.number,
            token: ow_1.default.optional.string,
            userAgentSuffix: ow_1.default.optional.any(ow_1.default.string, ow_1.default.array.ofType(ow_1.default.string)),
        }));
        const { baseUrl = 'https://api.apify.com', publicBaseUrl = 'https://api.apify.com', maxRetries = 8, minDelayBetweenRetriesMillis = 500, requestInterceptors = [], timeoutSecs = DEFAULT_TIMEOUT_SECS, token, } = options;
        const tempBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, baseUrl.length - 1) : baseUrl;
        this.baseUrl = `${tempBaseUrl}/v2`;
        const tempPublicBaseUrl = publicBaseUrl.endsWith('/')
            ? publicBaseUrl.slice(0, publicBaseUrl.length - 1)
            : publicBaseUrl;
        this.publicBaseUrl = `${tempPublicBaseUrl}/v2`;
        this.token = token;
        this.stats = new statistics_1.Statistics();
        this.logger = log_1.default.child({ prefix: 'ApifyClient' });
        this.httpClient = new http_client_1.HttpClient({
            apifyClientStats: this.stats,
            maxRetries,
            minDelayBetweenRetriesMillis,
            requestInterceptors,
            timeoutSecs,
            logger: this.logger,
            token: this.token,
            userAgentSuffix: options.userAgentSuffix,
        });
    }
    _options() {
        return {
            baseUrl: this.baseUrl,
            publicBaseUrl: this.publicBaseUrl,
            apifyClient: this,
            httpClient: this.httpClient,
        };
    }
    /**
     * Returns a client for managing Actors in your account.
     *
     * Provides access to the Actor collection, allowing you to list, create, and search for Actors.
     *
     * @returns A client for the Actors collection
     * @see https://docs.apify.com/api/v2/acts-get
     */
    actors() {
        return new actor_collection_1.ActorCollectionClient(this._options());
    }
    /**
     * Returns a client for a specific Actor.
     *
     * Use this to get, update, delete, start, or call an Actor, as well as manage its builds,
     * runs, versions, and webhooks.
     *
     * @param id - Actor ID or username/name
     * @returns A client for the specific Actor
     * @see https://docs.apify.com/api/v2/act-get
     *
     * @example
     * ```javascript
     * // Call an Actor and wait for it to finish
     * const run = await client.actor('apify/web-scraper').call({ url: 'https://example.com' });
     * ```
     */
    actor(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new actor_1.ActorClient({
            id,
            ...this._options(),
        });
    }
    /**
     * Returns a client for managing Actor builds in your account.
     *
     * Lists all builds across all of your Actors.
     *
     * @returns A client for Actor builds collection
     * @see https://docs.apify.com/api/v2/actor-builds-get
     */
    builds() {
        return new build_collection_1.BuildCollectionClient(this._options());
    }
    /**
     * Returns a client for a specific Actor build.
     *
     * Use this to get details about a build, wait for it to finish, or access its logs.
     *
     * @param id - Build ID
     * @returns A client for the specified build
     * @see https://docs.apify.com/api/v2/actor-build-get
     */
    build(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new build_1.BuildClient({
            id,
            ...this._options(),
        });
    }
    /**
     * Returns a client for managing datasets in your account.
     *
     * Datasets store structured data results from Actor runs. Use this to list or create datasets.
     *
     * @returns A client for the Datasets collection
     * @see https://docs.apify.com/api/v2/datasets-get
     */
    datasets() {
        return new dataset_collection_1.DatasetCollectionClient(this._options());
    }
    /**
     * Returns a client for a specific dataset.
     *
     * Use this to read, write, and manage items in the dataset. Datasets contain structured
     * data stored as individual items (records).
     *
     * @template Data - Type of items stored in the dataset
     * @param id - Dataset ID or name
     * @returns A client for the specific Dataset
     * @see https://docs.apify.com/api/v2/dataset-get
     *
     * @example
     * ```javascript
     * // Push items to a dataset
     * await client.dataset('my-dataset').pushItems([
     *   { url: 'https://example.com', title: 'Example' },
     *   { url: 'https://test.com', title: 'Test' }
     * ]);
     *
     * // Retrieve items
     * const { items } = await client.dataset('my-dataset').listItems();
     * ```
     */
    dataset(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new dataset_1.DatasetClient({
            id,
            ...this._options(),
        });
    }
    /**
     * Returns a client for managing key-value stores in your account.
     *
     * Key-value stores are used to store arbitrary data records or files.
     *
     * @returns A client for the Key-value stores collection
     * @see https://docs.apify.com/api/v2/key-value-stores-get
     */
    keyValueStores() {
        return new key_value_store_collection_1.KeyValueStoreCollectionClient(this._options());
    }
    /**
     * Returns a client for a specific key-value store.
     *
     * Use this to read, write, and delete records in the store. Key-value stores can hold
     * any type of data including text, JSON, images, and other files.
     *
     * @param id - Key-value store ID or name
     * @returns A client for the specific key-value store
     * @see https://docs.apify.com/api/v2/key-value-store-get
     *
     * @example
     * ```javascript
     * // Save a record
     * await client.keyValueStore('my-store').setRecord({ key: 'OUTPUT', value: { foo: 'bar' } });
     *
     * // Get a record
     * const record = await client.keyValueStore('my-store').getRecord('OUTPUT');
     * ```
     */
    keyValueStore(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new key_value_store_1.KeyValueStoreClient({
            id,
            ...this._options(),
        });
    }
    /**
     * Returns a client for accessing logs of an Actor build or run.
     *
     * @param buildOrRunId - Build ID or run ID
     * @returns A client for accessing logs
     * @see https://docs.apify.com/api/v2/log-get
     */
    log(buildOrRunId) {
        (0, ow_1.default)(buildOrRunId, ow_1.default.string.nonEmpty);
        return new log_2.LogClient({
            id: buildOrRunId,
            ...this._options(),
        });
    }
    /**
     * Returns a client for managing request queues in your account.
     *
     * Request queues store URLs to be crawled, along with their metadata.
     *
     * @returns A client for the Request queues collection
     * @see https://docs.apify.com/api/v2/request-queues-get
     */
    requestQueues() {
        return new request_queue_collection_1.RequestQueueCollectionClient(this._options());
    }
    /**
     * Returns a client for a specific request queue.
     *
     * Use this to add, retrieve, and manage requests in the queue. Request queues are used
     * by web crawlers to manage URLs that need to be visited.
     *
     * @param id - Request queue ID or name
     * @param options - Configuration options for the request queue client
     * @returns A client for the specific Request queue
     * @see https://docs.apify.com/api/v2/request-queue-get
     *
     * @example
     * ```javascript
     * // Add requests to a queue
     * const queue = client.requestQueue('my-queue');
     * await queue.addRequest({ url: 'https://example.com', uniqueKey: 'example' });
     *
     * // Get and lock the next request
     * const { items } = await queue.listAndLockHead({ lockSecs: 60 });
     * ```
     */
    requestQueue(id, options = {}) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            clientKey: ow_1.default.optional.string.nonEmpty,
            timeoutSecs: ow_1.default.optional.number,
        }));
        const apiClientOptions = {
            id,
            ...this._options(),
        };
        return new request_queue_1.RequestQueueClient(apiClientOptions, options);
    }
    /**
     * Returns a client for managing Actor runs in your account.
     *
     * Lists all runs across all of your Actors.
     *
     * @returns A client for the run collection
     * @see https://docs.apify.com/api/v2/actor-runs-get
     */
    runs() {
        return new run_collection_1.RunCollectionClient({
            ...this._options(),
            resourcePath: 'actor-runs',
        });
    }
    /**
     * Returns a client for a specific Actor run.
     *
     * Use this to get details about a run, wait for it to finish, abort it, or access its
     * dataset, key-value store, and request queue.
     *
     * @param id - Run ID
     * @returns A client for the specified run
     * @see https://docs.apify.com/api/v2/actor-run-get
     *
     * @example
     * ```javascript
     * // Wait for a run to finish
     * const run = await client.run('run-id').waitForFinish();
     *
     * // Access run's dataset
     * const { items } = await client.run('run-id').dataset().listItems();
     * ```
     */
    run(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new run_1.RunClient({
            id,
            ...this._options(),
        });
    }
    /**
     * Returns a client for managing Actor tasks in your account.
     *
     * Tasks are pre-configured Actor runs with stored input that can be executed repeatedly.
     *
     * @returns A client for the task collection
     * @see https://docs.apify.com/api/v2/actor-tasks-get
     */
    tasks() {
        return new task_collection_1.TaskCollectionClient(this._options());
    }
    /**
     * Returns a client for a specific Actor task.
     *
     * Use this to get, update, delete, or run a task with pre-configured input.
     *
     * @param id - Task ID or username/task-name
     * @returns A client for the specified task
     * @see https://docs.apify.com/api/v2/actor-task-get
     *
     * @example
     * ```javascript
     * // Run a task and wait for it to finish
     * const run = await client.task('my-task').call();
     * ```
     */
    task(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new task_1.TaskClient({
            id,
            ...this._options(),
        });
    }
    /**
     * Returns a client for managing schedules in your account.
     *
     * Schedules automatically start Actor or task runs at specified times.
     *
     * @returns A client for the Schedules collection
     * @see https://docs.apify.com/api/v2/schedules-get
     */
    schedules() {
        return new schedule_collection_1.ScheduleCollectionClient(this._options());
    }
    /**
     * Returns a client for a specific schedule.
     *
     * Use this to get, update, or delete a schedule.
     *
     * @param id - Schedule ID
     * @returns A client for the specific Schedule
     * @see https://docs.apify.com/api/v2/schedule-get
     */
    schedule(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new schedule_1.ScheduleClient({
            id,
            ...this._options(),
        });
    }
    /**
     * Returns a client for accessing user data.
     *
     * By default, returns information about the current user (determined by the API token).
     *
     * @param id - User ID or username. Defaults to 'me' (current user)
     * @returns A client for the user
     * @see https://docs.apify.com/api/v2/user-get
     */
    user(id = consts_1.ME_USER_NAME_PLACEHOLDER) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new user_1.UserClient({
            id,
            ...this._options(),
        });
    }
    /**
     * Returns a client for managing webhooks in your account.
     *
     * Webhooks notify external services when specific events occur (e.g., Actor run finishes).
     *
     * @returns A client for the Webhooks collection
     * @see https://docs.apify.com/api/v2/webhooks-get
     */
    webhooks() {
        return new webhook_collection_1.WebhookCollectionClient(this._options());
    }
    /**
     * Returns a client for a specific webhook.
     *
     * Use this to get, update, delete, or test a webhook.
     *
     * @param id - Webhook ID
     * @returns A client for the specific webhook
     * @see https://docs.apify.com/api/v2/webhook-get
     */
    webhook(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new webhook_1.WebhookClient({
            id,
            ...this._options(),
        });
    }
    /**
     * Returns a client for viewing webhook dispatches in your account.
     *
     * Webhook dispatches represent individual invocations of webhooks.
     *
     * @returns A client for the webhook dispatches collection
     * @see https://docs.apify.com/api/v2/webhook-dispatches-get
     */
    webhookDispatches() {
        return new webhook_dispatch_collection_1.WebhookDispatchCollectionClient(this._options());
    }
    /**
     * Returns a client for a specific webhook dispatch.
     *
     * @param id - Webhook dispatch ID
     * @returns A client for the specific webhook dispatch
     * @see https://docs.apify.com/api/v2/webhook-dispatch-get
     */
    webhookDispatch(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new webhook_dispatch_1.WebhookDispatchClient({
            id,
            ...this._options(),
        });
    }
    /**
     * Returns a client for browsing Actors in Apify Store.
     *
     * Use this to search and retrieve information about public Actors.
     *
     * @returns A client for the Apify Store
     * @see https://docs.apify.com/api/v2/store-get
     */
    store() {
        return new store_collection_1.StoreCollectionClient(this._options());
    }
    /**
     * Sets a status message for the current Actor run.
     *
     * This is a convenience method that updates the status message of the run specified by
     * the `ACTOR_RUN_ID` environment variable. Only works when called from within an Actor run.
     *
     * @param message - The status message to set
     * @param options - Additional options for the status message
     * @throws {Error} If `ACTOR_RUN_ID` environment variable is not set
     */
    async setStatusMessage(message, options) {
        const runId = process.env[consts_1.ACTOR_ENV_VARS.RUN_ID];
        if (!runId) {
            throw new Error(`Environment variable ${consts_1.ACTOR_ENV_VARS.RUN_ID} is not set!`);
        }
        await this.run(runId).update({
            statusMessage: message,
            ...options,
        });
    }
}
exports.ApifyClient = ApifyClient;
//# sourceMappingURL=apify_client.js.map