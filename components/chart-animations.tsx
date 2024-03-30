"use client"

import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import * as React from "react";
import { animations } from "@/config/animations";
import { Combobox } from "@/components/ui/combobox";

export function ChartAnimations() {
  const form = useFormContext();
  const hasAnimation = !!form.watch('config.options.animations');
  const [selectedAnimations, setSelectedAnimations] = React.useState<string[]>([]);

  function handleSelectAnimation(values) {
    setSelectedAnimations(values);

    // convert values to animations
    const selected = animations.filter((animation) => values.includes(animation.value));

    form.setValue(`config.options.animations`, true);

    selected.forEach((animation) => {
      form.setValue(`config.options.${animation.key}`, animation.animation);
    });
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex flex-row items-center justify-between">
        <div className="space-y-0.5">
          <FormLabel className="text-sm font-semibold">
            Animations
          </FormLabel>
          <FormDescription>
            Use animations to make your chart more interactive.
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="config.options.animations"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      { hasAnimation && (
        <div className="mt-2 flex gap-4">
          <Combobox
            selectPlaceholder={"Select one or more animations"}
            searchPlaceholder={"Search animations"}
            options={animations}
            onValueChange={handleSelectAnimation}
            value={selectedAnimations}
            multiple={true}
            clearable={true}
          />
        </div>
      )}
    </div>
  )
}
