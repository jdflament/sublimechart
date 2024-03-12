"use client"

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

export function ChartWatermark() {
  const form = useFormContext();

  return (
  <FormField
    control={form.control}
    name="watermark"
    render={({ field }) => (
      <FormItem className="flex">
        <FormControl>
          <div className="flex items-center space-x-2">
            <FormLabel>Watermark</FormLabel>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </div>
        </FormControl>
      </FormItem>
    )}
  />
  );
}
