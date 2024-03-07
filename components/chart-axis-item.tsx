"use client"

import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { ColorPicker } from "@/components/ui/color-picker";

interface ChartAxisItem {
  axis: string;
  options: { name: string; label: string }[];
}

export function ChartAxisItem({ axis, options }: ChartAxisItem) {
  const form = useFormContext();
  const hasGrid  = form.watch(`config.options.scales.${axis}.grid.display`);
  const hasLabels  = form.watch(`config.options.scales.${axis}.ticks.display`);
  const hasBorder  = form.watch(`config.options.scales.${axis}.border.display`);
  const hasPointLabels  = form.watch(`config.options.scales.${axis}.pointLabels.display`);

  return (
    <div className="rounded-lg border p-4">
      <div className="flex flex-row items-center justify-between">
        <div className="space-y-0.5">
          <FormLabel className="text-sm font-semibold">{axis.toUpperCase()} Axis</FormLabel>
          <FormDescription>
            Enable/Disable {axis.toUpperCase()} Axis options
          </FormDescription>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="config.options.scales.x"
          render={() => (
            <FormItem>
              <div className="space-4 mt-2 grid w-full grid-cols-2 gap-2">
                {options.map((option) => (
                  <FormField
                    key={`${axis}-axis-${option.name}`}
                    control={form.control}
                    name={`config.options.scales.${axis}.${option.name}`}
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

        { (hasGrid || hasLabels || hasBorder || hasPointLabels) && (
          <div className="space-4 grid w-full grid-cols-2 gap-2">
            {hasGrid && (
              <div className="grid gap-2">
                <FormLabel>Grid Color</FormLabel>
                <FormField
                  control={form.control}
                  key={`config.options.scales.${axis}.grid.color`}
                  name={`config.options.scales.${axis}.grid.color`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="flex gap-2">
                        <ColorPicker {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {hasLabels && (
              <div className="grid gap-2">
                <FormLabel>Labels Color</FormLabel>
                <FormField
                  control={form.control}
                  key={`config.options.scales.${axis}.ticks.color`}
                  name={`config.options.scales.${axis}.ticks.color`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="flex gap-2">
                        <ColorPicker {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {hasBorder && axis != 'r' && (
              <div className="grid gap-2">
                <FormLabel>Border Color</FormLabel>
                <FormField
                  control={form.control}
                  key={`config.options.scales.${axis}.border.color`}
                  name={`config.options.scales.${axis}.border.color`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="flex gap-2">
                        <ColorPicker {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {hasPointLabels && (
              <div className="grid gap-2">
                <FormLabel>Point Labels Color</FormLabel>
                <FormField
                  control={form.control}
                  key={`config.options.scales.${axis}.pointLabels.color`}
                  name={`config.options.scales.${axis}.pointLabels.color`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="flex gap-2">
                        <ColorPicker {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
