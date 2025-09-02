import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { z } from 'zod';
import AnimeTool from "./tools/anime-tool";
import JikanMoeService from "./services/jikan-service";
import HttpClient from "./utils/http-client";
import { Octokit } from "octokit";
import MangaTool from "./tools/manga-tool";

class ServerMCP extends McpAgent {
    server = new McpServer({
        name: 'jikan-anime-worker-mcp',
        version: '1.0.0',
    })

    async init(): Promise<void> {
        // console.log('env:', this.env)
        const env = this.env as Env;
        const jikan = new JikanMoeService(new HttpClient(env.MYANIMELIST_API))
        const animeTool = new AnimeTool(jikan);
        const mangeTool = new MangaTool(jikan);

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

        this.server.registerTool(
            "get-top-manga-list",
            {
                title: "Get top mange list",
                description: "Get list of top mange from myanimelist.net",
                inputSchema: {
                    limit: z.number().min(1).max(100).default(10)
                }
            },
            (args) => mangeTool.getTopManga(args)
        )

        // Use the upstream access token to facilitate tools
        this.server.tool(
            "userInfoOctokit",
            "Get user info from GitHub, via Octokit",
            {},
            async () => {
                const octokit = new Octokit({ auth: this.props.accessToken });
                return {
                    content: [
                        {
                            text: JSON.stringify(await octokit.rest.users.getAuthenticated()),
                            type: "text",
                        },
                    ],
                };
            },
        );
    }
}

export default ServerMCP;