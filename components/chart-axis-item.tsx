"use client"

import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { ColorPicker } from "@/components/ui/color-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

interface ChartAxisItem {
  axis: string;
  options: { name: string; label: string }[];
}

export function ChartAxisItem({ axis, options }: ChartAxisItem) {
  const form = useFormContext();
  const { setValue } = form;

  const hasGrid  = form.watch(`config.options.scales.${axis}.grid.display`);
  const hasLabels  = form.watch(`config.options.scales.${axis}.ticks.display`);
  const hasBorder  = form.watch(`config.options.scales.${axis}.border.display`);
  const hasPointLabels  = form.watch(`config.options.scales.${axis}.pointLabels.display`);
  const hasUnit  = form.watch(`config.options.scales.${axis}.ticks.unit.display`);
  const unit = form.watch(`config.options.scales.${axis}.ticks.unit.value`);
  const position = form.watch(`config.options.scales.${axis}.ticks.unit.position`);

  function generateTickCallback(display: boolean, unit: string, position: string) {
    return function (value: number, index: number, ticks: number[]) {
      const label = this.getLabelForValue(value);

      if (!display) return label;

      switch (position) {
        case 'before':
          return `${unit}${label}`;
        case 'after':
          return `${label}${unit}`;
      }
    };
  }

  useEffect(() => {
    if (unit && position) {
      setValue(`config.options.scales.${axis}.ticks.callback`, generateTickCallback(hasUnit, unit, position));
    }
  }, [axis, hasUnit, unit, position, setValue]);

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

      <div className="mt-2 flex flex-col gap-4">
        <FormField
          control={form.control}
          name={`config.options.scales.${axis}`}
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

        { hasUnit && (
          <div className="mt-2 flex gap-4">
            <div className="grid w-full gap-2">
              <FormLabel>Unit</FormLabel>
              <FormField
                control={form.control}
                key={`config.options.scales.${axis}.ticks.unit.value`}
                name={`config.options.scales.${axis}.ticks.unit.value`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="flex gap-2">
                      <Input placeholder="Unit" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid w-full gap-2">
              <FormLabel>Unit position</FormLabel>
              <FormField
                control={form.control}
                key={`config.options.scales.${axis}.ticks.unit.position`}
                name={`config.options.scales.${axis}.ticks.unit.position`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="before">Before</SelectItem>
                        <SelectItem value="after">After</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

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
