"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
const log_1 = require("./log");
/**
 * Client for managing a specific Actor build.
 *
 * Builds are created when an Actor is built from source code. This client provides methods
 * to get build details, wait for the build to finish, abort it, and access its logs.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const buildClient = client.build('my-build-id');
 *
 * // Get build details
 * const build = await buildClient.get();
 *
 * // Wait for the build to finish
 * const finishedBuild = await buildClient.waitForFinish();
 *
 * // Access build logs
 * const log = await buildClient.log().get();
 * ```
 *
 * @see https://docs.apify.com/platform/actors/running/runs-and-builds#builds
 */
class BuildClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'actor-builds',
            ...options,
        });
    }
    /**
     * Gets the Actor build object from the Apify API.
     *
     * @param options - Get options
     * @param options.waitForFinish - Maximum time to wait (in seconds, max 60s) for the build to finish on the API side before returning. Default is 0 (returns immediately).
     * @returns The Build object, or `undefined` if it does not exist
     * @see https://docs.apify.com/api/v2/actor-build-get
     *
     * @example
     * ```javascript
     * // Get build status immediately
     * const build = await client.build('build-id').get();
     * console.log(`Status: ${build.status}`);
     *
     * // Wait up to 60 seconds for build to finish
     * const build = await client.build('build-id').get({ waitForFinish: 60 });
     * ```
     */
    async get(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            waitForFinish: ow_1.default.optional.number,
        }));
        return this._get(options);
    }
    /**
     * Aborts the Actor build.
     *
     * Stops the build process immediately. The build will have an `ABORTED` status.
     *
     * @returns The updated Build object with `ABORTED` status
     * @see https://docs.apify.com/api/v2/actor-build-abort-post
     *
     * @example
     * ```javascript
     * await client.build('build-id').abort();
     * ```
     */
    async abort() {
        const response = await this.httpClient.call({
            url: this._url('abort'),
            method: 'POST',
            params: this._params(),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * Deletes the Actor build.
     *
     * @see https://docs.apify.com/api/v2/actor-build-delete
     */
    async delete() {
        return this._delete();
    }
    /**
     * Retrieves the OpenAPI definition for the Actor build.
     *
     * @returns The OpenAPI definition object.
     * @see https://docs.apify.com/api/v2/actor-build-openapi-json-get
     */
    async getOpenApiDefinition() {
        const response = await this.httpClient.call({
            url: this._url('openapi.json'),
            method: 'GET',
            params: this._params(),
        });
        return response.data;
    }
    /**
     * Waits for the Actor build to finish and returns the finished Build object.
     *
     * The promise resolves when the build reaches a terminal state (`SUCCEEDED`, `FAILED`, `ABORTED`, or `TIMED-OUT`).
     * If `waitSecs` is provided and the timeout is reached, the promise resolves with the unfinished
     * Build object (status will be `RUNNING` or `READY`). The promise is NOT rejected based on build status.
     *
     * Unlike the `waitForFinish` parameter in {@link get}, this method can wait indefinitely
     * by polling the build status. It uses the `waitForFinish` parameter internally (max 60s per call)
     * and continuously polls until the build finishes or the timeout is reached.
     *
     * This is useful when you need to immediately start a run after a build finishes.
     *
     * @param options - Wait options
     * @param options.waitSecs - Maximum time to wait for the build to finish, in seconds. If omitted, waits indefinitely.
     * @returns The Build object (finished or still building if timeout was reached)
     *
     * @example
     * ```javascript
     * // Wait indefinitely for build to finish
     * const build = await client.build('build-id').waitForFinish();
     * console.log(`Build finished with status: ${build.status}`);
     *
     * // Start a run immediately after build succeeds
     * const build = await client.build('build-id').waitForFinish();
     * if (build.status === 'SUCCEEDED') {
     *   const run = await client.actor('my-actor').start();
     * }
     * ```
     */
    async waitForFinish(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            waitSecs: ow_1.default.optional.number,
        }));
        return this._waitForFinish(options);
    }
    /**
     * Returns a client for accessing the log of this Actor build.
     *
     * @returns A client for accessing the build's log
     * @see https://docs.apify.com/api/v2/actor-build-log-get
     *
     * @example
     * ```javascript
     * // Get build log
     * const log = await client.build('build-id').log().get();
     * console.log(log);
     * ```
     */
    log() {
        return new log_1.LogClient(this._subResourceOptions({
            resourcePath: 'log',
        }));
    }
}
exports.BuildClient = BuildClient;
//# sourceMappingURL=build.js.map