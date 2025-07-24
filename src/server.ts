import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";

class ServerMCP extends McpAgent {
    server = new McpServer({
        name: 'sse-worker-mcp',
        version: '1.0.0',
    })

    async init(): Promise<void> {

    }
}

export default ServerMCP;