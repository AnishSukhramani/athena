"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorListSortBy = exports.ActorCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_collection_client_1 = require("../base/resource_collection_client");
/**
 * Client for managing the collection of Actors in your account.
 *
 * Provides methods to list and create Actors. To access an individual Actor,
 * use the `actor()` method on the main ApifyClient.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const actorsClient = client.actors();
 *
 * // List all Actors
 * const { items } = await actorsClient.list();
 *
 * // Create a new Actor
 * const newActor = await actorsClient.create({
 *   name: 'my-actor',
 *   title: 'My Actor'
 * });
 * ```
 *
 * @see https://docs.apify.com/platform/actors
 */
class ActorCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
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
     * Lists all Actors.
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
     * @param options - Pagination options.
     * @returns A paginated iterator of Actors.
     * @see https://docs.apify.com/api/v2/acts-get
     */
    list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            my: ow_1.default.optional.boolean,
            limit: ow_1.default.optional.number.not.negative,
            offset: ow_1.default.optional.number.not.negative,
            desc: ow_1.default.optional.boolean,
            sortBy: ow_1.default.optional.string.oneOf(Object.values(ActorListSortBy)),
        }));
        return this._listPaginated(options);
    }
    /**
     * Creates a new Actor.
     *
     * @param actor - The Actor data.
     * @returns The created Actor object.
     * @see https://docs.apify.com/api/v2/acts-post
     */
    async create(actor) {
        (0, ow_1.default)(actor, ow_1.default.optional.object);
        return this._create(actor);
    }
}
exports.ActorCollectionClient = ActorCollectionClient;
var ActorListSortBy;
(function (ActorListSortBy) {
    ActorListSortBy["CREATED_AT"] = "createdAt";
    ActorListSortBy["LAST_RUN_STARTED_AT"] = "stats.lastRunStartedAt";
})(ActorListSortBy || (exports.ActorListSortBy = ActorListSortBy = {}));
//# sourceMappingURL=actor_collection.js.map