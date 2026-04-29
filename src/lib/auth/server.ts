import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, emailOTP } from "better-auth/plugins"
import { db } from "~/server/database/client";
import * as schema from "~/server/database/schemas";
import { env } from "../../env";
import { stripe as stripePlugin } from "@better-auth/stripe";
import { stripeClient } from "../stripe";


// Auth Instance
export const auth = betterAuth({
  baseURL: env.APP_URL,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),

  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

  plugins: [
    admin(),
    emailOTP({
      sendVerificationOTP: async ({ email, otp, type, }) => {
        console.log('OTP:', otp, 'Type:', type, 'Email:', email);
      },
    }),
    stripePlugin({
      stripeClient,
      stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
      createCustomerOnSignUp: true,
    })
  ],

});
