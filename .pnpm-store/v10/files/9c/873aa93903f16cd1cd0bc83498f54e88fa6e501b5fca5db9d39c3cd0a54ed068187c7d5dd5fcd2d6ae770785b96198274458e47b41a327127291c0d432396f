"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_collection_client_1 = require("../base/resource_collection_client");
/**
 * Client for managing the collection of Actor tasks in your account.
 *
 * Tasks are pre-configured Actor runs with saved input and options. This client provides
 * methods to list and create tasks.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const tasksClient = client.tasks();
 *
 * // List all tasks
 * const { items } = await tasksClient.list();
 *
 * // Create a new task
 * const newTask = await tasksClient.create({
 *   actId: 'my-actor-id',
 *   name: 'my-task',
 *   input: { url: 'https://example.com' }
 * });
 * ```
 *
 * @see https://docs.apify.com/platform/actors/running/tasks
 */
class TaskCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'actor-tasks',
            ...options,
        });
    }
    /**
     * Lists all Tasks.
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
     * @returns A paginated iterator of tasks.
     * @see https://docs.apify.com/api/v2/actor-tasks-get
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
     * Creates a new task.
     *
     * @param task - The task data.
     * @returns The created task object.
     * @see https://docs.apify.com/api/v2/actor-tasks-post
     */
    async create(task) {
        (0, ow_1.default)(task, ow_1.default.object);
        return this._create(task);
    }
}
exports.TaskCollectionClient = TaskCollectionClient;
//# sourceMappingURL=task_collection.js.map