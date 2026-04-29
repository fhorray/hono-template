import { Hono } from 'hono'
import { auth } from '~/lib/auth/server';
import corsMiddleware from './middlewares/cors';
import authMiddleware from './middlewares/auth';
import { logger } from 'hono/logger';
import contextMiddleware from './middlewares/context';

const api = new Hono().basePath('/api')

  // Middlewares
  .use(logger())
  .use(corsMiddleware)
  .use(authMiddleware)
  .use(contextMiddleware)

  .on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw))

  .get('/hello', (c) => {
    return c.json({
      message: 'Hello from Hono API!',
      timestamp: Date.now()
    })
  })

export default api
