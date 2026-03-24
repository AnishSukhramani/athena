import { BasicResponse } from "../../types";
import { BaseService } from "../base";
import { HyperAgentTaskResponse, HyperAgentTaskStatusResponse, StartHyperAgentTaskParams, StartHyperAgentTaskResponse } from "../../types/agents/hyper-agent";
export declare class HyperAgentService extends BaseService {
    /**
     * Start a new HyperAgent task job
     * @param params The parameters for the task job
     */
    start(params: StartHyperAgentTaskParams): Promise<StartHyperAgentTaskResponse>;
    /**
     * Get the status of a HyperAgent task job
     * @param id The ID of the task job to get
     */
    getStatus(id: string): Promise<HyperAgentTaskStatusResponse>;
    /**
     * Get the result of a HyperAgent task job
     * @param id The ID of the task job to get
     */
    get(id: string): Promise<HyperAgentTaskResponse>;
    /**
     * Stop a HyperAgent task job
     * @param id The ID of the task job to stop
     */
    stop(id: string): Promise<BasicResponse>;
    /**
     * Start a HyperAgent task job and wait for it to complete
     * @param params The parameters for the task job
     */
    startAndWait(params: StartHyperAgentTaskParams): Promise<HyperAgentTaskResponse>;
}
