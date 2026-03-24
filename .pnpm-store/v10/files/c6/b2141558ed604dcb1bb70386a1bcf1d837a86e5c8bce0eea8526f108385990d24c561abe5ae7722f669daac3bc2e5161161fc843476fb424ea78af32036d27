"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_collection_client_1 = require("../base/resource_collection_client");
/**
 * Client for managing the collection of Schedules in your account.
 *
 * Schedules are used to automatically start Actors or tasks at specified times.
 * This client provides methods to list and create schedules.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const schedulesClient = client.schedules();
 *
 * // List all schedules
 * const { items } = await schedulesClient.list();
 *
 * // Create a new schedule
 * const newSchedule = await schedulesClient.create({
 *   actorId: 'my-actor-id',
 *   cronExpression: '0 9 * * *',
 *   isEnabled: true
 * });
 * ```
 *
 * @see https://docs.apify.com/platform/schedules
 */
class ScheduleCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'schedules',
            ...options,
        });
    }
    /**
     * Lists all schedules.
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
     * @returns A paginated iterator of schedules.
     * @see https://docs.apify.com/api/v2/schedules-get
     */
    list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number.not.negative,
            offset: ow_1.default.optional.number.not.negative,
            desc: ow_1.default.optional.boolean,
        }));
        return this._listPaginated(options);
    }
    /**
     * Creates a new schedule.
     *
     * @param schedule - The schedule data.
     * @returns The created schedule object.
     * @see https://docs.apify.com/api/v2/schedules-post
     */
    async create(schedule) {
        (0, ow_1.default)(schedule, ow_1.default.optional.object);
        return this._create(schedule);
    }
}
exports.ScheduleCollectionClient = ScheduleCollectionClient;
//# sourceMappingURL=schedule_collection.js.map