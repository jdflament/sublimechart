// @ts-nocheck
// TODO: Fix this when we turn strict mode on.
import { UserSubscriptionPlan } from "types"
import { freePlan, proPlan } from "@/config/subscriptions"
import { db } from "@/lib/db"

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      lemonSqueezyOrderId: true,
      lemonSqueezyCustomerId: true,
      lemonSqueezyLicenseKey: true,
    },
  })

  if (!user) {
    throw new Error("User not found")
  }

  // Check if user is on a pro plan.
  const isPro = user.lemonSqueezyLicenseKey && user.lemonSqueezyOrderId

  const plan = isPro ? proPlan : freePlan

  return {
    ...plan,
    ...user,
    isPro,
  }
}
