"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractService = void 0;
const zod_1 = require("zod");
const zod_to_json_schema_1 = require("zod-to-json-schema");
const base_1 = require("./base");
const utils_1 = require("../utils");
const client_1 = require("../client");
const constants_1 = require("../types/constants");
class ExtractService extends base_1.BaseService {
    /**
     * Start a new extract job
     * @param params The parameters for the extract job
     */
    async start(params) {
        try {
            if (!params.schema && !params.prompt) {
                throw new client_1.HyperbrowserError("Either schema or prompt must be provided");
            }
            if (params.schema) {
                if ((0, utils_1.isZodSchema)(params.schema)) {
                    try {
                        params.schema = (0, zod_1.toJSONSchema)(params.schema);
                    }
                    catch {
                        params.schema = (0, zod_to_json_schema_1.zodToJsonSchema)(params.schema);
                    }
                }
            }
            return await this.request("/extract", {
                method: "POST",
                body: JSON.stringify(params),
            });
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError("Failed to start extract job", undefined);
        }
    }
    /**
     * Get the status of an extract job
     * @param id The ID of the extract job to get
     */
    async getStatus(id) {
        try {
            return await this.request(`/extract/${id}/status`);
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to get extract job status ${id}`, undefined);
        }
    }
    /**
     * Get the details of an extract job
     * @param id The ID of the extract job to get
     */
    async get(id) {
        try {
            return await this.request(`/extract/${id}`);
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to get extract job ${id}`, undefined);
        }
    }
    /**
     * Start an extract job and wait for it to complete
     * @param params The parameters for the extract job
     */
    async startAndWait(params) {
        const job = await this.start(params);
        const jobId = job.jobId;
        if (!jobId) {
            throw new client_1.HyperbrowserError("Failed to start extract job, could not get job ID");
        }
        let failures = 0;
        while (true) {
            try {
                const { status } = await this.getStatus(jobId);
                if (status === "completed" || status === "failed") {
                    return await this.get(jobId);
                }
                failures = 0;
            }
            catch (error) {
                failures++;
                if (failures >= constants_1.POLLING_ATTEMPTS) {
                    throw new client_1.HyperbrowserError(`Failed to poll extract job ${jobId} after ${constants_1.POLLING_ATTEMPTS} attempts: ${error}`);
                }
            }
            await (0, utils_1.sleep)(2000);
        }
    }
}
exports.ExtractService = ExtractService;
