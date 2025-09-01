import { Hono } from "hono";
import type { OAuthHelpers } from '@cloudflare/workers-oauth-provider';
import { AuthHandler } from "../handlers/auth-handler";

const app = new Hono<{ Bindings: Env & { OAUTH_PROVIDER: OAuthHelpers } }>();

app.get('/authorize', AuthHandler.checkAuthorize);
app.post('/authorize', AuthHandler.authorize);
app.get('/callback', AuthHandler.authCallback);


export {
    app as OAuthHandler
}