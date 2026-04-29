import { cors } from "hono/cors";
import { ALLOWED_ORIGINS } from "~/constants";

export default cors({
  origin: (origin) => {
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
      return origin;
    }
    return ALLOWED_ORIGINS[0];
  },
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  credentials: true,
});