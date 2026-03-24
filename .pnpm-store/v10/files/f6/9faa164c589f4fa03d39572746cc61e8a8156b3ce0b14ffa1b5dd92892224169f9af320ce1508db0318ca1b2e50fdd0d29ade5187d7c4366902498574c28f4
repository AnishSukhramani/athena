"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const consts_1 = require("@apify/consts");
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
const run_1 = require("./run");
const run_collection_1 = require("./run_collection");
const webhook_collection_1 = require("./webhook_collection");
/**
 * Client for managing a specific Actor task.
 *
 * Tasks are pre-configured Actor runs with saved input and options. This client provides methods
 * to start, call, update, and delete tasks, as well as manage their runs and webhooks.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const taskClient = client.task('my-task-id');
 *
 * // Start a task
 * const run = await taskClient.start();
 *
 * // Call a task and wait for it to finish
 * const finishedRun = await taskClient.call();
 * ```
 *
 * @see https://docs.apify.com/platform/actors/running/tasks
 */
class TaskClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'actor-tasks',
            ...options,
        });
    }
    /**
     * Retrieves the Actor task.
     *
     * @returns The task object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/actor-task-get
     */
    async get() {
        return this._get();
    }
    /**
     * Updates the task with the specified fields.
     *
     * @param newFields - Fields to update.
     * @returns The updated task object.
     * @see https://docs.apify.com/api/v2/actor-task-put
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * Deletes the Task.
     *
     * @see https://docs.apify.com/api/v2/actor-task-delete
     */
    async delete() {
        return this._delete();
    }
    /**
     * Starts an Actor task and immediately returns the Run object.
     *
     * @param input - Input overrides for the task. If not provided, the task's saved input is used.
     * @param options - Run options.
     * @param options.build - Tag or number of the Actor build to run (e.g., `'beta'` or `'1.2.345'`).
     * @param options.memory - Memory in megabytes allocated for the run.
     * @param options.timeout - Timeout for the run in seconds. Zero means no timeout.
     * @param options.waitForFinish - Maximum time to wait (in seconds, max 60s) for the run to finish before returning.
     * @param options.webhooks - Webhooks to trigger for specific Actor run events.
     * @param options.maxItems - Maximum number of dataset items (for pay-per-result Actors).
     * @param options.maxTotalChargeUsd - Maximum cost in USD (for pay-per-event Actors).
     * @param options.restartOnError - Whether to restart the run on error.
     * @returns The Actor Run object.
     * @see https://docs.apify.com/api/v2/actor-task-runs-post
     */
    async start(input, options = {}) {
        (0, ow_1.default)(input, ow_1.default.optional.object);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            build: ow_1.default.optional.string,
            memory: ow_1.default.optional.number,
            timeout: ow_1.default.optional.number,
            waitForFinish: ow_1.default.optional.number,
            webhooks: ow_1.default.optional.array.ofType(ow_1.default.object),
            maxItems: ow_1.default.optional.number.not.negative,
            maxTotalChargeUsd: ow_1.default.optional.number.not.negative,
            restartOnError: ow_1.default.optional.boolean,
        }));
        const { waitForFinish, timeout, memory, build, maxItems, maxTotalChargeUsd, restartOnError } = options;
        const params = {
            waitForFinish,
            timeout,
            memory,
            build,
            webhooks: (0, utils_1.stringifyWebhooksToBase64)(options.webhooks),
            maxItems,
            maxTotalChargeUsd,
            restartOnError,
        };
        const request = {
            url: this._url('runs'),
            method: 'POST',
            data: input,
            params: this._params(params),
            // Apify internal property. Tells the request serialization interceptor
            // to stringify functions to JSON, instead of omitting them.
            stringifyFunctions: true,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await this.httpClient.call(request);
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * Starts a task and waits for it to finish before returning the Run object.
     * It waits indefinitely, unless the `waitSecs` option is provided.
     *
     * @param input - Input overrides for the task. If not provided, the task's saved input is used.
     * @param options - Run and wait options.
     * @param options.build - Tag or number of the Actor build to run.
     * @param options.memory - Memory in megabytes allocated for the run.
     * @param options.timeout - Timeout for the run in seconds.
     * @param options.waitSecs - Maximum time to wait for the run to finish, in seconds. If omitted, waits indefinitely.
     * @param options.webhooks - Webhooks to trigger for specific Actor run events.
     * @param options.maxItems - Maximum number of dataset items (for pay-per-result Actors).
     * @param options.maxTotalChargeUsd - Maximum cost in USD (for pay-per-event Actors).
     * @param options.restartOnError - Whether to restart the run on error.
     * @returns The Actor run object.
     * @see https://docs.apify.com/api/v2/actor-task-runs-post
     */
    async call(input, options = {}) {
        (0, ow_1.default)(input, ow_1.default.optional.object);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            build: ow_1.default.optional.string,
            memory: ow_1.default.optional.number,
            timeout: ow_1.default.optional.number.not.negative,
            waitSecs: ow_1.default.optional.number.not.negative,
            webhooks: ow_1.default.optional.array.ofType(ow_1.default.object),
            maxItems: ow_1.default.optional.number.not.negative,
            maxTotalChargeUsd: ow_1.default.optional.number.not.negative,
            restartOnError: ow_1.default.optional.boolean,
        }));
        const { waitSecs, ...startOptions } = options;
        const { id } = await this.start(input, startOptions);
        // Calling root client because we need access to top level API.
        // Creating a new instance of RunClient here would only allow
        // setting it up as a nested route under task API.
        return this.apifyClient.run(id).waitForFinish({ waitSecs });
    }
    /**
     * Retrieves the Actor task's input object.
     *
     * @returns The Task's input, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/actor-task-input-get
     */
    async getInput() {
        const requestOpts = {
            url: this._url('input'),
            method: 'GET',
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)(response.data);
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * Updates the Actor task's input object.
     *
     * @param newFields - New input data for the task.
     * @returns The updated task input.
     * @see https://docs.apify.com/api/v2/actor-task-input-put
     */
    async updateInput(newFields) {
        const response = await this.httpClient.call({
            url: this._url('input'),
            method: 'PUT',
            params: this._params(),
            data: newFields,
        });
        return (0, utils_1.cast)(response.data);
    }
    /**
     * Returns a client for the last run of this task.
     *
     * @param options - Filter options for the last run.
     * @param options.status - Filter by run status (e.g., `'SUCCEEDED'`, `'FAILED'`, `'RUNNING'`).
     * @param options.origin - Filter by run origin (e.g., `'WEB'`, `'API'`, `'SCHEDULE'`).
     * @returns A client for the last run.
     * @see https://docs.apify.com/api/v2/actor-task-runs-last-get
     */
    lastRun(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            status: ow_1.default.optional.string.oneOf(Object.values(consts_1.ACT_JOB_STATUSES)),
            origin: ow_1.default.optional.string.oneOf(Object.values(consts_1.META_ORIGINS)),
        }));
        return new run_1.RunClient(this._subResourceOptions({
            id: 'last',
            params: this._params(options),
            resourcePath: 'runs',
        }));
    }
    /**
     * Returns a client for the Runs of this Task.
     *
     * @returns A client for the task's runs.
     * @see https://docs.apify.com/api/v2/actor-task-runs-get
     */
    runs() {
        return new run_collection_1.RunCollectionClient(this._subResourceOptions({
            resourcePath: 'runs',
        }));
    }
    /**
     * Returns a client for the Webhooks of this Task.
     *
     * @returns A client for the task's webhooks.
     * @see https://docs.apify.com/api/v2/actor-task-webhooks-get
     */
    webhooks() {
        return new webhook_collection_1.WebhookCollectionClient(this._subResourceOptions());
    }
}
exports.TaskClient = TaskClient;
//# sourceMappingURL=task.js.map