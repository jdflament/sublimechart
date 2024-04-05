import Link from "next/link"
import { Chart } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ChartActions } from "@/components/chart-actions"

interface ChartItemProps {
  chart: Pick<Chart, "id" | "config" | "createdAt">
}

export function ChartItem({ chart }: ChartItemProps) {
  const title = chart.config?.options?.plugins?.title?.text;

  return (
    <Link href={`/playground/${chart.id}`} className="flex items-center justify-between p-4 hover:bg-secondary">
      <div className="grid gap-1">
        <p className="font-semibold">
          {title}
        </p>
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
