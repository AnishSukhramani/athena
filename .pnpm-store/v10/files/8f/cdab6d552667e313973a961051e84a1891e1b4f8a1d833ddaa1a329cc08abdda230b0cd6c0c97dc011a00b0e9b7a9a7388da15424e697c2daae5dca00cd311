"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorVersionCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_collection_client_1 = require("../base/resource_collection_client");
/**
 * Client for managing the collection of Actor versions.
 *
 * Actor versions represent specific builds or snapshots of an Actor's code. This client provides
 * methods to list and create versions for a specific Actor.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const actorClient = client.actor('my-actor-id');
 *
 * // List all versions
 * const versionsClient = actorClient.versions();
 * const { items } = await versionsClient.list();
 *
 * // Create a new version
 * const newVersion = await versionsClient.create({
 *   versionNumber: '0.2',
 *   buildTag: 'latest'
 * });
 * ```
 *
 * @see https://docs.apify.com/api/v2/act-versions-get
 */
class ActorVersionCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
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
     * Lists all Actor versions.
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
     * @returns A paginated iterator of Actor versions.
     * @see https://docs.apify.com/api/v2/act-versions-get
     */
    list(_options = {}) {
        return this._listPaginated();
    }
    /**
     * Creates a new Actor version.
     *
     * @param actorVersion - The Actor version data.
     * @returns The created Actor version object.
     * @see https://docs.apify.com/api/v2/act-versions-post
     */
    async create(actorVersion) {
        (0, ow_1.default)(actorVersion, ow_1.default.optional.object);
        return this._create(actorVersion);
    }
}
exports.ActorVersionCollectionClient = ActorVersionCollectionClient;
//# sourceMappingURL=actor_version_collection.js.map