"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserUseService = void 0;
const zod_1 = require("zod");
const zod_to_json_schema_1 = require("zod-to-json-schema");
const client_1 = require("../../client");
const constants_1 = require("../../types/constants");
const utils_1 = require("../../utils");
const base_1 = require("../base");
class BrowserUseService extends base_1.BaseService {
    /**
     * Start a new browser-use task job
     * @param params The parameters for the task job
     */
    async start(params) {
        try {
            if (params.outputModelSchema) {
                if ((0, utils_1.isZodSchema)(params.outputModelSchema)) {
                    try {
                        params.outputModelSchema = (0, zod_1.toJSONSchema)(params.outputModelSchema);
                    }
                    catch {
                        params.outputModelSchema = (0, zod_to_json_schema_1.zodToJsonSchema)(params.outputModelSchema);
                    }
                }
            }
            return await this.request("/task/browser-use", {
                method: "POST",
                body: JSON.stringify(params),
            });
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError("Failed to start browser-use task job", undefined);
        }
    }
    /**
     * Get the status of a browser-use task job
     * @param id The ID of the task job to get
     */
    async getStatus(id) {
        try {
            return await this.request(`/task/browser-use/${id}/status`);
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to get browser-use task job ${id} status`, undefined);
        }
    }
    /**
     * Get the result of a task job
     * @param id The ID of the task job to get
     */
    async get(id) {
        try {
            return await this.request(`/task/browser-use/${id}`);
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to get browser-use task job ${id}`, undefined);
        }
    }
    /**
     * Stop a task job
     * @param id The ID of the task job to stop
     */
    async stop(id) {
        try {
            return await this.request(`/task/browser-use/${id}/stop`, { method: "PUT" });
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to stop browser-use task job ${id}`, undefined);
        }
    }
    /**
     * Start a browser-use task job and wait for it to complete
     * @param params The parameters for the task job
     */
    async startAndWait(params) {
        const job = await this.start(params);
        const jobId = job.jobId;
        if (!jobId) {
            throw new client_1.HyperbrowserError("Failed to start browser-use task job, could not get job ID");
        }
        let failures = 0;
        while (true) {
            try {
                const { status } = await this.getStatus(jobId);
                if (status === "completed" || status === "failed" || status === "stopped") {
                    return await this.get(jobId);
                }
                failures = 0;
            }
            catch (error) {
                failures++;
                if (failures >= constants_1.POLLING_ATTEMPTS) {
                    throw new client_1.HyperbrowserError(`Failed to poll browser-use task job ${jobId} after ${constants_1.POLLING_ATTEMPTS} attempts: ${error}`);
                }
            }
            await (0, utils_1.sleep)(2000);
        }
    }
}
exports.BrowserUseService = BrowserUseService;
