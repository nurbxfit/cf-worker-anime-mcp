import { Hono } from 'hono'
import ServerMCP from './server'
import { Env } from './types/env'

const app = new Hono<{ Bindings: Env }>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.mount('/sse', ServerMCP.serveSSE('/sse').fetch, { replaceRequest: false })
app.mount('/mcp', ServerMCP.serve('/mcp').fetch, { replaceRequest: false })

export default app
export {
  ServerMCP
};
