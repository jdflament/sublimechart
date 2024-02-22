import React from 'react';

import { Chart } from "@prisma/client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { DoughnutChart } from "@/components/icons/DoughnutChart";
import { BarChart } from "@/components/icons/BarChart";
import { LineChart } from "@/components/icons/LineChart";
import { PolarAreaChart } from "@/components/icons/PolarAreaChart";
import { RadarChart } from "@/components/icons/RadarChart";

interface ChartSelector {
  name: string
  type: string,
  icon: React.ComponentType<{ className?: string }>
}

const chartSelectors: Array<ChartSelector> = [
  {
    name: 'Line Chart',
    type: 'line',
    icon: LineChart,
  },
  {
    name: 'Bar Chart',
    type: 'bar',
    icon: BarChart,
  },
  {
    name: 'Doughnut Chart',
    type: 'doughnut',
    icon: DoughnutChart,
  },
  {
    name: 'Polar Chart',
    type: 'polarArea',
    icon: PolarAreaChart,
  },
  {
    name: 'Radar Chart',
    type: 'radar',
    icon: RadarChart,
  },
]

function ChartSelectorIcon({ icon: Icon }: { icon: ChartSelector['icon'] }) {
  return (
    <Icon className="h-6 w-6" />
  )
}

interface ChartSelectorProps {
  chart: Pick<Chart, "id" | "config">
}

export function ChartSelector({ chart }: ChartSelectorProps) {
  return (
    <ToggleGroup
      className="flex flex-wrap"
      variant="outline"
      type="single"
      defaultValue={chart.config?.type}
    >
      {chartSelectors.map(chartSelector => (
        <ToggleGroupItem
          className="flex h-auto flex-col p-3"
          key={chartSelector.type}
          value={chartSelector.type}
          aria-label={chartSelector.name}
        >
          <ChartSelectorIcon icon={chartSelector.icon} />
          <span className="whitespace-nowrap text-xs font-semibold leading-7">
            {chartSelector.name}
          </span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
