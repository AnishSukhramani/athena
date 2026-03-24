"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const consts_1 = require("@apify/consts");
const log_1 = require("@apify/log");
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
const actor_version_1 = require("./actor_version");
const actor_version_collection_1 = require("./actor_version_collection");
const build_1 = require("./build");
const build_collection_1 = require("./build_collection");
const run_1 = require("./run");
const run_collection_1 = require("./run_collection");
const webhook_collection_1 = require("./webhook_collection");
/**
 * Client for managing a specific Actor.
 *
 * Provides methods to start, call, build, update, and delete an Actor, as well as manage its
 * versions, builds, runs, and webhooks.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const actorClient = client.actor('my-actor-id');
 *
 * // Start an Actor
 * const run = await actorClient.start(input, { memory: 256 });
 *
 * // Call an Actor and wait for it to finish
 * const finishedRun = await actorClient.call({ url: 'https://example.com' });
 * ```
 *
 * @see https://docs.apify.com/platform/actors
 */
class ActorClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'acts',
            ...options,
        });
    }
    /**
     * Gets the Actor object from the Apify API.
     *
     * @returns The Actor object, or `undefined` if it does not exist
     * @see https://docs.apify.com/api/v2/act-get
     */
    async get() {
        return this._get();
    }
    /**
     * Updates the Actor with specified fields.
     *
     * @param newFields - Fields to update in the Actor
     * @returns The updated Actor object
     * @see https://docs.apify.com/api/v2/act-put
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * Deletes the Actor.
     *
     * @see https://docs.apify.com/api/v2/act-delete
     */
    async delete() {
        return this._delete();
    }
    /**
     * Starts the Actor and immediately returns the Run object.
     *
     * The Actor run can be configured with optional input and various options. The run starts
     * asynchronously and this method returns immediately without waiting for completion.
     * Use the {@link call} method if you want to wait for the Actor to finish.
     *
     * @param input - Input for the Actor. Can be any JSON-serializable value (object, array, string, number).
     *                If `contentType` is specified in options, input should be a string or Buffer.
     * @param options - Run configuration options
     * @param options.build - Tag or number of the build to run (e.g., `'beta'` or `'1.2.345'`). If not provided, uses the default build.
     * @param options.memory - Memory in megabytes allocated for the run. If not provided, uses the Actor's default memory setting.
     * @param options.timeout - Timeout for the run in seconds. Zero means no timeout. If not provided, uses the Actor's default timeout.
     * @param options.waitForFinish - Maximum time to wait (in seconds, max 60s) for the run to finish on the API side before returning. Default is 0 (returns immediately).
     * @param options.webhooks - Webhooks to trigger when the Actor run reaches a specific state (e.g., `SUCCEEDED`, `FAILED`).
     * @param options.maxItems - Maximum number of dataset items that will be charged (only for pay-per-result Actors).
     * @param options.maxTotalChargeUsd - Maximum cost in USD (only for pay-per-event Actors).
     * @param options.contentType - Content type of the input. If specified, input must be a string or Buffer.
     * @returns The Actor run object with status, usage, and storage IDs
     * @see https://docs.apify.com/api/v2/act-runs-post
     *
     * @example
     * ```javascript
     * // Start Actor with simple input
     * const run = await client.actor('my-actor').start({ url: 'https://example.com' });
     * console.log(`Run started with ID: ${run.id}, status: ${run.status}`);
     *
     * // Start Actor with specific build and memory
     * const run = await client.actor('my-actor').start(
     *   { url: 'https://example.com' },
     *   { build: '0.1.2', memory: 512, timeout: 300 }
     * );
     * ```
     */
    async start(input, options = {}) {
        // input can be anything, so no point in validating it. E.g. if you set content-type to application/pdf
        // then it will process input as a buffer.
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            build: ow_1.default.optional.string,
            contentType: ow_1.default.optional.string,
            memory: ow_1.default.optional.number,
            timeout: ow_1.default.optional.number,
            waitForFinish: ow_1.default.optional.number,
            webhooks: ow_1.default.optional.array.ofType(ow_1.default.object),
            maxItems: ow_1.default.optional.number.not.negative,
            maxTotalChargeUsd: ow_1.default.optional.number.not.negative,
            restartOnError: ow_1.default.optional.boolean,
            forcePermissionLevel: ow_1.default.optional.string.oneOf(Object.values(consts_1.ACTOR_PERMISSION_LEVEL)),
        }));
        const { waitForFinish, timeout, memory, build, maxItems, maxTotalChargeUsd, restartOnError, forcePermissionLevel, } = options;
        const params = {
            waitForFinish,
            timeout,
            memory,
            build,
            webhooks: (0, utils_1.stringifyWebhooksToBase64)(options.webhooks),
            maxItems,
            maxTotalChargeUsd,
            restartOnError,
            forcePermissionLevel,
        };
        const request = {
            url: this._url('runs'),
            method: 'POST',
            data: input,
            params: this._params(params),
            // Apify internal property. Tells the request serialization interceptor
            // to stringify functions to JSON, instead of omitting them.
            // TODO: remove this ts-expect-error once we migrate HttpClient to TS and define Apify
            // extension of Axios configs
            // @ts-expect-error Apify extension
            stringifyFunctions: true,
        };
        if (options.contentType) {
            request.headers = {
                'content-type': options.contentType,
            };
        }
        const response = await this.httpClient.call(request);
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * Starts the Actor and waits for it to finish before returning the Run object.
     *
     * This is a convenience method that starts the Actor run and waits for its completion
     * by polling the run status. It optionally streams logs to the console or a custom Log instance.
     * By default, it waits indefinitely unless the `waitSecs` option is provided.
     *
     * @param input - Input for the Actor. Can be any JSON-serializable value (object, array, string, number).
     *                If `contentType` is specified in options, input should be a string or Buffer.
     * @param options - Run configuration options (extends all options from {@link start})
     * @param options.waitSecs - Maximum time to wait for the run to finish, in seconds. If omitted, waits indefinitely.
     * @param options.log - Log instance for streaming run logs. Use `'default'` for console output, `null` to disable logging, or provide a custom Log instance.
     * @param options.build - Tag or number of the build to run (e.g., `'beta'` or `'1.2.345'`).
     * @param options.memory - Memory in megabytes allocated for the run.
     * @param options.timeout - Maximum run duration in seconds.
     * @returns The finished Actor run object with final status (`SUCCEEDED`, `FAILED`, `ABORTED`, or `TIMED-OUT`)
     * @see https://docs.apify.com/api/v2/act-runs-post
     *
     * @example
     * ```javascript
     * // Run an Actor and wait for it to finish
     * const run = await client.actor('my-actor').call({ url: 'https://example.com' });
     * console.log(`Run finished with status: ${run.status}`);
     * console.log(`Dataset ID: ${run.defaultDatasetId}`);
     *
     * // Run with a timeout and log streaming to console
     * const run = await client.actor('my-actor').call(
     *   { url: 'https://example.com' },
     *   { waitSecs: 300, log: 'default' }
     * );
     *
     * // Run with custom log instance
     * import { Log } from '@apify/log';
     * const log = new Log({ prefix: 'My Actor' });
     * const run = await client.actor('my-actor').call({ url: 'https://example.com' }, { log });
     * ```
     */
    async call(input, options = {}) {
        // input can be anything, so no point in validating it. E.g. if you set content-type to application/pdf
        // then it will process input as a buffer.
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            build: ow_1.default.optional.string,
            contentType: ow_1.default.optional.string,
            memory: ow_1.default.optional.number,
            timeout: ow_1.default.optional.number.not.negative,
            waitSecs: ow_1.default.optional.number.not.negative,
            webhooks: ow_1.default.optional.array.ofType(ow_1.default.object),
            maxItems: ow_1.default.optional.number.not.negative,
            maxTotalChargeUsd: ow_1.default.optional.number.not.negative,
            log: ow_1.default.optional.any(ow_1.default.null, ow_1.default.object.instanceOf(log_1.Log), ow_1.default.string.equals('default')),
            restartOnError: ow_1.default.optional.boolean,
            forcePermissionLevel: ow_1.default.optional.string.oneOf(Object.values(consts_1.ACTOR_PERMISSION_LEVEL)),
        }));
        const { waitSecs, log, ...startOptions } = options;
        const { id } = await this.start(input, startOptions);
        // Calling root client because we need access to top level API.
        // Creating a new instance of RunClient here would only allow
        // setting it up as a nested route under actor API.
        const newRunClient = this.apifyClient.run(id);
        const streamedLog = await newRunClient.getStreamedLog({ toLog: options === null || options === void 0 ? void 0 : options.log });
        streamedLog === null || streamedLog === void 0 ? void 0 : streamedLog.start();
        return this.apifyClient
            .run(id)
            .waitForFinish({ waitSecs })
            .finally(async () => {
            await (streamedLog === null || streamedLog === void 0 ? void 0 : streamedLog.stop());
        });
    }
    /**
     * Builds the Actor.
     *
     * Creates a new build of the specified Actor version. The build compiles the Actor's
     * source code, installs dependencies, and prepares it for execution.
     *
     * @param versionNumber - Version number or tag to build (e.g., `'0.1'`, `'0.2'`, `'latest'`)
     * @param options - Build configuration options
     * @param options.betaPackages - If `true`, the build uses beta versions of Apify NPM packages.
     * @param options.tag - Tag to be applied to the build (e.g., `'latest'`, `'beta'`). Existing tag with the same name will be replaced.
     * @param options.useCache - If `false`, Docker build cache will be ignored. Default is `true`.
     * @param options.waitForFinish - Maximum time to wait (in seconds, max 60s) for the build to finish on the API side before returning. Default is 0 (returns immediately).
     * @returns The Build object with status and build details
     * @see https://docs.apify.com/api/v2/act-builds-post
     *
     * @example
     * ```javascript
     * // Start a build and return immediately
     * const build = await client.actor('my-actor').build('0.1');
     * console.log(`Build ${build.id} started with status: ${build.status}`);
     *
     * // Build and wait up to 120 seconds for it to finish
     * const build = await client.actor('my-actor').build('0.1', {
     *   waitForFinish: 120,
     *   tag: 'latest',
     *   useCache: true
     * });
     * ```
     */
    async build(versionNumber, options = {}) {
        (0, ow_1.default)(versionNumber, ow_1.default.string);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            betaPackages: ow_1.default.optional.boolean,
            tag: ow_1.default.optional.string,
            useCache: ow_1.default.optional.boolean,
            waitForFinish: ow_1.default.optional.number,
        }));
        const response = await this.httpClient.call({
            url: this._url('builds'),
            method: 'POST',
            params: this._params({
                version: versionNumber,
                ...options,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * Retrieves the default build of the Actor.
     *
     * @param options - Options for getting the build.
     * @returns A client for the default build.
     * @see https://docs.apify.com/api/v2/act-build-default-get
     */
    async defaultBuild(options = {}) {
        const response = await this.httpClient.call({
            url: this._url('builds/default'),
            method: 'GET',
            params: this._params(options),
        });
        const { id } = (0, utils_1.pluckData)(response.data);
        return new build_1.BuildClient({
            baseUrl: this.apifyClient.baseUrl,
            publicBaseUrl: this.apifyClient.publicBaseUrl,
            httpClient: this.httpClient,
            apifyClient: this.apifyClient,
            id,
        });
    }
    /**
     * Returns a client for the last run of this Actor.
     *
     * Provides access to the most recent Actor run, optionally filtered by status or origin.
     *
     * @param options - Options to filter the last run
     * @param options.status - Filter by run status (e.g., `'SUCCEEDED'`, `'FAILED'`, `'RUNNING'`, `'ABORTED'`, `'TIMED-OUT'`).
     * @param options.origin - Filter by run origin (e.g., `'DEVELOPMENT'`, `'WEB'`, `'API'`, `'SCHEDULER'`).
     * @returns A client for the last run
     * @see https://docs.apify.com/api/v2/act-runs-last-get
     *
     * @example
     * ```javascript
     * // Get the last successful run
     * const lastRun = await client.actor('my-actor').lastRun({ status: 'SUCCEEDED' }).get();
     * ```
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
     * Returns a client for managing builds of this Actor.
     *
     * @returns A client for the Actor's build collection
     * @see https://docs.apify.com/api/v2/act-builds-get
     */
    builds() {
        return new build_collection_1.BuildCollectionClient(this._subResourceOptions({
            resourcePath: 'builds',
        }));
    }
    /**
     * Returns a client for managing runs of this Actor.
     *
     * @returns A client for the Actor's run collection
     * @see https://docs.apify.com/api/v2/act-runs-get
     */
    runs() {
        return new run_collection_1.RunCollectionClient(this._subResourceOptions({
            resourcePath: 'runs',
        }));
    }
    /**
     * Returns a client for a specific version of this Actor.
     *
     * @param versionNumber - Version number (e.g., '0.1', '1.2.3')
     * @returns A client for the specified Actor version
     * @see https://docs.apify.com/api/v2/act-version-get
     */
    version(versionNumber) {
        (0, ow_1.default)(versionNumber, ow_1.default.string);
        return new actor_version_1.ActorVersionClient(this._subResourceOptions({
            id: versionNumber,
        }));
    }
    /**
     * Returns a client for managing versions of this Actor.
     *
     * @returns A client for the Actor's version collection
     * @see https://docs.apify.com/api/v2/act-versions-get
     */
    versions() {
        return new actor_version_collection_1.ActorVersionCollectionClient(this._subResourceOptions());
    }
    /**
     * Returns a client for managing webhooks associated with this Actor.
     *
     * @returns A client for the Actor's webhook collection
     * @see https://docs.apify.com/api/v2/act-webhooks-get
     */
    webhooks() {
        return new webhook_collection_1.WebhookCollectionClient(this._subResourceOptions());
    }
}
exports.ActorClient = ActorClient;
//# sourceMappingURL=actor.js.map