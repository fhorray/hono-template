import { Hono } from 'hono'

const api = new Hono()

// Example API endpoint
api.get('/api/hello', (c) => {
  return c.json({
    message: 'Hello from Hono API!',
    timestamp: Date.now()
  })
})

export default api
