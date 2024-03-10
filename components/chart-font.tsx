"use client"

import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {useFormContext} from "react-hook-form";
import {FontPicker} from "@/components/ui/font-picker";

export function ChartFont() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="config.options.plugins.title.font.family"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Font-Family</FormLabel>
          <FontPicker {...field} />
          <FormDescription>
            This is the font that will be used in the chart title.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
