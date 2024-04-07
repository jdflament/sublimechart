"use client"

import { useFormContext } from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { ColorPicker } from "@/components/ui/color-picker";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FontPicker } from "@/components/ui/font-picker";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";
import * as React from "react";

export function ChartSubTitle() {
  const form = useFormContext();

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Subtitle</h4>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the chart subtitle.
        </p>
      </div>
      <div className="grid gap-4">
        <div className="flex flex-row items-center justify-between">
          <div className="space-y-0.5">
            <FormLabel className="text-sm font-semibold">
              Display
            </FormLabel>
            <FormDescription>
              Show a description of the chart
            </FormDescription>
          </div>
          <FormField
            control={form.control}
            name="config.options.plugins.subtitle.display"
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

        <FormField
          control={form.control}
          name="config.options.plugins.subtitle.text"
          render={({ field }) => (
            <FormItem className="flex w-full">
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="config.options.plugins.subtitle.font.family"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Font-Family</FormLabel>
              <FontPicker {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="config.options.plugins.subtitle.font.size"
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
                    max={40}
                    min={10}
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
          name="config.options.plugins.subtitle.padding"
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
        <FormField
          control={form.control}
          name="config.options.plugins.subtitle.align"
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
          name="config.options.plugins.subtitle.position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a position" />
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
          name="config.options.plugins.subtitle.color"
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
      </div>
    </div>
  );
}
