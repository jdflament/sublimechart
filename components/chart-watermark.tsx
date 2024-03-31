"use client"

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { usePlayground } from "@/components/playground-context";

export function ChartWatermark() {
  const form = useFormContext();
  const { isPro, toggleProPlanModal } = usePlayground();

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
                onCheckedChange={isPro ? field.onChange : toggleProPlanModal}
              />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
