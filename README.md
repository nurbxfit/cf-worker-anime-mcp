# SSE & Streamable HTTP MCP Server for Cloudflare Workers

This repository provides a simple implementation of a Server-Sent Events (SSE) and streamable HTTP MCP server using [Hono](https://hono.dev/) as the framework for Cloudflare Workers. You can deploy this server to Cloudflare Workers or run it locally for development and testing.

## Features

- **SSE Endpoint:** Real-time updates via Server-Sent Events.
- **Streamable HTTP:** Supports streamable HTTP responses.
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
            "command": "npx",
            "args": [
                "mcp-remote",
                "http://localhost:8787/mcp"
            ]
        }
    }
}
```
