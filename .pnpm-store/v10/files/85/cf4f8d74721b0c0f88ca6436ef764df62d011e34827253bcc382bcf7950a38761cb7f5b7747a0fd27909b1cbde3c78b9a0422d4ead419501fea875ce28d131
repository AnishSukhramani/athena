"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorEnvVarClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_client_1 = require("../base/resource_client");
/**
 * Client for managing a specific Actor environment variable.
 *
 * Environment variables are key-value pairs that are available to the Actor during execution.
 * This client provides methods to get, update, and delete environment variables.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const actorClient = client.actor('my-actor-id');
 * const versionClient = actorClient.version('0.1');
 *
 * // Get an environment variable
 * const envVarClient = versionClient.envVar('MY_VAR');
 * const envVar = await envVarClient.get();
 *
 * // Update environment variable
 * await envVarClient.update({ value: 'new-value' });
 * ```
 *
 * @see https://docs.apify.com/platform/actors/development/programming-interface/environment-variables
 */
class ActorEnvVarClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'env-vars',
            ...options,
        });
    }
    /**
     * Retrieves the environment variable.
     *
     * @returns The environment variable object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/act-version-env-var-get
     */
    async get() {
        return this._get();
    }
    /**
     * Updates the environment variable.
     *
     * @param actorEnvVar - The updated environment variable data.
     * @returns The updated environment variable object.
     * @see https://docs.apify.com/api/v2/act-version-env-var-put
     */
    async update(actorEnvVar) {
        (0, ow_1.default)(actorEnvVar, ow_1.default.object);
        return this._update(actorEnvVar);
    }
    /**
     * Deletes the environment variable.
     *
     * @see https://docs.apify.com/api/v2/act-version-env-var-delete
     */
    async delete() {
        return this._delete();
    }
}
exports.ActorEnvVarClient = ActorEnvVarClient;
//# sourceMappingURL=actor_env_var.js.map