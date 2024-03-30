"use client"

import { ChartPadding } from "@/components/chart-padding";
import { ChartAxis } from "@/components/chart-axis";
import { ChartLegend } from "@/components/chart-legend";
import { ChartDataLabels } from "@/components/chart-data-labels";
import { ChartFont } from "@/components/chart-font";
import { ChartAnimations } from "@/components/chart-animations";

export function ChartOptions() {
  return (
    <div className="flex flex-col gap-4">
      <ChartPadding />
      <ChartFont />
      <ChartAnimations />
      <ChartLegend />
      <ChartDataLabels />
      <ChartAxis />
    </div>
  );
}
