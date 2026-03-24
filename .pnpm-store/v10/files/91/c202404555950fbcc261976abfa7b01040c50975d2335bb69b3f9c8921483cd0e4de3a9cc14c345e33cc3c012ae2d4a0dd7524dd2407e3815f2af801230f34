"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleActions = exports.ScheduleClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
/**
 * Client for managing a specific Schedule.
 *
 * Schedules are used to automatically start Actors or tasks at specified times. This client provides
 * methods to get, update, and delete schedules, as well as retrieve schedule logs.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const scheduleClient = client.schedule('my-schedule-id');
 *
 * // Get schedule details
 * const schedule = await scheduleClient.get();
 *
 * // Update schedule
 * await scheduleClient.update({
 *   cronExpression: '0 12 * * *',
 *   isEnabled: true
 * });
 * ```
 *
 * @see https://docs.apify.com/platform/schedules
 */
class ScheduleClient extends resource_client_1.ResourceClient {
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
     * Retrieves the schedule.
     *
     * @returns The schedule object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/schedule-get
     */
    async get() {
        return this._get();
    }
    /**
     * Updates the schedule with the specified fields.
     *
     * @param newFields - Fields to update.
     * @returns The updated schedule object.
     * @see https://docs.apify.com/api/v2/schedule-put
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * Deletes the schedule.
     *
     * @see https://docs.apify.com/api/v2/schedule-delete
     */
    async delete() {
        return this._delete();
    }
    /**
     * Retrieves the schedule's log.
     *
     * @returns The schedule log as a string, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/schedule-log-get
     */
    async getLog() {
        const requestOpts = {
            url: this._url('log'),
            method: 'GET',
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
}
exports.ScheduleClient = ScheduleClient;
/**
 * Types of actions that can be scheduled.
 */
var ScheduleActions;
(function (ScheduleActions) {
    ScheduleActions["RunActor"] = "RUN_ACTOR";
    ScheduleActions["RunActorTask"] = "RUN_ACTOR_TASK";
})(ScheduleActions || (exports.ScheduleActions = ScheduleActions = {}));
//# sourceMappingURL=schedule.js.map