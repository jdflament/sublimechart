"use client"

import { useFormContext } from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import {ColorPicker} from "@/components/ui/color-picker";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Slider} from "@/components/ui/slider";

export function ChartLegend() {
  const form = useFormContext();

  const display = !!form.watch('config.options.plugins.legend.display');

  return (
  <div className="rounded-lg border p-4">
    <div className="flex flex-row items-center justify-between">
      <div className="space-y-0.5">
        <FormLabel className="text-sm font-semibold">
          Legend
        </FormLabel>
        <FormDescription>
          Display the legend
        </FormDescription>
      </div>
      <FormField
        control={form.control}
        name="config.options.plugins.legend.display"
        render={({ field }) => (
          <FormItem>
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
    </div>
    { display && (
      <div className="mt-2 flex flex-col space-y-2">
        <FormField
          control={form.control}
          name="config.options.plugins.legend.labels.color"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">
                Color
              </FormLabel>
              <FormControl className="flex gap-2">
                <ColorPicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="config.options.plugins.legend.position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the position" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                  <SelectItem value="left">Left</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="config.options.plugins.legend.align"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alignment</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the alignment" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="start">Start</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="end">End</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="config.options.plugins.legend.labels.font.size"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormControl>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <FormLabel>Font size</FormLabel>
                    <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                        {value ?? '-'}
                      </span>
                  </div>
                  <Slider
                    max={20}
                    min={5}
                    defaultValue={[value]}
                    step={1}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    aria-label="Font size"
                    onValueChange={(values) => onChange(values[0])}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="config.options.plugins.legend.labels.padding"
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
      </div>
    )}
  </div>
  );
}
