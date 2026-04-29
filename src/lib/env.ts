import { getContext } from 'hono/context-storage';

/**
 * Returns the Cloudflare bindings (env) from anywhere within the lifecycle of a Hono request.
 * 
 * @example
 * const env = getEnv();
 * const db = drizzle(env.DB);
 */
export const getEnv = () => {
  try {
    return getContext<{ Bindings: CloudflareEnv }>().env;
  } catch (error) {
    throw new Error(
      'getEnv() must be called within the lifecycle of a Hono request. ' +
      'Verify that the contextStorage() middleware is registered.'
    );
  }
};
