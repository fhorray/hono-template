import { defineConfig } from 'drizzle-kit';
import { env } from "./src/env";

export default defineConfig({
  out: './src/server/database/migrations',
  schema: './src/server/database/schemas/index.ts',
  dialect: 'sqlite',
  driver: 'd1-http',
  // dbCredentials: {
  //   accountId: env.CLOUDFLARE_ACCOUNT_ID,
  //   databaseId: env.CLOUDFLARE_DATABASE_ID,
  //   token: env.CLOUDFLARE_D1_TOKEN,
  // },
});
