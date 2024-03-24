import { SubscriptionPlan } from "types"
import { env } from "@/env.mjs"
import { freeTier, proTier } from "@/config/tiers";

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description: "The free plan has limited features. <strong>Upgrade to PRO plan to get more!</strong><br />Your current features:",
  features: freeTier.features,
  lemonSqueezyStoreId: "",
  lemonSqueezyVariantId: "",
}

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "Thank you to be part of the SublimeChart journey! Here are the features that you can access:",
  features: proTier.features,
  lemonSqueezyStoreId: env.LEMONSQUEEZY_STORE_ID || "",
  lemonSqueezyVariantId: env.LEMONSQUEEZY_VARIANT_ID || "",
}
