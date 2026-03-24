import { MCPServerConfig } from "../../types/config";
import { AgentActionDefinition } from "../../types";
declare class MCPClient {
    private servers;
    private debug;
    constructor(debug?: boolean);
    /**
     * Connect to an MCP server and register its tools
     * @param serverConfig The server configuration
     * @returns List of action definitions provided by the server
     */
    connectToServer(serverConfig: MCPServerConfig): Promise<{
        serverId: string;
        actions: AgentActionDefinition[];
    }>;
    /**
     * Execute a tool on a specific server
     * @param toolName The name of the tool to execute
     * @param parameters The parameters to pass to the tool
     * @param serverId The ID of the server to use (optional)
     * @returns The result of the tool execution
     */
    executeTool(toolName: string, parameters: Record<string, any>, serverId?: string): Promise<any>;
    /**
     * Get all registered action definitions from all connected servers
     * @returns Array of action definitions
     */
    getAllActions(): AgentActionDefinition[];
    /**
     * Get the IDs of all connected servers
     * @returns Array of server IDs
     */
    getServerIds(): string[];
    /**
     * Disconnect from a specific server
     * @param serverId The ID of the server to disconnect from
     */
    disconnectServer(serverId: string): Promise<void>;
    /**
     * Disconnect from all servers
     */
    disconnect(): Promise<void>;
    /**
     * Check if a tool exists on any connected server
     * @param toolName The name of the tool to check
     * @returns Boolean indicating if the tool exists and the server ID it exists on
     */
    hasTool(toolName: string): {
        exists: boolean;
        serverId?: string;
    };
    /**
     * Get information about all connected servers
     * @returns Array of server information objects
     */
    getServerInfo(): Array<{
        id: string;
        toolCount: number;
        toolNames: string[];
    }>;
    /**
     * Check if any servers are connected
     * @returns Boolean indicating if any servers are connected
     */
    hasConnections(): boolean;
}
export { MCPClient };
