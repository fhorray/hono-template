import { createMiddleware } from 'hono/factory';
import { auth } from '~/lib/auth/server';
import { db } from '~/server/database/client';

export default createMiddleware(async (c, next) => {
  c.set('db', db);

  const services = {
    auth: auth
  }

  c.set('services', services);

  return next();
});