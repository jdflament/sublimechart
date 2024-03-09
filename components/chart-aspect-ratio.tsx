"use client"

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ChartAspectRatio() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="aspectRatio"
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select the format" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="1/1">1:1</SelectItem>
              <SelectItem value="2/3">2:3</SelectItem>
              <SelectItem value="3/2">3:2</SelectItem>
              <SelectItem value="4/3">4:3</SelectItem>
              <SelectItem value="4/5">4:5</SelectItem>
              <SelectItem value="16/9">16:9</SelectItem>
              <SelectItem value="9/16">9:16</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
