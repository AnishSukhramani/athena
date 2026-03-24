import { BasicResponse } from "../../types";
import { BaseService } from "../base";
import { ClaudeComputerUseTaskResponse, ClaudeComputerUseTaskStatusResponse, StartClaudeComputerUseTaskParams, StartClaudeComputerUseTaskResponse } from "../../types/agents/claude-computer-use";
export declare class ClaudeComputerUseService extends BaseService {
    /**
     * Start a new Claude Computer Use task job
     * @param params The parameters for the task job
     */
    start(params: StartClaudeComputerUseTaskParams): Promise<StartClaudeComputerUseTaskResponse>;
    /**
     * Get the status of a Claude Computer Use task job
     * @param id The ID of the task job to get
     */
    getStatus(id: string): Promise<ClaudeComputerUseTaskStatusResponse>;
    /**
     * Get the result of a Claude Computer Use task job
     * @param id The ID of the task job to get
     */
    get(id: string): Promise<ClaudeComputerUseTaskResponse>;
    /**
     * Stop a Claude Computer Use task job
     * @param id The ID of the task job to stop
     */
    stop(id: string): Promise<BasicResponse>;
    /**
     * Start a Claude Computer Use task job and wait for it to complete
     * @param params The parameters for the task job
     */
    startAndWait(params: StartClaudeComputerUseTaskParams): Promise<ClaudeComputerUseTaskResponse>;
}
