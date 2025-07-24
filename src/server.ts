import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { z } from 'zod';
import { animeTool } from "./tools/anime-tool";

class ServerMCP extends McpAgent {
    server = new McpServer({
        name: 'sse-worker-mcp',
        version: '1.0.0',
    })

    async init(): Promise<void> {
        this.server.registerTool(
            "get-top-anime-list",
            {
                title: 'Get top anime list',
                description: 'Get list of top anime list from myanimelist.net',
                inputSchema: {
                    limit: z.number().min(1).max(100).default(10)
                }
            },
            (args) => animeTool.getTopAnimeList(args)
        )
    }
}

export default ServerMCP;