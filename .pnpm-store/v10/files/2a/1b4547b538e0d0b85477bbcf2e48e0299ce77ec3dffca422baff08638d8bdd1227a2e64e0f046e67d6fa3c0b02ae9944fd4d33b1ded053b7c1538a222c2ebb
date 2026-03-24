"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_collection_client_1 = require("../base/resource_collection_client");
/**
 * Client for managing the collection of Actor builds.
 *
 * Provides methods to list Actor builds across all Actors or for a specific Actor.
 * To access an individual build, use the `build()` method on the main ApifyClient.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 *
 * // List all builds
 * const buildsClient = client.builds();
 * const { items } = await buildsClient.list();
 *
 * // List builds for a specific Actor
 * const actorBuildsClient = client.actor('my-actor-id').builds();
 * const { items: actorBuilds } = await actorBuildsClient.list();
 * ```
 *
 * @see https://docs.apify.com/platform/actors/running/runs-and-builds#builds
 */
class BuildCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            ...options,
            resourcePath: options.resourcePath || 'actor-builds',
        });
    }
    /**
     * Lists all Actor builds.
     *
     * Awaiting the return value (as you would with a Promise) will result in a single API call. The amount of fetched
     * items in a single API call is limited.
     * ```javascript
     * const paginatedList = await client.list(options);
     * ```
     *
     * Asynchronous iteration is also supported. This will fetch additional pages if needed until all items are
     * retrieved.
     *
     * ```javascript
     * for await (const singleItem of client.list(options)) {...}
     * ```
     *
     * @param options - Pagination and sorting options.
     * @returns A paginated iterator of Actor builds.
     * @see https://docs.apify.com/api/v2/actor-builds-get
     */
    list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number.not.negative,
            offset: ow_1.default.optional.number.not.negative,
            desc: ow_1.default.optional.boolean,
        }));
        return this._listPaginated(options);
    }
}
exports.BuildCollectionClient = BuildCollectionClient;
//# sourceMappingURL=build_collection.js.map