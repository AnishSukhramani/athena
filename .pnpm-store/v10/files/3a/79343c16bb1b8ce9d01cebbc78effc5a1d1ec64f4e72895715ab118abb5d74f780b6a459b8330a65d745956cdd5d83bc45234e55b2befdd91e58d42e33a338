import type { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceClient } from '../base/resource_client';
import type { Timezone } from '../timezones';
import type { DistributiveOptional } from '../utils';
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
export declare class ScheduleClient extends ResourceClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * Retrieves the schedule.
     *
     * @returns The schedule object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/schedule-get
     */
    get(): Promise<Schedule | undefined>;
    /**
     * Updates the schedule with the specified fields.
     *
     * @param newFields - Fields to update.
     * @returns The updated schedule object.
     * @see https://docs.apify.com/api/v2/schedule-put
     */
    update(newFields: ScheduleCreateOrUpdateData): Promise<Schedule>;
    /**
     * Deletes the schedule.
     *
     * @see https://docs.apify.com/api/v2/schedule-delete
     */
    delete(): Promise<void>;
    /**
     * Retrieves the schedule's log.
     *
     * @returns The schedule log as a string, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/schedule-log-get
     */
    getLog(): Promise<string | undefined>;
}
/**
 * Represents a schedule for automated Actor or Task runs.
 *
 * Schedules use cron expressions to define when Actors or Tasks should run automatically.
 */
export interface Schedule {
    id: string;
    userId: string;
    name: string;
    title?: string;
    cronExpression: string;
    timezone: Timezone;
    isEnabled: boolean;
    isExclusive: boolean;
    description?: string;
    createdAt: Date;
    modifiedAt: Date;
    nextRunAt: string;
    lastRunAt: string;
    actions: ScheduleAction[];
    notifications: {
        email: boolean;
    };
}
/**
 * Data for creating or updating a Schedule.
 */
export type ScheduleCreateOrUpdateData = Partial<Pick<Schedule, 'name' | 'title' | 'cronExpression' | 'timezone' | 'isEnabled' | 'isExclusive' | 'description' | 'notifications'> & {
    actions: DistributiveOptional<ScheduleAction, 'id'>[];
}>;
/**
 * Types of actions that can be scheduled.
 */
export declare enum ScheduleActions {
    RunActor = "RUN_ACTOR",
    RunActorTask = "RUN_ACTOR_TASK"
}
interface BaseScheduleAction<Type extends ScheduleActions> {
    id: string;
    type: Type;
}
/**
 * Union type representing all possible scheduled actions.
 */
export type ScheduleAction = ScheduleActionRunActor | ScheduleActionRunActorTask;
/**
 * Scheduled action to run an Actor.
 */
export interface ScheduleActionRunActor extends BaseScheduleAction<ScheduleActions.RunActor> {
    actorId: string;
    runInput?: ScheduledActorRunInput;
    runOptions?: ScheduledActorRunOptions;
}
/**
 * Input configuration for a scheduled Actor run.
 */
export interface ScheduledActorRunInput {
    body: string;
    contentType: string;
}
/**
 * Run options for a scheduled Actor run.
 */
export interface ScheduledActorRunOptions {
    build: string;
    timeoutSecs: number;
    memoryMbytes: number;
    restartOnError?: boolean;
}
/**
 * Scheduled action to run an Actor task.
 */
export interface ScheduleActionRunActorTask extends BaseScheduleAction<ScheduleActions.RunActorTask> {
    actorTaskId: string;
    input?: string;
}
export {};
//# sourceMappingURL=schedule.d.ts.map