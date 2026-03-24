import type { RUN_GENERAL_ACCESS } from '@apify/consts';
import { Log } from '@apify/log';
import type { ApiClientOptionsWithOptionalResourcePath } from '../base/api_client';
import { ResourceClient } from '../base/resource_client';
import type { ApifyResponse } from '../http_client';
import type { ActorRun } from './actor';
import { DatasetClient } from './dataset';
import { KeyValueStoreClient } from './key_value_store';
import { LogClient, StreamedLog } from './log';
import { RequestQueueClient } from './request_queue';
/**
 * Client for managing a specific Actor run.
 *
 * Provides methods to get run details, abort, metamorph, resurrect, wait for completion,
 * and access the run's dataset, key-value store, request queue, and logs.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const runClient = client.run('my-run-id');
 *
 * // Get run details
 * const run = await runClient.get();
 *
 * // Wait for the run to finish
 * const finishedRun = await runClient.waitForFinish();
 *
 * // Access the run's dataset
 * const { items } = await runClient.dataset().listItems();
 * ```
 *
 * @see https://docs.apify.com/platform/actors/running/runs-and-builds
 */
export declare class RunClient extends ResourceClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientOptionsWithOptionalResourcePath);
    /**
     * Gets the Actor run object from the Apify API.
     *
     * @param options - Get options
     * @param options.waitForFinish - Maximum time to wait (in seconds, max 60s) for the run to finish on the API side before returning. Default is 0 (returns immediately).
     * @returns The ActorRun object, or `undefined` if it does not exist
     * @see https://docs.apify.com/api/v2/actor-run-get
     *
     * @example
     * ```javascript
     * // Get run status immediately
     * const run = await client.run('run-id').get();
     * console.log(`Status: ${run.status}`);
     *
     * // Wait up to 60 seconds for run to finish
     * const run = await client.run('run-id').get({ waitForFinish: 60 });
     * ```
     */
    get(options?: RunGetOptions): Promise<ActorRun | undefined>;
    /**
     * Aborts the Actor run.
     *
     * @param options - Abort options
     * @param options.gracefully - If `true`, the Actor run will abort gracefully - it can send status messages and perform cleanup. Default is `false` (immediate abort).
     * @returns The updated ActorRun object with `ABORTING` or `ABORTED` status
     * @see https://docs.apify.com/api/v2/actor-run-abort-post
     *
     * @example
     * ```javascript
     * // Abort immediately
     * await client.run('run-id').abort();
     *
     * // Abort gracefully (allows cleanup)
     * await client.run('run-id').abort({ gracefully: true });
     * ```
     */
    abort(options?: RunAbortOptions): Promise<ActorRun>;
    /**
     * Deletes the Actor run.
     *
     * @see https://docs.apify.com/api/v2/actor-run-delete
     */
    delete(): Promise<void>;
    /**
     * Transforms the Actor run into a run of another Actor (metamorph).
     *
     * This operation preserves the run ID, storages (dataset, key-value store, request queue),
     * and resource allocation. The run effectively becomes a run of the target Actor with new input.
     * This is useful for chaining Actor executions or implementing complex workflows.
     *
     * @param targetActorId - ID or username/name of the target Actor
     * @param input - Input for the target Actor. Can be any JSON-serializable value.
     * @param options - Metamorph options
     * @param options.build - Tag or number of the target Actor's build to run. Default is the target Actor's default build.
     * @param options.contentType - Content type of the input. If specified, input must be a string or Buffer.
     * @returns The metamorphed ActorRun object (same ID, but now running the target Actor)
     * @see https://docs.apify.com/api/v2/actor-run-metamorph-post
     *
     * @example
     * ```javascript
     * // Transform current run into another Actor
     * const metamorphedRun = await client.run('original-run-id').metamorph(
     *   'target-actor-id',
     *   { url: 'https://example.com' }
     * );
     * console.log(`Run ${metamorphedRun.id} is now running ${metamorphedRun.actId}`);
     * ```
     */
    metamorph(targetActorId: string, input: unknown, options?: RunMetamorphOptions): Promise<ActorRun>;
    /**
     * Reboots the Actor run.
     *
     * Rebooting restarts the Actor's Docker container while preserving the run ID and storages.
     * This can be useful to recover from certain errors or to force the Actor to restart
     * with a fresh environment.
     *
     * @returns The updated ActorRun object
     * @see https://docs.apify.com/api/v2/actor-run-reboot-post
     *
     * @example
     * ```javascript
     * const run = await client.run('run-id').reboot();
     * ```
     */
    reboot(): Promise<ActorRun>;
    /**
     * Updates the Actor run with specified fields.
     *
     * @param newFields - Fields to update
     * @param newFields.statusMessage - Custom status message to display (e.g., "Processing page 10/100")
     * @param newFields.isStatusMessageTerminal - If `true`, the status message is final and won't be overwritten. Default is `false`.
     * @param newFields.generalAccess - General resource access level ('FOLLOW_USER_SETTING', 'ANYONE_WITH_ID_CAN_READ' or 'RESTRICTED')
     * @returns The updated ActorRun object
     *
     * @example
     * ```javascript
     * // Set a status message
     * await client.run('run-id').update({
     *   statusMessage: 'Processing items: 50/100'
     * });
     * ```
     */
    update(newFields: RunUpdateOptions): Promise<ActorRun>;
    /**
     * Resurrects a finished Actor run, starting it again with the same settings.
     *
     * This creates a new run with the same configuration as the original run. The original
     * run's storages (dataset, key-value store, request queue) are preserved and reused.
     *
     * @param options - Resurrection options (override original run settings)
     * @param options.build - Tag or number of the build to use. If not provided, uses the original run's build.
     * @param options.memory - Memory in megabytes. If not provided, uses the original run's memory.
     * @param options.timeout - Timeout in seconds. If not provided, uses the original run's timeout.
     * @param options.maxItems - Maximum number of dataset items (pay-per-result Actors).
     * @param options.maxTotalChargeUsd - Maximum cost in USD (pay-per-event Actors).
     * @param options.restartOnError - Whether to restart on error.
     * @returns The new (resurrected) ActorRun object
     * @see https://docs.apify.com/api/v2/post-resurrect-run
     *
     * @example
     * ```javascript
     * // Resurrect a failed run with more memory
     * const newRun = await client.run('failed-run-id').resurrect({ memory: 2048 });
     * console.log(`New run started: ${newRun.id}`);
     * ```
     */
    resurrect(options?: RunResurrectOptions): Promise<ActorRun>;
    /**
     * Charges the Actor run for a specific event.
     *
     * @param options - Charge options including event name and count.
     * @param options.eventName - **Required.** Name of the event to charge for.
     * @param options.count - Number of times to charge the event. Default is 1.
     * @param options.idempotencyKey - Optional key to ensure the charge is not duplicated. If not provided, one is auto-generated.
     * @returns Empty response object.
     * @see https://docs.apify.com/api/v2/post-charge-run
     */
    charge(options: RunChargeOptions): Promise<ApifyResponse<Record<string, never>>>;
    /**
     * Waits for the Actor run to finish and returns the finished Run object.
     *
     * The promise resolves when the run reaches a terminal state (`SUCCEEDED`, `FAILED`, `ABORTED`, or `TIMED-OUT`).
     * If `waitSecs` is provided and the timeout is reached, the promise resolves with the unfinished
     * Run object (status will be `RUNNING` or `READY`). The promise is NOT rejected based on run status.
     *
     * Unlike the `waitForFinish` parameter in {@link get}, this method can wait indefinitely
     * by polling the run status. It uses the `waitForFinish` parameter internally (max 60s per call)
     * and continuously polls until the run finishes or the timeout is reached.
     *
     * @param options - Wait options
     * @param options.waitSecs - Maximum time to wait for the run to finish, in seconds. If the limit is reached, the returned promise resolves to a run object that will have status `READY` or `RUNNING`. If omitted, waits indefinitely.
     * @returns The ActorRun object (finished or still running if timeout was reached)
     *
     * @example
     * ```javascript
     * // Wait indefinitely for run to finish
     * const run = await client.run('run-id').waitForFinish();
     * console.log(`Run finished with status: ${run.status}`);
     *
     * // Wait up to 5 minutes
     * const run = await client.run('run-id').waitForFinish({ waitSecs: 300 });
     * if (run.status === 'SUCCEEDED') {
     *   console.log('Run succeeded!');
     * }
     * ```
     */
    waitForFinish(options?: RunWaitForFinishOptions): Promise<ActorRun>;
    /**
     * Returns a client for the default dataset of this Actor run.
     *
     * @returns A client for accessing the run's default dataset
     * @see https://docs.apify.com/api/v2/actor-run-get
     *
     * @example
     * ```javascript
     * // Access run's dataset
     * const { items } = await client.run('run-id').dataset().listItems();
     * ```
     */
    dataset(): DatasetClient;
    /**
     * Returns a client for the default key-value store of this Actor run.
     *
     * @returns A client for accessing the run's default key-value store
     * @see https://docs.apify.com/api/v2/actor-run-get
     *
     * @example
     * ```javascript
     * // Access run's key-value store
     * const output = await client.run('run-id').keyValueStore().getRecord('OUTPUT');
     * ```
     */
    keyValueStore(): KeyValueStoreClient;
    /**
     * Returns a client for the default Request queue of this Actor run.
     *
     * @returns A client for accessing the run's default Request queue
     * @see https://docs.apify.com/api/v2/actor-run-get
     *
     * @example
     * ```javascript
     * // Access run's Request queue
     * const { items } = await client.run('run-id').requestQueue().listHead();
     * ```
     */
    requestQueue(): RequestQueueClient;
    /**
     * Returns a client for accessing the log of this Actor run.
     *
     * @returns A client for accessing the run's log
     * @see https://docs.apify.com/api/v2/actor-run-get
     *
     * @example
     * ```javascript
     * // Get run log
     * const log = await client.run('run-id').log().get();
     * console.log(log);
     * ```
     */
    log(): LogClient;
    /**
     * Get StreamedLog for convenient streaming of the run log and their redirection.
     */
    getStreamedLog(options?: GetStreamedLogOptions): Promise<StreamedLog | undefined>;
}
/**
 * Options for getting a streamed log.
 */
export interface GetStreamedLogOptions {
    toLog?: Log | null | 'default';
    fromStart?: boolean;
}
/**
 * Options for getting a Run.
 */
export interface RunGetOptions {
    waitForFinish?: number;
}
/**
 * Options for aborting a Run.
 */
export interface RunAbortOptions {
    gracefully?: boolean;
}
/**
 * Options for metamorphing a Run into another Actor.
 */
export interface RunMetamorphOptions {
    contentType?: string;
    build?: string;
}
/**
 * Options for updating a Run.
 */
export interface RunUpdateOptions {
    statusMessage?: string;
    isStatusMessageTerminal?: boolean;
    generalAccess?: RUN_GENERAL_ACCESS | null;
}
/**
 * Options for resurrecting a finished Run.
 */
export interface RunResurrectOptions {
    build?: string;
    memory?: number;
    timeout?: number;
    maxItems?: number;
    maxTotalChargeUsd?: number;
    restartOnError?: boolean;
}
/**
 * Options for charging events in a pay-per-event Actor run.
 */
export interface RunChargeOptions {
    /** Name of the event to charge. Must be defined in the Actor's pricing info else the API will throw. */
    eventName: string;
    /** Defaults to 1 */
    count?: number;
    /** Defaults to runId-eventName-timestamp */
    idempotencyKey?: string;
}
/**
 * Options for waiting for a Run to finish.
 */
export interface RunWaitForFinishOptions {
    /**
     * Maximum time to wait for the run to finish, in seconds.
     * If the limit is reached, the returned promise is resolved to a run object that will have
     * status `READY` or `RUNNING`. If `waitSecs` omitted, the function waits indefinitely.
     */
    waitSecs?: number;
}
//# sourceMappingURL=run.d.ts.map