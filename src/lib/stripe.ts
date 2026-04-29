import Stripe from "stripe";
import { env } from "~/env";

// Stripe Instance (Lazy with Cache)
let _stripe: Stripe;
export const stripeClient = new Proxy({} as Stripe, {
  get(_, prop) {
    if (!_stripe) {
      _stripe = new Stripe(env.STRIPE_SECRET_KEY, {
        apiVersion: "2026-04-22.dahlia" as any,
        httpClient: Stripe.createNodeHttpClient()
      });
    }
    const value = (_stripe as any)[prop];
    return typeof value === 'function' ? value.bind(_stripe) : value;
  }
});