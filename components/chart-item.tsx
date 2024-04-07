import Link from "next/link"
import { Chart } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ChartActions } from "@/components/chart-actions"
import { UserSubscriptionPlan } from "@/types";

interface ChartItemProps {
  chart: Pick<Chart, "id" | "config" | "createdAt">
  subscriptionPlan: UserSubscriptionPlan
}

export function ChartItem({ chart, subscriptionPlan }: ChartItemProps) {
  const title = chart.config?.options?.plugins?.title?.text;
  let subtitle;

  if (
    subscriptionPlan.isPro &&
    chart.config?.options?.plugins?.subtitle?.display &&
    chart?.config?.options?.plugins?.subtitle?.text
  ) {
    subtitle = chart.config?.options?.plugins?.subtitle?.text;
  }

  return (
    <Link href={`/playground/${chart.id}`} className="flex items-center justify-between p-4 hover:bg-secondary">
      <div className="grid gap-1">
        <div className="gap-0">
          <p className="font-semibold">
            {title}
          </p>
          { subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(chart.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <ChartActions chart={{ id: chart.id }} />
    </Link>
  )
}

ChartItem.Skeleton = function ChartItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
