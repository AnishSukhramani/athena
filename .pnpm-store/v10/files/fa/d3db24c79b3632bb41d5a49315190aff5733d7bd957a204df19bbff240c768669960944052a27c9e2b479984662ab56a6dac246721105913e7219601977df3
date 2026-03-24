"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsService = void 0;
const fs_1 = require("fs");
const path = __importStar(require("path"));
const form_data_1 = __importDefault(require("form-data"));
const base_1 = require("./base");
const client_1 = require("../client");
/**
 * Service for managing session event logs
 */
class SessionEventLogsService extends base_1.BaseService {
    /**
     * List event logs for a session
     * @param sessionId The ID of the session
     * @param params Optional parameters to filter the event logs
     */
    async list(sessionId, params = {}) {
        try {
            return await this.request(`/session/${sessionId}/event-logs`, undefined, {
                ...params,
                types: params.types,
            });
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to list event logs for session ${sessionId}`, undefined);
        }
    }
}
class SessionsService extends base_1.BaseService {
    constructor(apiKey, baseUrl, timeout) {
        super(apiKey, baseUrl, timeout);
        this.eventLogs = new SessionEventLogsService(apiKey, baseUrl, timeout);
    }
    /**
     * Create a new browser session
     * @param params Configuration parameters for the new session
     */
    async create(params) {
        try {
            return await this.request("/session", {
                method: "POST",
                body: params ? JSON.stringify(params) : undefined,
            });
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError("Failed to create session", undefined);
        }
    }
    /**
     * Get details of an existing session
     * @param id The ID of the session to get
     */
    async get(id) {
        try {
            return await this.request(`/session/${id}`);
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to get session ${id}`, undefined);
        }
    }
    /**
     * Stop a running session
     * @param id The ID of the session to stop
     */
    async stop(id) {
        try {
            return await this.request(`/session/${id}/stop`, {
                method: "PUT",
            });
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to stop session ${id}`, undefined);
        }
    }
    /**
     * List all sessions with optional filtering
     * @param params Optional parameters to filter the sessions
     */
    async list(params = {}) {
        try {
            return await this.request("/sessions", undefined, {
                status: params.status,
                page: params.page,
                limit: params.limit,
            });
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError("Failed to list sessions", undefined);
        }
    }
    /**
     * Get the recording of a session
     * @param id The ID of the session to get the recording from
     */
    async getRecording(id) {
        try {
            return await this.request(`/session/${id}/recording`);
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to get recording for session ${id}`, undefined);
        }
    }
    /**
     * Get the recording URL of a session
     * @param id The ID of the session to get the recording URL from
     */
    async getRecordingURL(id) {
        try {
            return await this.request(`/session/${id}/recording-url`);
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to get recording url for session ${id}`, undefined);
        }
    }
    /**
     * Get the video recording URL of a session
     * @param id The ID of the session to get the video recording URL from
     */
    async getVideoRecordingURL(id) {
        try {
            return await this.request(`/session/${id}/video-recording-url`);
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to get video recording url for session ${id}`, undefined);
        }
    }
    /**
     * Get the downloads URL of a session
     * @param id The ID of the session to get the downloads URL from
     */
    async getDownloadsURL(id) {
        try {
            return await this.request(`/session/${id}/downloads-url`);
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to get downloads url for session ${id}`, undefined);
        }
    }
    /**
     * Upload a file to the session
     * @param id The ID of the session to upload the file to
     * @param fileOptions Options for uploading a file
     * @param fileOptions.fileInput File path string, ReadStream, or Buffer containing the file data
     * @param fileOptions.fileName Optional name to use for the uploaded file. Required when fileInput is a Buffer
     */
    async uploadFile(id, fileOptions) {
        const { fileInput, fileName } = fileOptions;
        try {
            let fetchOptions;
            if (typeof fileInput === "string") {
                let stats;
                try {
                    stats = await fs_1.promises.stat(fileInput);
                }
                catch (error) {
                    if (error.code === "ENOENT") {
                        throw new client_1.HyperbrowserError(`File not found: ${fileInput}`, undefined);
                    }
                    if (error.code === "EACCES") {
                        throw new client_1.HyperbrowserError(`Permission denied accessing file: ${fileInput}`, undefined);
                    }
                    throw new client_1.HyperbrowserError(`Failed to access file ${fileInput}: ${error.message}`, undefined);
                }
                if (!stats.isFile()) {
                    throw new client_1.HyperbrowserError(`Path is not a file: ${fileInput}`, undefined);
                }
                const formData = new form_data_1.default();
                const fileStream = (0, fs_1.createReadStream)(fileInput);
                const fileBaseName = fileName || path.basename(fileInput);
                fileStream.on("error", (error) => {
                    throw new client_1.HyperbrowserError(`Failed to read file ${fileInput}: ${error.message}`, undefined);
                });
                formData.append("file", fileStream, {
                    filename: fileBaseName,
                });
                fetchOptions = {
                    method: "POST",
                    body: formData,
                    headers: formData.getHeaders(),
                };
            }
            else if (this.isReadableStream(fileInput)) {
                const formData = new form_data_1.default();
                let tmpFileName = fileName || `file-${Date.now()}`;
                if (fileInput.path && typeof fileInput.path === "string" && !fileName) {
                    tmpFileName = path.basename(fileInput.path);
                }
                formData.append("file", fileInput, {
                    filename: tmpFileName,
                });
                fetchOptions = {
                    method: "POST",
                    body: formData,
                    headers: formData.getHeaders(),
                };
            }
            else if (Buffer.isBuffer(fileInput)) {
                if (!fileName) {
                    throw new client_1.HyperbrowserError("fileName is required when uploading Buffer data", undefined);
                }
                const formData = new form_data_1.default();
                formData.append("file", fileInput, {
                    filename: fileName,
                });
                fetchOptions = {
                    method: "POST",
                    body: formData,
                    headers: formData.getHeaders(),
                };
            }
            else {
                throw new client_1.HyperbrowserError("Unsupported file input type. Please provide a file path string, ReadStream, or Buffer.", undefined);
            }
            return await this.request(`/session/${id}/uploads`, fetchOptions);
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to upload file for session ${id}: ${error}`, undefined);
        }
    }
    /**
     * Helper method to check if input is a readable stream
     */
    isReadableStream(obj) {
        return (obj &&
            typeof obj === "object" &&
            typeof obj.read === "function" &&
            typeof obj.on === "function" &&
            obj.readable !== false);
    }
    /**
     * Get the number of active sessions
     */
    async getActiveSessionsCount() {
        try {
            return await this.request("/sessions/active-count");
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError("Failed to get active sessions count", undefined);
        }
    }
}
exports.SessionsService = SessionsService;
