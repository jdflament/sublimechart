"use client"

import { ChartPadding } from "@/components/chart-padding";
import { ChartAxis } from "@/components/chart-axis";
import { ChartLegend } from "@/components/chart-legend";
import { ChartDataLabels } from "@/components/chart-data-labels";

export function ChartOptions() {
  return (
    <div className="flex flex-col gap-4">
      <ChartLegend />
      <ChartPadding />
      <ChartDataLabels />
      <ChartAxis />
    </div>
  );
}
