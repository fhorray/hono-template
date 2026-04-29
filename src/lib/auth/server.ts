import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, emailOTP } from "better-auth/plugins"

export const auth = betterAuth({
  baseURL: process.env.APP_URL || 'http://localhost:3000',
  database: drizzleAdapter(db, {}),

  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID!,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //   },
  // },

  plugins: [
    admin(),
    emailOTP({
      sendVerificationOTP: async ({ email, otp, type, }) => {
        console.log('OTP:', otp, 'Type:', type, 'Email:', email);
      },
    })
  ],

});
