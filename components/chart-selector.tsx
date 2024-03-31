import { ComponentType } from 'react';
import { DoughnutChart } from "@/components/icons/DoughnutChart";
import { BarChart } from "@/components/icons/BarChart";
import { LineChart } from "@/components/icons/LineChart";
import { PieChart } from "@/components/icons/PieChart";
import { RadarChart } from "@/components/icons/RadarChart";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {ProOverlay} from "@/components/pro-overlay";
import {usePlayground} from "@/components/playground-context";
import {cn} from "@/lib/utils";

interface ChartSelector {
  name: string
  type: string,
  icon: ComponentType<{ className?: string }>
  pro: boolean
}

const chartSelectors: Array<ChartSelector> = [
  {
    name: 'Line Chart',
    type: 'line',
    icon: LineChart,
    pro: false,
  },
  {
    name: 'Bar Chart',
    type: 'bar',
    icon: BarChart,
    pro: false,
  },
  {
    name: 'Doughnut Chart',
    type: 'doughnut',
    icon: DoughnutChart,
    pro: false,
  },
  {
    name: 'Pie Chart',
    type: 'pie',
    icon: PieChart,
    pro: true,
  },
  {
    name: 'Radar Chart',
    type: 'radar',
    icon: RadarChart,
    pro: true,
  },
]

function ChartSelectorIcon({ icon: Icon }: { icon: ChartSelector['icon'] }) {
  return (
    <Icon className="h-6 w-6" />
  )
}

export function ChartSelector() {
  const form = useFormContext();
  const { isPro, toggleProPlanModal } = usePlayground();
  const type = form.watch('config.type');

  return (
    <FormField
      control={form.control}
      name="config.type"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormMessage />
          <RadioGroup
            value={type}
            className="mx-auto flex flex-wrap justify-center gap-2 pt-2"
          >
            {chartSelectors.map(chartSelector => (
              <FormItem key={chartSelector.type} className={chartSelector.pro ? "group relative" : ""}>
                <>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem checked={type === chartSelector.type} value={chartSelector.type} onClick={chartSelector.pro && !isPro ? toggleProPlanModal : field.onChange} className="sr-only" />
                    </FormControl>
                    <div className={cn(
                      "cursor-pointer items-center rounded-md border-2 border-muted p-3 hover:border-accent",
                      chartSelector.pro && !isPro && "opacity-50",
                    )}>
                      <div className="flex justify-center">
                        <ChartSelectorIcon icon={chartSelector.icon} />
                      </div>
                      <span className="whitespace-nowrap text-xs font-semibold leading-7">
                        {chartSelector.name}
                      </span>
                    </div>
                  </FormLabel>
                  {chartSelector.pro && !isPro && (
                    <ProOverlay />
                  )}
                </>
              </FormItem>
            ))}
          </RadioGroup>
        </FormItem>
        )}
    />
  )
}
