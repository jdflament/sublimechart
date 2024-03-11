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
      <FormItem className="flex items-center gap-2">
        <FormLabel>Watermark</FormLabel>
        <FormControl>
          <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
      </FormItem>
    )}
  />
  );
}
