"use client"

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartTitle } from "@/components/chart-title";
import {ChartSubTitle} from "@/components/chart-subtitle";
import {usePlayground} from "@/components/playground-context";
import { ProOverlay } from "@/components/pro-overlay";
import * as React from "react";
import {useState} from "react";

export function ChartTitles() {
  const form = useFormContext();
  const [tab, setTab] = useState<string>('title');
  const { isPro, toggleProPlanModal } = usePlayground();

  return (
    <div className="flex w-full items-center space-x-2 md:max-w-sm">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" type="button">
            <span className="sr-only">Edit titles</span>
            <Pencil1Icon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <Tabs value={tab} defaultValue="title" onValueChange={(value) => value === 'subtitle' && !isPro ? toggleProPlanModal() : setTab(value)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="title">Title</TabsTrigger>
              <TabsTrigger className="group relative" value="subtitle">
                Subtitle
                { !isPro && (
                  <ProOverlay />
                )}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="title">
              <ChartTitle />
            </TabsContent>
            <TabsContent value="subtitle">
              { isPro && (
                <ChartSubTitle />
              )}
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>

      <FormField
        control={form.control}
        name="config.options.plugins.title.text"
        render={({ field }) => (
          <FormItem className="flex w-full">
            <FormControl>
              <Input placeholder="Untitled chart" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

