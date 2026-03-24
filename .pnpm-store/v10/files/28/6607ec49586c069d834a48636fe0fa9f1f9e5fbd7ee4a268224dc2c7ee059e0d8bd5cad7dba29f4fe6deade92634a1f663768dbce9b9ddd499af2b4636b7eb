"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const consts_1 = require("@apify/consts");
const resource_collection_client_1 = require("../base/resource_collection_client");
/**
 * Client for managing the collection of Actor runs.
 *
 * Provides methods to list Actor runs across all Actors or for a specific Actor.
 * To access an individual run, use the `run()` method on the main ApifyClient.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 *
 * // List all runs
 * const runsClient = client.runs();
 * const { items } = await runsClient.list();
 *
 * // List runs for a specific Actor
 * const actorRunsClient = client.actor('my-actor-id').runs();
 * const { items: actorRuns } = await actorRunsClient.list();
 * ```
 *
 * @see https://docs.apify.com/platform/actors/running/runs-and-builds
 */
class RunCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'runs',
            ...options,
        });
    }
    /**
     * Lists all Actor runs.
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
     * @param options - Pagination and filtering options.
     * @returns A paginated iterator of Actor runs.
     * @see https://docs.apify.com/api/v2/actor-runs-get
     */
    list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number.not.negative,
            offset: ow_1.default.optional.number.not.negative,
            desc: ow_1.default.optional.boolean,
            status: ow_1.default.optional.any(ow_1.default.string.oneOf(Object.values(consts_1.ACTOR_JOB_STATUSES)), ow_1.default.array.ofType(ow_1.default.string.oneOf(Object.values(consts_1.ACTOR_JOB_STATUSES)))),
            startedBefore: ow_1.default.optional.any(ow_1.default.optional.date, ow_1.default.optional.string),
            startedAfter: ow_1.default.optional.any(ow_1.default.optional.date, ow_1.default.optional.string),
        }));
        return this._listPaginated(options);
    }
}
exports.RunCollectionClient = RunCollectionClient;
//# sourceMappingURL=run_collection.js.map