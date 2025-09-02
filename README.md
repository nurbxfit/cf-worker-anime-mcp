# SSE & Streamable HTTP MCP Server Example for Cloudflare Workers

This repository provides a simple implementation of a MCP server using [Hono](https://hono.dev/) as the framework for Cloudflare Workers. You can deploy this server to Cloudflare Workers or run it locally for development and testing.

## Features

- **SSE Endpoint:** Real-time updates via Server-Sent Events.
- **Streamable HTTP (MCP):** Supports streamable HTTP responses.
- **Easy Deployment:** Ready for Cloudflare Workers.
- **Local Development:** Run locally with Wrangler.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Deploy to Cloudflare Workers

```bash
npm run deploy
```

## Testing

You can test the SSE endpoint using the [Model Context Protocol Inspector](https://www.npmjs.com/package/@modelcontextprotocol/inspector):

```bash
npx @modelcontextprotocol/inspector
```

Then, open your browser and navigate to [http://localhost:6277](http://localhost:6277) to access the test dashboard.

- Select **Transport Type** as **Streamable HTTP**.
- Click **Connect** to establish a connection.
- Click **List Tools** to view available tools.

## Integration with Claude 
To use this server with claude, you can add the following configuration to claude_desktop.json:

```json
{
    "mcpServers": {
        "myanime-list": {
            "type": "http",
            "url": "https://jikan-anime-worker-mcp.nurbxfit.workers.dev/mcp",
            "command": "npx",
            "args": [
                "mcp-remote",
                "https://jikan-anime-worker-mcp.nurbxfit.workers.dev/mcp"
            ]
        }
    }
}
```
# Self Deployment Setup 

## For Auth
For authorization with Github Oauth in your own deployment, you need to do the followings:
- Create a Github OAuth App
- Set the callback URL to your server's URL
- Add the client ID and client secret to your environment variables

## Create Github OAuth App
1. Click on your github profile avatar
2. Go to Settings
3. Scroll down to Developer settings
4. Click on OAuth Apps
5. Click on New OAuth App
6. Fill in the required fields
7. Set the callback URL to your server's URL
8. Click on Register application

## Add Environment Variables
For this you need to use cloudflare secret to securely store the information.
use the followings wrangler commands:

```bash
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET
wrangler secret put COOKIE_ENCRYPTION_KEY
```

## Callback url
example: https://your-server-url.com/callback
