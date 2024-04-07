import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { ChartCreateButton } from "@/components/chart-create-button"
import { DashboardShell } from "@/components/shell"
import { ChartItem } from "@/components/chart-item";
import { getUserSubscriptionPlan } from "@/lib/subscription";

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  const charts = await db.chart.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      config: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Charts" text="Create and manage your charts.">
        <ChartCreateButton />
      </DashboardHeader>
      <div>
        {charts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {charts.map((chart) => (
              <ChartItem key={chart.id} chart={chart} subscriptionPlan={subscriptionPlan} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="lineChart" />
            <EmptyPlaceholder.Title>No charts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any charts yet. Start creating one now.
            </EmptyPlaceholder.Description>
            <ChartCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
