"use client"

import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export function ChartAxis() {
  const form = useFormContext();

  const type = form.watch('config.type');

  const XYOptions = [
    {
      name: "grid.display",
      label: "Grid",
    },
    {
      name: "ticks.display",
      label: "Labels",
    },
    {
      name: "border.display",
      label: "Border",
    },
    {
      name: "stacked",
      label: "Stacked",
    },
  ];

  const ROptions = [
    {
      name: "grid.display",
      label: "Grid",
    },
    {
      name: "ticks.display",
      label: "Labels",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="config.options.scales.x"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">X Axis</FormLabel>
              <FormDescription>
                Enable/Disable X Axis options
              </FormDescription>
            </div>
            <div className="flex w-full space-x-4">
              {XYOptions.map((option) => (
                <FormField
                  key={`x-axis-${option.name}`}
                  control={form.control}
                  name={`config.options.scales.x.${option.name}`}
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={option.name}
                        className="flex flex-row items-start space-x-2 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="config.options.scales.x"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Y Axis</FormLabel>
              <FormDescription>
                Enable/Disable Y Axis options
              </FormDescription>
            </div>
            <div className="flex w-full space-x-4">
              {XYOptions.map((option) => (
                <FormField
                  key={`y-axis-${option.name}`}
                  control={form.control}
                  name={`config.options.scales.y.${option.name}`}
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={option.name}
                        className="flex flex-row items-start space-x-2 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      { ['doughnut', 'radar', 'pie'].includes(type) && (
        <FormField
          control={form.control}
          name="config.options.scales.r"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">R Axis</FormLabel>
                <FormDescription>
                  Enable/Disable R Axis options
                </FormDescription>
              </div>
              <div className="flex w-full space-x-4">
                {ROptions.map((option) => (
                  <FormField
                    key={`r-axis-${option.name}`}
                    control={form.control}
                    name={`config.options.scales.r.${option.name}`}
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={option.name}
                          className="flex flex-row items-start space-x-2 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
