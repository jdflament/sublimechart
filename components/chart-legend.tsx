"use client"

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

export function ChartLegend() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="config.options.plugins.legend.display"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between">
          <div className="space-y-0.5">
            <FormLabel className="text-sm">
              Legend
            </FormLabel>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              defaultChecked={true}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
