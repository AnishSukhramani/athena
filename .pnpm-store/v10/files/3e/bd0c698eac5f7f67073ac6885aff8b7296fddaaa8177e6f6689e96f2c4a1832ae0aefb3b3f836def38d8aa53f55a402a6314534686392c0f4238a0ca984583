import { BasicResponse } from "../../types";
import { BaseService } from "../base";
import { GeminiComputerUseTaskResponse, GeminiComputerUseTaskStatusResponse, StartGeminiComputerUseTaskParams, StartGeminiComputerUseTaskResponse } from "../../types/agents/gemini-computer-use";
export declare class GeminiComputerUseService extends BaseService {
    /**
     * Start a new Gemini Computer Use task job
     * @param params The parameters for the task job
     */
    start(params: StartGeminiComputerUseTaskParams): Promise<StartGeminiComputerUseTaskResponse>;
    /**
     * Get the status of a Gemini Computer Use task job
     * @param id The ID of the task job to get
     */
    getStatus(id: string): Promise<GeminiComputerUseTaskStatusResponse>;
    /**
     * Get the result of a Gemini Computer Use task job
     * @param id The ID of the task job to get
     */
    get(id: string): Promise<GeminiComputerUseTaskResponse>;
    /**
     * Stop a Gemini Computer Use task job
     * @param id The ID of the task job to stop
     */
    stop(id: string): Promise<BasicResponse>;
    /**
     * Start a Gemini Computer Use task job and wait for it to complete
     * @param params The parameters for the task job
     */
    startAndWait(params: StartGeminiComputerUseTaskParams): Promise<GeminiComputerUseTaskResponse>;
}
