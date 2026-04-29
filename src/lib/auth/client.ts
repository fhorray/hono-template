import { createAuthClient } from "better-auth/client";
import { env } from "../../env";
import { adminClient, emailOTPClient, } from "better-auth/client/plugins";
import { stripeClient } from "@better-auth/stripe/client";


export const authClient = createAuthClient({
  baseURL: env.APP_URL,
  plugins: [
    adminClient(),
    emailOTPClient(),
    stripeClient(),
  ],
});
