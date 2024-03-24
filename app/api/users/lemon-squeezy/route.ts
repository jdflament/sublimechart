import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { proPlan } from "@/config/subscriptions"
import { authOptions } from "@/lib/auth"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { absoluteUrl } from "@/lib/utils"
import { setupLemonSqueezy } from "@/lib/lemonsqueezy";
import { createCheckout, getOrder } from "@lemonsqueezy/lemonsqueezy.js";
import { env } from "@/env.mjs";

const billingUrl = absoluteUrl("/dashboard/billing")

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(null, { status: 403 })
    }

    const subscriptionPlan = await getUserSubscriptionPlan(session.user.id)

    setupLemonSqueezy();

    // The user is on the pro plan.
    // Create a portal session to manage subscription.
     if (subscriptionPlan.isPro && subscriptionPlan.lemonSqueezyOrderId) {
       const response = await getOrder(subscriptionPlan.lemonSqueezyOrderId);

      return new Response(JSON.stringify({ url: response.data?.data?.attributes?.urls?.receipt }))
    }

    // The user is on the free plan, create a checkout to upgrade.
    const response = await createCheckout(proPlan.lemonSqueezyStoreId, proPlan.lemonSqueezyVariantId, {
      productOptions: {
        redirectUrl: billingUrl,
      },
      checkoutData: {
        email: session.user.email,
        name: session.user.name || '',
      },
      expiresAt: null,
      testMode: env.NODE_ENV === 'development',
    });

    return new Response(JSON.stringify({ url: response.data?.data?.attributes?.url }))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
