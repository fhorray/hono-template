import { drizzle } from 'drizzle-orm/d1';


export const getDb = (env: CloudflareEnv) => {
  const drizzleDb = drizzle(env.DB);
  return drizzleDb;
}