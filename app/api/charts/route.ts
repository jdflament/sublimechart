import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { chartCreateSchema } from "@/lib/validations/chart";

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const subscriptionPlan = await getUserSubscriptionPlan(user.id)
    const charts = await db.chart.findMany({
      select: {
        id: true,
        aspectRatio: true,
        config: true,
        createdAt: true,
        watermark: !subscriptionPlan?.isPro,
      },
      where: {
        authorId: user.id,
      },
    })

    return new Response(JSON.stringify(charts))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // If user is on a free plan.
    // Check if user has reached limit of 3 charts.
    if (!subscriptionPlan?.isPro) {
      const count = await db.chart.count({
        where: {
          authorId: user.id,
        },
      })

      if (count >= 3) {
        throw new RequiresProPlanError()
      }
    }

    const json = await req.json()
    const body = chartCreateSchema.parse(json)

    const chart = await db.chart.create({
      data: {
        aspectRatio: body.aspectRatio,
        // @ts-ignore
        config: body.config,
        authorId: session.user.id,
        watermark: body.watermark,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(chart))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 })
    }

    return new Response(null, { status: 500 })
  }
}
