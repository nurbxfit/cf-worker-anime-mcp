import { Hono } from 'hono'
import ServerMCP from './server'
import { Env } from './types/env'
import OAuthProvider from '@cloudflare/workers-oauth-provider';
import { OAuthHandler } from './routes/auth';

// Context from the auth process, encrypted & stored in the auth token
// and provided to the DurableMCP as this.props
type Props = {
  login: string;
  name: string;
  email: string;
  accessToken: string;
};

const ALLOWED_USERNAMES = new Set<string>([
  // Add GitHub usernames of users who should have access to the image generation tool
  // For example: 'yourusername', 'coworkerusername'
]);

// const app = new Hono<{ Bindings: Env }>()

// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })

// app.mount('/sse', ServerMCP.serveSSE('/sse').fetch, { replaceRequest: false })
// app.mount('/mcp', ServerMCP.serve('/mcp').fetch, { replaceRequest: false })

// export default app

export default new OAuthProvider({
  // NOTE - during the summer 2025, the SSE protocol was deprecated and replaced by the Streamable-HTTP protocol
  // https://developers.cloudflare.com/agents/model-context-protocol/transport/#mcp-server-with-authentication
  apiHandlers: {
    "/sse": ServerMCP.serveSSE("/sse"), // deprecated SSE protocol - use /mcp instead
    "/mcp": ServerMCP.serve("/mcp"), // Streamable-HTTP protocol
  },
  authorizeEndpoint: "/authorize",
  clientRegistrationEndpoint: "/register",
  defaultHandler: OAuthHandler as any,
  tokenEndpoint: "/token",
});
export {
  ServerMCP
};
