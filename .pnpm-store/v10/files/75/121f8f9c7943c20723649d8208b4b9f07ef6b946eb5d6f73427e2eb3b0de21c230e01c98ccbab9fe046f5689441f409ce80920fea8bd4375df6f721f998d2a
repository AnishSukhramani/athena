import { Browser, BrowserContext, Page } from "playwright-core";
import { BrowserProviders, HyperAgentConfig, MCPConfig, MCPServerConfig } from "../types/config";
import { ActionType, ActionCacheOutput, ActionCacheReplayResult, RunFromActionCacheParams, Task, TaskOutput, TaskParams } from "../types";
import type { HyperPage, HyperVariable, ActionCacheEntry, AgentTaskOutput } from "../types/agent/types";
export declare class HyperAgent<T extends BrowserProviders = "Local"> {
    private static readonly AIACTION_CONFIG;
    private llm;
    private tasks;
    private tokenLimit;
    private debug;
    private mcpClient;
    private browserProvider;
    private browserProviderType;
    private actions;
    private cdpActionsEnabled;
    private actionCacheByTaskId;
    browser: Browser | null;
    context: BrowserContext | null;
    private _currentPage;
    private _variables;
    private errorEmitter;
    get currentPage(): HyperPage | null;
    set currentPage(page: Page);
    constructor(params?: HyperAgentConfig<T>);
    /**
     *  This is just exposed as a utility function. You don't need to call it explicitly.
     * @returns A reference to the current rebrowser-playwright browser instance.
     */
    initBrowser(): Promise<Browser>;
    /**
     * Use this function instead of accessing this.actions directly.
     * This function configures if there is a need for an output schema as a part of the complete action.
     * @param outputSchema
     * @returns
     */
    private getActions;
    /**
     * Get all variables
     * @returns Record of variables
     */
    getVariables(): Record<string, HyperVariable>;
    /**
     * Set a variable
     * @param key Key of the variable
     * @param value Value of the variable
     */
    addVariable(variable: HyperVariable): void;
    /**
     * Get a variable
     * @param key Key of the variable
     * @returns Value of the variable
     */
    getVariable(key: string): HyperVariable | undefined;
    /**
     * Delete a variable
     * @param key Key of the variable
     */
    deleteVariable(key: string): void;
    getActionCache(taskId: string): ActionCacheOutput | null;
    /**
     * Get all pages in the context
     * @returns Array of HyperPage objects
     */
    getPages(): Promise<HyperPage[]>;
    /**
     * Create a new page in the context
     * @returns HyperPage object
     */
    newPage(): Promise<HyperPage>;
    /**
     * Close the agent and all associated resources
     */
    closeAgent(): Promise<void>;
    /**
     * Get the current page or create a new one if none exists
     * @returns The current page
     */
    getCurrentPage(): Promise<Page>;
    /**
     * Get task control object for a specific task
     * @param taskId ID of the task
     * @returns Task control object
     */
    private getTaskControl;
    /**
     * Execute a task asynchronously and return a Task control object
     * @param task The task to execute
     * @param params Optional parameters for the task
     * @param initPage Optional page to use for the task
     * @returns A promise that resolves to a Task control object for managing the running task
     */
    executeTaskAsync(task: string, params?: TaskParams, initPage?: Page): Promise<Task>;
    /**
     * Execute a task and wait for completion
     * @param task The task to execute
     * @param params Optional parameters for the task
     * @param initPage Optional page to use for the task
     * @returns A promise that resolves to the task output
     */
    executeTask(task: string, params?: TaskParams, initPage?: Page): Promise<AgentTaskOutput>;
    runFromActionCache(cache: ActionCacheOutput, pageOrGetter: Page | (() => Page), params?: RunFromActionCacheParams): Promise<ActionCacheReplayResult>;
    /**
     * Find element with retry logic
     * Retries element finding with DOM refetch until element is found or max retries reached
     *
     * @param instruction Natural language instruction for the action
     * @param page The page to search on
     * @param maxRetries Maximum number of retry attempts
     * @param retryDelayMs Delay between retries in milliseconds
     * @returns Object containing the found element, DOM state, and element map
     * @throws Error if element is not found after all retries
     */
    private findElementWithRetry;
    private writeDebugData;
    /**
     * Collect interactive elements from element map for debugging
     * Extracts elements with interactive roles (button, link, textbox, etc.)
     *
     * @param elementMap Map of element IDs to element data
     * @param limit Maximum number of elements to collect
     * @returns Array of interactive elements with id, role, and label
     */
    private collectInteractiveElements;
    /**
     * Execute a single granular action using a11y mode
     * Internal method used by page.perform() (and deprecated page.aiAction())
     *
     * Architecture: Simple examine->act flow
     * - 1 LLM call (examineDom finds element and suggests method)
     * - Direct execution (no agent loop)
     *
     * @param instruction Natural language instruction for a single action
     * @param page The page to execute the action on
     * @returns A promise that resolves to the task output
     */
    executeSingleAction(instruction: string, pageOrGetter: Page | (() => Page), _params?: TaskParams): Promise<TaskOutput>;
    /**
     * Register a new action with the agent
     * @param action The action to register
     */
    private registerAction;
    /**
     * Initialize the MCP client with the given configuration
     * @param config The MCP configuration
     */
    initializeMCPClient(config: MCPConfig): Promise<void>;
    /**
     * Connect to an MCP server at runtime
     * @param serverConfig Configuration for the MCP server
     * @returns Server ID if connection was successful
     */
    connectToMCPServer(serverConfig: MCPServerConfig): Promise<string | null>;
    /**
     * Disconnect from a specific MCP server
     * @param serverId ID of the server to disconnect from
     * @returns Boolean indicating if the disconnection was successful
     */
    disconnectFromMCPServer(serverId: string): boolean;
    /**
     * Check if a specific MCP server is connected
     * @param serverId ID of the server to check
     * @returns Boolean indicating if the server is connected
     */
    isMCPServerConnected(serverId: string): boolean;
    /**
     * Get all connected MCP server IDs
     * @returns Array of server IDs
     */
    getMCPServerIds(): string[];
    /**
     * Get information about all connected MCP servers
     * @returns Array of server information objects or null if no MCP client is initialized
     */
    getMCPServerInfo(): Array<{
        id: string;
        toolCount: number;
        toolNames: string[];
    }> | null;
    /**
     * Pretty print an action
     * @param action The action to print
     * @returns Formatted string representation of the action
     */
    pprintAction(action: ActionType): string;
    getSession(): Browser | import("@hyperbrowser/sdk/types").SessionDetail | null;
    createScriptFromActionCache(steps: ActionCacheEntry[], taskId?: string): string;
    private setupHyperPage;
}
