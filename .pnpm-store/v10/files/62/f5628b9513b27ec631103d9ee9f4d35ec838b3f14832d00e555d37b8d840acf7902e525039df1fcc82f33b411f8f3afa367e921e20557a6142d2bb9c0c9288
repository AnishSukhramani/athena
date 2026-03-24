"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperAgentService = void 0;
const client_1 = require("../../client");
const constants_1 = require("../../types/constants");
const utils_1 = require("../../utils");
const base_1 = require("../base");
class HyperAgentService extends base_1.BaseService {
    /**
     * Start a new HyperAgent task job
     * @param params The parameters for the task job
     */
    async start(params) {
        try {
            return await this.request("/task/hyper-agent", {
                method: "POST",
                body: JSON.stringify(params),
            });
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError("Failed to start HyperAgent task job", undefined);
        }
    }
    /**
     * Get the status of a HyperAgent task job
     * @param id The ID of the task job to get
     */
    async getStatus(id) {
        try {
            return await this.request(`/task/hyper-agent/${id}/status`);
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to get HyperAgent task job ${id} status`, undefined);
        }
    }
    /**
     * Get the result of a HyperAgent task job
     * @param id The ID of the task job to get
     */
    async get(id) {
        try {
            return await this.request(`/task/hyper-agent/${id}`);
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to get HyperAgent task job ${id}`, undefined);
        }
    }
    /**
     * Stop a HyperAgent task job
     * @param id The ID of the task job to stop
     */
    async stop(id) {
        try {
            return await this.request(`/task/hyper-agent/${id}/stop`, {
                method: "PUT",
            });
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to stop HyperAgent task job ${id}`, undefined);
        }
    }
    /**
     * Start a HyperAgent task job and wait for it to complete
     * @param params The parameters for the task job
     */
    async startAndWait(params) {
        const job = await this.start(params);
        const jobId = job.jobId;
        if (!jobId) {
            throw new client_1.HyperbrowserError("Failed to start HyperAgent task job, could not get job ID");
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
                    throw new client_1.HyperbrowserError(`Failed to poll HyperAgent task job ${jobId} after ${constants_1.POLLING_ATTEMPTS} attempts: ${error}`);
                }
            }
            await (0, utils_1.sleep)(2000);
        }
    }
}
exports.HyperAgentService = HyperAgentService;
