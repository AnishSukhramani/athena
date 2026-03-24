"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuaService = void 0;
const client_1 = require("../../client");
const constants_1 = require("../../types/constants");
const utils_1 = require("../../utils");
const base_1 = require("../base");
class CuaService extends base_1.BaseService {
    /**
     * Start a new CUA task job
     * @param params The parameters for the task job
     */
    async start(params) {
        try {
            return await this.request("/task/cua", {
                method: "POST",
                body: JSON.stringify(params),
            });
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError("Failed to start CUA task job", undefined);
        }
    }
    /**
     * Get the status of a CUA task job
     * @param id The ID of the task job to get
     */
    async getStatus(id) {
        try {
            return await this.request(`/task/cua/${id}/status`);
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to get CUA task job ${id} status`, undefined);
        }
    }
    /**
     * Get the result of a CUA task job
     * @param id The ID of the task job to get
     */
    async get(id) {
        try {
            return await this.request(`/task/cua/${id}`);
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to get CUA task job ${id}`, undefined);
        }
    }
    /**
     * Stop a CUA task job
     * @param id The ID of the task job to stop
     */
    async stop(id) {
        try {
            return await this.request(`/task/cua/${id}/stop`, { method: "PUT" });
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to stop CUA task job ${id}`, undefined);
        }
    }
    /**
     * Start a CUA task job and wait for it to complete
     * @param params The parameters for the task job
     */
    async startAndWait(params) {
        const job = await this.start(params);
        const jobId = job.jobId;
        if (!jobId) {
            throw new client_1.HyperbrowserError("Failed to start CUA task job, could not get job ID");
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
                    throw new client_1.HyperbrowserError(`Failed to poll CUA task job ${jobId} after ${constants_1.POLLING_ATTEMPTS} attempts: ${error}`);
                }
            }
            await (0, utils_1.sleep)(2000);
        }
    }
}
exports.CuaService = CuaService;
