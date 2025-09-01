
import { AuthRequest, OAuthHelpers } from "@cloudflare/workers-oauth-provider";
import { env } from "cloudflare:workers";
import { Context } from "hono";
import { clientIdAlreadyApproved, parseRedirectApproval, renderApprovalDialog } from "../utils/worker-oauth-utils";
import { fetchUpstreamAuthToken, redirectToGithub, } from "../utils/auth-utils";
import { Octokit } from "octokit";
import type { Props } from '../utils/auth-utils'

/**
 * Note: Most of the code was copied from : https://github.com/cloudflare/ai/blob/main/demos/remote-mcp-github-oauth
 */

type AppContext = Context<{ Bindings: Env & { OAUTH_PROVIDER: OAuthHelpers, COOKIE_ENCRYPTION_KEY: string } }>;


/**
 *Used in GET request to check and redirect if user authed
 */
const checkAuthorize = async (c: AppContext) => {
    const oauthReqInfo = await c.env.OAUTH_PROVIDER.parseAuthRequest(c.req.raw);
    const { clientId } = oauthReqInfo;
    if (!clientId) {
        return c.text("Invalid request", 400);
    }

    if (
        await clientIdAlreadyApproved(c.req.raw, oauthReqInfo.clientId, env.COOKIE_ENCRYPTION_KEY)
    ) {
        return redirectToGithub(c.req.raw, oauthReqInfo);
    }

    return renderApprovalDialog(c.req.raw, {
        client: await c.env.OAUTH_PROVIDER.lookupClient(clientId),
        server: {
            description: "This is a Jikan MyAnimeList MCP Remote Server using GitHub for authentication.",
            logo: "https://avatars.githubusercontent.com/u/314135?s=200&v=4",
            name: "Jikan MyAnimeList MCP Server", // optional
        },
        state: { oauthReqInfo }, // arbitrary data that flows through the form submission below
    });
}




/**
 * Used in POST request to auth user
 */

const authorize = async (c: AppContext) => {
    // Validates form submission, extracts state, and generates Set-Cookie headers to skip approval dialog next time
    const { state, headers } = await parseRedirectApproval(c.req.raw, env.COOKIE_ENCRYPTION_KEY);
    if (!state.oauthReqInfo) {
        return c.text("Invalid request", 400);
    }

    return redirectToGithub(c.req.raw, state.oauthReqInfo, headers);
}


/**
 * OAuth Callback Handler
 *
 * This route handles the callback from GitHub after user authentication.
 * It exchanges the temporary code for an access token, then stores some
 * user metadata & the auth token as part of the 'props' on the token passed
 * down to the client. It ends by redirecting the client back to _its_ callback URL
 */
const authCallback = async (c: AppContext) => {
    // Get the oathReqInfo out of KV
    const oauthReqInfo = JSON.parse(atob(c.req.query("state") as string)) as AuthRequest;
    if (!oauthReqInfo.clientId) {
        return c.text("Invalid state", 400);
    }

    // Exchange the code for an access token
    const [accessToken, errResponse] = await fetchUpstreamAuthToken({
        client_id: c.env.GITHUB_CLIENT_ID,
        client_secret: c.env.GITHUB_CLIENT_SECRET,
        code: c.req.query("code"),
        redirect_uri: new URL("/callback", c.req.url).href,
        upstream_url: "https://github.com/login/oauth/access_token",
    });
    if (errResponse) return errResponse;

    // Fetch the user info from GitHub
    const user = await new Octokit({ auth: accessToken }).rest.users.getAuthenticated();
    const { login, name, email } = user.data;

    // Return back to the MCP client a new token
    const { redirectTo } = await c.env.OAUTH_PROVIDER.completeAuthorization({
        metadata: {
            label: name,
        },
        // This will be available on this.props inside MyMCP
        props: {
            accessToken,
            email,
            login,
            name,
        } as Props,
        request: oauthReqInfo,
        scope: oauthReqInfo.scope,
        userId: login,
    });

    return Response.redirect(redirectTo);
}


export const AuthHandler = {
    checkAuthorize,
    authorize,
    authCallback
}