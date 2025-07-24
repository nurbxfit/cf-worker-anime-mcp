import { Hono } from 'hono'
import ServerMCP from './server'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.mount('/sse', ServerMCP.serveSSE('/sse').fetch, { replaceRequest: false })
app.mount('/mcp', ServerMCP.serve('/mcp').fetch, { replaceRequest: false })

export default app
