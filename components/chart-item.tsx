import Link from "next/link"
import { Chart } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ChartActions } from "@/components/chart-actions"
import { UserSubscriptionPlan } from "@/types";
import { ChartIcon } from "@/components/chart-icon";
import { charts } from "@/config/charts";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChartItemProps {
  chart: Pick<Chart, "id" | "config" | "createdAt">
  subscriptionPlan: UserSubscriptionPlan
}

export function ChartItem({ chart, subscriptionPlan }: ChartItemProps) {
  const title = chart.config?.options?.plugins?.title?.text;

  const chartType = charts.find((c) => c.type === chart.config?.type);

  let subtitle;

  if (
    subscriptionPlan.isPro &&
    chart.config?.options?.plugins?.subtitle?.display &&
    chart?.config?.options?.plugins?.subtitle?.text
  ) {
    subtitle = chart.config?.options?.plugins?.subtitle?.text;
  }

  const labels = chart.config?.data?.datasets?.map((dataset) => dataset.label).join(' ,');

  return (
    <Link href={`/playground/${chart.id}`} className="flex items-center justify-between p-4 hover:bg-secondary">
      <div className="grid gap-1">
        <div className="mb-2">
          <div className="flex justify-center gap-1">
            { chartType && (
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ChartIcon icon={chartType.icon} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{chartType.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <p className="mb-1 font-semibold">
              {title}
            </p>
          </div>
          { labels && (
            <p className="text-xs font-semibold text-muted-foreground">{labels}</p>
          )}
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
