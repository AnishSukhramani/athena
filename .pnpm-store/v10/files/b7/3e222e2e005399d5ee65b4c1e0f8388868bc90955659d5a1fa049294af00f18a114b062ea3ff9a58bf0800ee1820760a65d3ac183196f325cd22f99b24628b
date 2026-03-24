"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorSourceType = exports.ActorVersionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_client_1 = require("../base/resource_client");
const actor_env_var_1 = require("./actor_env_var");
const actor_env_var_collection_1 = require("./actor_env_var_collection");
/**
 * Client for managing a specific Actor version.
 *
 * Actor versions represent specific builds or snapshots of an Actor's code. This client provides
 * methods to get, update, and delete versions, as well as manage their environment variables.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const actorClient = client.actor('my-actor-id');
 *
 * // Get a specific version
 * const versionClient = actorClient.version('0.1');
 * const version = await versionClient.get();
 *
 * // Update version
 * await versionClient.update({ buildTag: 'latest' });
 * ```
 *
 * @see https://docs.apify.com/api/v2/act-versions-get
 */
class ActorVersionClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'versions',
            ...options,
        });
    }
    /**
     * Retrieves the Actor version.
     *
     * @returns The Actor version object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/act-version-get
     */
    async get() {
        return this._get();
    }
    /**
     * Updates the Actor version with the specified fields.
     *
     * @param newFields - Fields to update.
     * @returns The updated Actor version object.
     * @see https://docs.apify.com/api/v2/act-version-put
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * Deletes the Actor version.
     *
     * @see https://docs.apify.com/api/v2/act-version-delete
     */
    async delete() {
        return this._delete();
    }
    /**
     * Returns a client for the specified environment variable of this Actor version.
     *
     * @param envVarName - Name of the environment variable.
     * @returns A client for the environment variable.
     * @see https://docs.apify.com/api/v2/act-version-env-var-get
     */
    envVar(envVarName) {
        (0, ow_1.default)(envVarName, ow_1.default.string);
        return new actor_env_var_1.ActorEnvVarClient(this._subResourceOptions({
            id: envVarName,
        }));
    }
    /**
     * Returns a client for the environment variables of this Actor version.
     *
     * @returns A client for the Actor version's environment variables.
     * @see https://docs.apify.com/api/v2/act-version-env-vars-get
     */
    envVars() {
        return new actor_env_var_collection_1.ActorEnvVarCollectionClient(this._subResourceOptions());
    }
}
exports.ActorVersionClient = ActorVersionClient;
var ActorSourceType;
(function (ActorSourceType) {
    ActorSourceType["SourceFiles"] = "SOURCE_FILES";
    ActorSourceType["GitRepo"] = "GIT_REPO";
    ActorSourceType["Tarball"] = "TARBALL";
    ActorSourceType["GitHubGist"] = "GITHUB_GIST";
})(ActorSourceType || (exports.ActorSourceType = ActorSourceType = {}));
//# sourceMappingURL=actor_version.js.map