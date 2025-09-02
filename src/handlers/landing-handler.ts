import { Context } from "hono";

export const LandingPageHandler = (c: Context) => {
    return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Jikan MCP Server</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 2rem;
                line-height: 1.6;
                background: #f8fafc;
            }
            .container {
                background: white;
                padding: 2rem;
                border-radius: 12px;
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            }
            h1 {
                color: #1e293b;
                margin-bottom: 1rem;
            }
            p {
                color: #64748b;
                margin-bottom: 1rem;
            }
            .endpoints {
                background: #f1f5f9;
                padding: 1rem;
                border-radius: 8px;
                margin: 1.5rem 0;
            }
            .endpoint {
                font-family: 'Monaco', 'Menlo', monospace;
                color: #0f172a;
                margin: 0.5rem 0;
            }
            .note {
                background: #fef3c7;
                padding: 1rem;
                border-radius: 8px;
                border-left: 4px solid #f59e0b;
                margin-top: 1.5rem;
            }
            .github-section {
                background: #f8fafc;
                padding: 1.5rem;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
                margin: 1.5rem 0;
                text-align: center;
            }
            .github-link {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: #24292f;
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 500;
                transition: background-color 0.2s;
            }
            .github-link:hover {
                background: #32383f;
            }
            .profile-link {
                display: inline-block;
                color: #3b82f6;
                text-decoration: none;
                font-weight: 500;
                margin-left: 0.5rem;
            }
            .profile-link:hover {
                text-decoration: underline;
            }
            .features {
                background: #ecfdf5;
                padding: 1rem;
                border-radius: 8px;
                border-left: 4px solid #10b981;
                margin: 1.5rem 0;
            }
            .feature-list {
                margin: 0.5rem 0;
                padding-left: 1.5rem;
            }
            .feature-list li {
                margin: 0.25rem 0;
                color: #065f46;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🔌 Jikan MCP Server</h1>
            <p>Welcome to the Jikan (MyAnimeList) Model Context Protocol (MCP) Server. This server provides secure API endpoints for MCP communication with MyAnimeList data.</p>
            
            <div class="features">
                <h3>🌟 Features:</h3>
                <ul class="feature-list">
                    <li>Access to top anime and manga lists from MyAnimeList</li>
                    <li>Secure OAuth-protected endpoints</li>
                    <li>Support for both SSE and Streamable-HTTP protocols</li>
                    <li>Easy integration with Claude Desktop and other MCP clients</li>
                </ul>
            </div>
            
            <div class="endpoints">
                <h3>📡 Available Endpoints:</h3>
                <div class="endpoint">🔒 /mcp - Streamable-HTTP protocol (protected)</div>
                <div class="endpoint">🔒 /sse - Server-Sent Events protocol (deprecated, protected)</div>
                <div class="endpoint">🔐 /authorize - OAuth authorization</div>
                <div class="endpoint">🔐 /token - OAuth token endpoint</div>
                <div class="endpoint">📝 /register - Client registration</div>
            </div>

            <div class="github-section">
                <h3>📚 Documentation & Source Code</h3>
                <p>Find setup instructions, examples, and contribute to the project:</p>
                <a href="https://github.com/nurbxfit/cf-worker-anime-mcp" target="_blank" rel="noopener noreferrer" class="github-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub
                </a>
            </div>

            <div class="note">
                <strong>🔐 Authentication Required:</strong> This MCP server is protected by OAuth. You'll need proper authentication to access the MCP endpoints.
                <br><br>
                <strong>👨‍💻 Developer:</strong> Built by nurbxfit
            </div>
        </div>
    </body>
    </html>
  `)
}