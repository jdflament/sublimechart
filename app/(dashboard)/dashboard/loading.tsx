import { DashboardHeader } from "@/components/header"
import { ChartItem } from "@/components/chart-item"
import { DashboardShell } from "@/components/shell"
import { ChartCreateButton } from "@/components/chart-create-button";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Charts" text="Create and manage your charts.">
        <ChartCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <ChartItem.Skeleton />
        <ChartItem.Skeleton />
        <ChartItem.Skeleton />
        <ChartItem.Skeleton />
        <ChartItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
