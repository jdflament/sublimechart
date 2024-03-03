"use client"

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";

export function ChartPadding() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="config.options.layout.padding"
      render={({ field: { value, onChange } }) => (
        <FormItem>
          <FormControl>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <FormLabel htmlFor="padding">Padding</FormLabel>
                <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                  {value ?? '-'}
                </span>
              </div>
              <Slider
                id="padding"
                max={100}
                defaultValue={[value]}
                step={1}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                aria-label="Padding"
                onValueChange={(values) => onChange(values[0])}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
