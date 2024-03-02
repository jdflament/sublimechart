import { ComponentType } from 'react';
import { DoughnutChart } from "@/components/icons/DoughnutChart";
import { BarChart } from "@/components/icons/BarChart";
import { LineChart } from "@/components/icons/LineChart";
import { PolarAreaChart } from "@/components/icons/PolarAreaChart";
import { RadarChart } from "@/components/icons/RadarChart";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ChartSelector {
  name: string
  type: string,
  icon: ComponentType<{ className?: string }>
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

export function ChartSelector() {
  const form = useFormContext();
  const type = form.watch('config.type');

  return (
    <FormField
      control={form.control}
      name="config.type"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormMessage />
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="mx-auto flex flex-wrap justify-center gap-2 pt-2"
          >
            {chartSelectors.map(chartSelector => (
              <FormItem key={chartSelector.type}>
                <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                  <FormControl>
                    <RadioGroupItem checked={type === chartSelector.type} value={chartSelector.type} className="sr-only" />
                  </FormControl>
                  <div className="cursor-pointer items-center rounded-md border-2 border-muted p-3 hover:border-accent">
                    <div className="flex justify-center">
                      <ChartSelectorIcon icon={chartSelector.icon} />
                    </div>
                    <span className="whitespace-nowrap text-xs font-semibold leading-7">
                    {chartSelector.name}
                  </span>
                  </div>
                </FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        </FormItem>
        )}
    />
  )
}
