import { BasicResponse, CreateSessionParams, GetActiveSessionsCountResponse, GetSessionDownloadsUrlResponse, GetSessionRecordingUrlResponse, GetSessionVideoRecordingUrlResponse, SessionDetail, SessionListParams, SessionListResponse, SessionRecording, UploadFileOptions, UploadFileResponse, SessionEventLogListParams, SessionEventLogListResponse } from "../types/session";
import { BaseService } from "./base";
/**
 * Service for managing session event logs
 */
declare class SessionEventLogsService extends BaseService {
    /**
     * List event logs for a session
     * @param sessionId The ID of the session
     * @param params Optional parameters to filter the event logs
     */
    list(sessionId: string, params?: SessionEventLogListParams): Promise<SessionEventLogListResponse>;
}
export declare class SessionsService extends BaseService {
    readonly eventLogs: SessionEventLogsService;
    constructor(apiKey: string, baseUrl: string, timeout: number);
    /**
     * Create a new browser session
     * @param params Configuration parameters for the new session
     */
    create(params?: CreateSessionParams): Promise<SessionDetail>;
    /**
     * Get details of an existing session
     * @param id The ID of the session to get
     */
    get(id: string): Promise<SessionDetail>;
    /**
     * Stop a running session
     * @param id The ID of the session to stop
     */
    stop(id: string): Promise<BasicResponse>;
    /**
     * List all sessions with optional filtering
     * @param params Optional parameters to filter the sessions
     */
    list(params?: SessionListParams): Promise<SessionListResponse>;
    /**
     * Get the recording of a session
     * @param id The ID of the session to get the recording from
     */
    getRecording(id: string): Promise<SessionRecording[]>;
    /**
     * Get the recording URL of a session
     * @param id The ID of the session to get the recording URL from
     */
    getRecordingURL(id: string): Promise<GetSessionRecordingUrlResponse>;
    /**
     * Get the video recording URL of a session
     * @param id The ID of the session to get the video recording URL from
     */
    getVideoRecordingURL(id: string): Promise<GetSessionVideoRecordingUrlResponse>;
    /**
     * Get the downloads URL of a session
     * @param id The ID of the session to get the downloads URL from
     */
    getDownloadsURL(id: string): Promise<GetSessionDownloadsUrlResponse>;
    /**
     * Upload a file to the session
     * @param id The ID of the session to upload the file to
     * @param fileOptions Options for uploading a file
     * @param fileOptions.fileInput File path string, ReadStream, or Buffer containing the file data
     * @param fileOptions.fileName Optional name to use for the uploaded file. Required when fileInput is a Buffer
     */
    uploadFile(id: string, fileOptions: UploadFileOptions): Promise<UploadFileResponse>;
    /**
     * Helper method to check if input is a readable stream
     */
    private isReadableStream;
    /**
     * Get the number of active sessions
     */
    getActiveSessionsCount(): Promise<GetActiveSessionsCountResponse>;
}
export {};
