import { Hono } from 'hono'
import ServerMCP from './server'
import { Env } from './types/env'
import OAuthProvider from '@cloudflare/workers-oauth-provider';
import { OAuthHandler } from './routes/auth';
import { LandingPageHandler } from './handlers/landing-handler';

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



const oauthProvider = new OAuthProvider({
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


const app = new Hono<{ Bindings: Env }>()

app.get('/', LandingPageHandler);

// Handle all other routes with the OAuth provider
app.all('*', async (c) => {
  // Skip the root path since we handled it above
  if (c.req.path === '/') {
    return c.notFound()
  }

  // Delegate to OAuth provider for all other routes
  return oauthProvider.fetch(c.req.raw, c.env, c.executionCtx)
})

export default app

export {
  ServerMCP
};
