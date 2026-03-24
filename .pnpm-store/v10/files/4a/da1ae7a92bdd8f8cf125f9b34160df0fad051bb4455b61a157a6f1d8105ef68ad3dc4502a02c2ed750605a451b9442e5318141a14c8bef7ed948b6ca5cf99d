import { BasicResponse } from "../../types";
import { BaseService } from "../base";
import { CuaTaskResponse, CuaTaskStatusResponse, StartCuaTaskParams, StartCuaTaskResponse } from "../../types/agents/cua";
export declare class CuaService extends BaseService {
    /**
     * Start a new CUA task job
     * @param params The parameters for the task job
     */
    start(params: StartCuaTaskParams): Promise<StartCuaTaskResponse>;
    /**
     * Get the status of a CUA task job
     * @param id The ID of the task job to get
     */
    getStatus(id: string): Promise<CuaTaskStatusResponse>;
    /**
     * Get the result of a CUA task job
     * @param id The ID of the task job to get
     */
    get(id: string): Promise<CuaTaskResponse>;
    /**
     * Stop a CUA task job
     * @param id The ID of the task job to stop
     */
    stop(id: string): Promise<BasicResponse>;
    /**
     * Start a CUA task job and wait for it to complete
     * @param params The parameters for the task job
     */
    startAndWait(params: StartCuaTaskParams): Promise<CuaTaskResponse>;
}
