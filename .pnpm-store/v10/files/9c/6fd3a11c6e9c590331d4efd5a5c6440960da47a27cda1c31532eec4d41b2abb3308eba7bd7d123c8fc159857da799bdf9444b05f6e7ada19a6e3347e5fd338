import { BasicResponse } from "../../types";
import { StartBrowserUseTaskParams, StartBrowserUseTaskResponse, BrowserUseTaskResponse, BrowserUseTaskStatusResponse } from "../../types/agents/browser-use";
import { BaseService } from "../base";
export declare class BrowserUseService extends BaseService {
    /**
     * Start a new browser-use task job
     * @param params The parameters for the task job
     */
    start(params: StartBrowserUseTaskParams): Promise<StartBrowserUseTaskResponse>;
    /**
     * Get the status of a browser-use task job
     * @param id The ID of the task job to get
     */
    getStatus(id: string): Promise<BrowserUseTaskStatusResponse>;
    /**
     * Get the result of a task job
     * @param id The ID of the task job to get
     */
    get(id: string): Promise<BrowserUseTaskResponse>;
    /**
     * Stop a task job
     * @param id The ID of the task job to stop
     */
    stop(id: string): Promise<BasicResponse>;
    /**
     * Start a browser-use task job and wait for it to complete
     * @param params The parameters for the task job
     */
    startAndWait(params: StartBrowserUseTaskParams): Promise<BrowserUseTaskResponse>;
}
