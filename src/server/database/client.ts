import { drizzle } from 'drizzle-orm/d1';
import { getEnv } from '~/env';


/**
 * Returns the Drizzle database instance without needing to pass the env manually.
 * In the Worker, uses the DB binding (D1).
 * In the CLI, attempts to use the local sqlite driver.
 */
export const db = new Proxy({} as any, {
  get(_, prop) {
    const env = getEnv();
    let dbInstance;

    if (env.DB) {
      dbInstance = drizzle(env.DB);
    } else {
      // Fallback to CLI/Local
      try {
        const { drizzle: drizzleSqlite } = require('drizzle-orm/better-sqlite3');
        const Database = require('better-sqlite3');
        const sqlite = new Database('local.db');
        dbInstance = drizzleSqlite(sqlite);
      } catch (e) {
        throw new Error("D1 binding 'DB' not found and 'better-sqlite3' is not installed.");
      }
    }

    const value = (dbInstance as any)[prop];
    return typeof value === 'function' ? value.bind(dbInstance) : value;
  }
}) as ReturnType<typeof drizzle>;

