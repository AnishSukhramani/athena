"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorEnvVarCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_collection_client_1 = require("../base/resource_collection_client");
/**
 * Client for managing the collection of environment variables for an Actor version.
 *
 * Environment variables are key-value pairs that are available to the Actor during execution.
 * This client provides methods to list and create environment variables.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const actorClient = client.actor('my-actor-id');
 * const versionClient = actorClient.version('0.1');
 *
 * // List all environment variables
 * const envVarsClient = versionClient.envVars();
 * const { items } = await envVarsClient.list();
 *
 * // Create a new environment variable
 * const newEnvVar = await envVarsClient.create({
 *   name: 'MY_VAR',
 *   value: 'my-value',
 *   isSecret: false
 * });
 * ```
 *
 * @see https://docs.apify.com/platform/actors/development/programming-interface/environment-variables
 */
class ActorEnvVarCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
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
     * Lists all environment variables of this Actor version.
     *
     * Awaiting the return value (as you would with a Promise) will result in a single API call. The amount of fetched
     * items in a single API call is limited.
     * ```javascript
     * const paginatedList = await client.list();
     *```
     *
     * Asynchronous iteration is also supported. This will fetch additional pages if needed until all items are
     * retrieved.
     *
     * ```javascript
     * for await (const singleItem of client.list()) {...}
     * ```
     *
     * @returns A paginated iterator of environment variables.
     * @see https://docs.apify.com/api/v2/act-version-env-vars-get
     */
    list(_options = {}) {
        return this._listPaginated();
    }
    /**
     * Creates a new environment variable for this Actor version.
     *
     * @param actorEnvVar - The environment variable data.
     * @returns The created environment variable object.
     * @see https://docs.apify.com/api/v2/act-version-env-vars-post
     */
    async create(actorEnvVar) {
        (0, ow_1.default)(actorEnvVar, ow_1.default.optional.object);
        return this._create(actorEnvVar);
    }
}
exports.ActorEnvVarCollectionClient = ActorEnvVarCollectionClient;
//# sourceMappingURL=actor_env_var_collection.js.map