import { getContext } from 'hono/context-storage';
import { config } from 'dotenv';

// Load .dev.vars variables into process.env (CLI/Local)
config({ path: '.dev.vars' });

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
    // Fallback to process.env when called outside of a Hono request (ex: CLI, Migrations)
    return process.env as unknown as CloudflareEnv;
  }
};

/**
 * Proxy to access environment variables.
 * @example
 * env.DB;
 * env.APP_URL;
 * env.GOOGLE_CLIENT_ID;
 * env.GOOGLE_CLIENT_SECRET;
 */
export const env = new Proxy({} as CloudflareEnv, {
  get(_, prop) {
    const currentEnv = getEnv();
    return (currentEnv as any)[prop];
  }
});
