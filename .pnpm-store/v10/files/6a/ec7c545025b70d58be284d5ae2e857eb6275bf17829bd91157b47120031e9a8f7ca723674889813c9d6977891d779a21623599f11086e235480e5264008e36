"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlService = void 0;
const base_1 = require("./base");
const utils_1 = require("../utils");
const client_1 = require("../client");
const constants_1 = require("../types/constants");
class CrawlService extends base_1.BaseService {
    /**
     * Start a new crawl job
     * @param params The parameters for the crawl job
     */
    async start(params) {
        try {
            return await this.request("/crawl", {
                method: "POST",
                body: JSON.stringify(params),
            });
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError("Failed to start crawl job", undefined);
        }
    }
    /**
     * Get the status of a crawl job
     * @param id The ID of the crawl job to get
     */
    async getStatus(id) {
        try {
            return await this.request(`/crawl/${id}/status`);
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to get crawl job status ${id}`, undefined);
        }
    }
    /**
     * Get the status of a crawl job
     * @param id The ID of the crawl job to get
     * @param params Optional parameters to filter the crawl job
     */
    async get(id, params) {
        try {
            return await this.request(`/crawl/${id}`, undefined, {
                page: params?.page,
                batchSize: params?.batchSize,
            });
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError(`Failed to get crawl job ${id}`, undefined);
        }
    }
    /**
     * Start a crawl job and wait for it to complete
     * @param params The parameters for the crawl job
     * @param returnAllPages Whether to return all pages in the crawl job response
     */
    async startAndWait(params, returnAllPages = true) {
        const job = await this.start(params);
        const jobId = job.jobId;
        if (!jobId) {
            throw new client_1.HyperbrowserError("Failed to start crawl job, could not get job ID");
        }
        let failures = 0;
        let jobStatus = "pending";
        while (true) {
            try {
                const { status } = await this.getStatus(jobId);
                if (status === "completed" || status === "failed") {
                    jobStatus = status;
                    break;
                }
                failures = 0;
            }
            catch (error) {
                failures++;
                if (failures >= constants_1.POLLING_ATTEMPTS) {
                    throw new client_1.HyperbrowserError(`Failed to poll crawl job ${jobId} after ${constants_1.POLLING_ATTEMPTS} attempts: ${error}`);
                }
            }
            await (0, utils_1.sleep)(2000);
        }
        failures = 0;
        if (!returnAllPages) {
            while (true) {
                try {
                    return await this.get(jobId);
                }
                catch (error) {
                    failures++;
                    if (failures >= constants_1.POLLING_ATTEMPTS) {
                        throw new client_1.HyperbrowserError(`Failed to get crawl job ${jobId} after ${constants_1.POLLING_ATTEMPTS} attempts: ${error}`);
                    }
                }
                await (0, utils_1.sleep)(500);
            }
        }
        failures = 0;
        const jobResponse = {
            jobId,
            status: jobStatus,
            data: [],
            currentPageBatch: 0,
            totalPageBatches: 0,
            totalCrawledPages: 0,
            batchSize: 100,
        };
        let firstCheck = true;
        while (firstCheck || jobResponse.currentPageBatch < jobResponse.totalPageBatches) {
            try {
                const tmpJobResponse = await this.get(jobId, {
                    page: jobResponse.currentPageBatch + 1,
                    batchSize: 100,
                });
                if (tmpJobResponse.data) {
                    jobResponse.data?.push(...tmpJobResponse.data);
                }
                if (tmpJobResponse.error) {
                    jobResponse.error = tmpJobResponse.error;
                }
                jobResponse.currentPageBatch = tmpJobResponse.currentPageBatch;
                jobResponse.totalCrawledPages = tmpJobResponse.totalCrawledPages;
                jobResponse.totalPageBatches = tmpJobResponse.totalPageBatches;
                jobResponse.batchSize = tmpJobResponse.batchSize;
                failures = 0;
                firstCheck = false;
            }
            catch (error) {
                failures++;
                if (failures >= constants_1.POLLING_ATTEMPTS) {
                    throw new client_1.HyperbrowserError(`Failed to get crawl job ${jobId} after ${constants_1.POLLING_ATTEMPTS} attempts: ${error}`);
                }
            }
            await (0, utils_1.sleep)(500);
        }
        return jobResponse;
    }
}
exports.CrawlService = CrawlService;
