import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { z } from 'zod';
import AnimeTool from "./tools/anime-tool";
import JikanMoeService from "./services/jikan-service";
import HttpClient from "./utils/http-client";

class ServerMCP extends McpAgent {
    server = new McpServer({
        name: 'jikan-anime-worker-mcp',
        version: '1.0.0',
    })

    async init(): Promise<void> {
        // console.log('env:', this.env)
        const env = this.env as Env;
        const animeTool = new AnimeTool(new JikanMoeService(new HttpClient(env.MYANIMELIST_API)));

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