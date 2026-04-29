import "hono";
import type { db } from "~/server/database/client";
import type { auth } from "~/lib/auth/server";

declare module 'hono' {
  interface ContextVariableMap {
    db: typeof db;
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
    services: {
      auth: typeof auth;
    }
  }
}