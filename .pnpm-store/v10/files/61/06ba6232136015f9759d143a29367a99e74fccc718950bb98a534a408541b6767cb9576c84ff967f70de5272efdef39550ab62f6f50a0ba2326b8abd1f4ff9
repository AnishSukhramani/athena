"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCPClient = void 0;
const zod_1 = require("zod");
const index_js_1 = require("@modelcontextprotocol/sdk/client/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/client/stdio.js");
const sse_js_1 = require("@modelcontextprotocol/sdk/client/sse.js");
const uuid_1 = require("uuid");
class MCPClient {
    constructor(debug = false) {
        this.servers = new Map();
        this.debug = debug;
    }
    /**
     * Connect to an MCP server and register its tools
     * @param serverConfig The server configuration
     * @returns List of action definitions provided by the server
     */
    async connectToServer(serverConfig) {
        try {
            // Generate or use provided server ID
            const serverId = serverConfig.id || (0, uuid_1.v4)();
            // Create transport for this server
            let transport;
            const connectionType = serverConfig?.connectionType || "stdio";
            if (connectionType === "sse") {
                if (!serverConfig.sseUrl) {
                    throw new Error("SSE URL is required for SSE connection type");
                }
                if (this.debug) {
                    console.log(`Establishing SSE connection to ${serverConfig.sseUrl}...`);
                }
                transport = new sse_js_1.SSEClientTransport(new URL(serverConfig.sseUrl), serverConfig.sseHeaders
                    ? {
                        requestInit: {
                            headers: serverConfig.sseHeaders,
                        },
                    }
                    : undefined);
                transport.onerror = (error) => {
                    console.error(`SSE error: ${error.message}`);
                };
            }
            else {
                if (!serverConfig.command) {
                    throw new Error("Command is required for stdio connection type");
                }
                transport = new stdio_js_1.StdioClientTransport({
                    command: serverConfig.command,
                    args: serverConfig.args,
                    env: {
                        ...(process.env ?? {}),
                        ...(serverConfig.env ?? {}),
                    },
                    // Pipe stdin/stdout, ignore stderr
                    stderr: this.debug ? "inherit" : "ignore",
                });
            }
            const client = new index_js_1.Client({
                name: `hyperagent-mcp-client-${serverId}`,
                version: "1.0.0",
            });
            await client.connect(transport);
            const toolsResult = await client.listTools();
            const toolsMap = new Map();
            // Create actions for each tool
            const actions = toolsResult.tools
                .filter((tool) => {
                if (serverConfig.includeTools &&
                    !serverConfig.includeTools.includes(tool.name)) {
                    return false;
                }
                if (serverConfig.excludeTools &&
                    serverConfig.excludeTools.includes(tool.name)) {
                    return false;
                }
                return true;
            })
                .map((tool) => {
                // Store tool reference for later use
                toolsMap.set(tool.name, tool);
                // Create action definition
                return {
                    type: tool.name,
                    actionParams: zod_1.z
                        .object({
                        params: zod_1.z
                            .string()
                            .describe(`The stringified parameters to the ${tool.name} MCP tool. Here is the schema: ${JSON.stringify(tool.inputSchema)}`),
                    })
                        .describe(tool.description ?? ""),
                    run: async (ctx, action) => {
                        if (!ctx.mcpClient) {
                            throw new Error("MCP client not available. Please ensure an MCP server is connected.");
                        }
                        const params = JSON.parse(action.params);
                        const targetServerId = serverId;
                        const result = await ctx.mcpClient.executeTool(tool.name, params, targetServerId);
                        return {
                            success: true,
                            message: `MCP tool ${tool.name} execution successful: ${JSON.stringify(result)}`,
                        };
                    },
                };
            });
            // Store server connection
            this.servers.set(serverId, {
                id: serverId,
                config: serverConfig,
                client,
                transport,
                tools: toolsMap,
                actions,
            });
            if (this.debug) {
                console.log(`Connected to MCP server with ID: ${serverId}`);
                console.log("Added tools:", Array.from(toolsMap.keys()));
            }
            return { serverId, actions };
        }
        catch (e) {
            console.error("Failed to connect to MCP server: ", e);
            throw e;
        }
    }
    /**
     * Execute a tool on a specific server
     * @param toolName The name of the tool to execute
     * @param parameters The parameters to pass to the tool
     * @param serverId The ID of the server to use (optional)
     * @returns The result of the tool execution
     */
    async executeTool(toolName, parameters, serverId) {
        // If no server ID provided and only one server exists, use that one
        if (!serverId && this.servers.size === 1) {
            serverId = [...this.servers.keys()][0];
        }
        // If no server ID provided and multiple servers exist, try to find one with the tool
        if (!serverId && this.servers.size > 1) {
            for (const [id, server] of this.servers.entries()) {
                if (server.tools.has(toolName)) {
                    serverId = id;
                    break;
                }
            }
        }
        if (!serverId || !this.servers.has(serverId)) {
            throw new Error(`No valid server found for tool ${toolName}`);
        }
        const server = this.servers.get(serverId);
        if (!server) {
            throw new Error(`Server with ID ${serverId} not found`);
        }
        try {
            const result = await server.client.callTool({
                name: toolName,
                arguments: parameters,
            });
            return result;
        }
        catch (e) {
            console.error(`Error executing tool ${toolName} on server ${serverId}:`, e);
            throw e;
        }
    }
    /**
     * Get all registered action definitions from all connected servers
     * @returns Array of action definitions
     */
    getAllActions() {
        const allActions = [];
        for (const server of this.servers.values()) {
            allActions.push(...server.actions);
        }
        return allActions;
    }
    /**
     * Get the IDs of all connected servers
     * @returns Array of server IDs
     */
    getServerIds() {
        return [...this.servers.keys()];
    }
    /**
     * Disconnect from a specific server
     * @param serverId The ID of the server to disconnect from
     */
    async disconnectServer(serverId) {
        const server = this.servers.get(serverId);
        if (server) {
            await server.transport.close();
            this.servers.delete(serverId);
            if (this.debug) {
                console.log(`Disconnected from MCP server with ID: ${serverId}`);
            }
        }
    }
    /**
     * Disconnect from all servers
     */
    async disconnect() {
        for (const serverId of this.servers.keys()) {
            await this.disconnectServer(serverId);
        }
    }
    /**
     * Check if a tool exists on any connected server
     * @param toolName The name of the tool to check
     * @returns Boolean indicating if the tool exists and the server ID it exists on
     */
    hasTool(toolName) {
        for (const [serverId, server] of this.servers.entries()) {
            if (server.tools.has(toolName)) {
                return { exists: true, serverId };
            }
        }
        return { exists: false };
    }
    /**
     * Get information about all connected servers
     * @returns Array of server information objects
     */
    getServerInfo() {
        return Array.from(this.servers.entries()).map(([id, server]) => ({
            id,
            toolCount: server.tools.size,
            toolNames: Array.from(server.tools.keys()),
        }));
    }
    /**
     * Check if any servers are connected
     * @returns Boolean indicating if any servers are connected
     */
    hasConnections() {
        return this.servers.size > 0;
    }
}
exports.MCPClient = MCPClient;
