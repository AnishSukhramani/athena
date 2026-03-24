import type { Readable } from 'node:stream';
import type { Log } from '@apify/log';
import { Logger, LogLevel } from '@apify/log';
import type { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceClient } from '../base/resource_client';
/**
 * Client for accessing Actor run or build logs.
 *
 * Provides methods to retrieve logs as text or stream them in real-time. Logs can be accessed
 * for both running and finished Actor runs and builds.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const runClient = client.run('my-run-id');
 *
 * // Get the log content
 * const log = await runClient.log().get();
 * console.log(log);
 *
 * // Stream the log in real-time
 * const stream = await runClient.log().stream();
 * stream.on('line', (line) => console.log(line));
 * ```
 *
 * @see https://docs.apify.com/platform/actors/running/runs-and-builds#logging
 */
export declare class LogClient extends ResourceClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * Retrieves the log as a string.
     *
     * @param options - Log retrieval options.
     * @param options.raw - If `true`, returns raw log content without any processing. Default is `false`.
     * @returns The log content as a string, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/log-get
     */
    get(options?: LogOptions): Promise<string | undefined>;
    /**
     * Retrieves the log as a Readable stream. Only works in Node.js.
     *
     * @param options - Log retrieval options.
     * @param options.raw - If `true`, returns raw log content without any processing. Default is `false`.
     * @returns The log content as a Readable stream, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/log-get
     */
    stream(options?: LogOptions): Promise<Readable | undefined>;
}
export interface LogOptions {
    /** @default false */
    raw?: boolean;
}
/**
 * Logger for redirected actor logs.
 */
export declare class LoggerActorRedirect extends Logger {
    constructor(options?: {});
    _log(level: LogLevel, message: string, data?: any, exception?: unknown, opts?: Record<string, any>): string | undefined;
}
/**
 * Helper class for redirecting streamed Actor logs to another log.
 */
export declare class StreamedLog {
    private destinationLog;
    private streamBuffer;
    private splitMarker;
    private relevancyTimeLimit;
    private logClient;
    private streamingTask;
    private stopLogging;
    constructor(options: StreamedLogOptions);
    /**
     * Start log redirection.
     */
    start(): void;
    /**
     * Stop log redirection.
     */
    stop(): Promise<void>;
    /**
     * Get log stream from response and redirect it to another log.
     */
    private streamLog;
    private logStreamChunks;
    /**
     * Parse the buffer and log complete messages.
     */
    private logBufferContent;
}
export interface StreamedLogOptions {
    /** Log client used to communicate with the Apify API. */
    logClient: LogClient;
    /** Log to which the Actor run logs will be redirected. */
    toLog: Log;
    /** Whether to redirect all logs from Actor run start (even logs from the past). */
    fromStart?: boolean;
}
//# sourceMappingURL=log.d.ts.map