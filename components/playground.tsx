"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Chart } from "@prisma/client"
import { useForm, FormProvider } from "react-hook-form"

import { chartPatchSchema } from "@/lib/validations/chart";
import { ChartSelector } from "@/components/chart-selector";
import { ChartCanvas } from "@/components/chart-canvas";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChartLabels } from "@/components/chart-labels";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ChartPatchFormData } from "@/types/chart";
import { ChartDataSets } from "@/components/chart-data-sets";
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {ChartPreset} from "@/components/chart-preset";
import { presets } from "@/data/presets"

interface PlaygroundProps {
  chart: Pick<Chart, "id" | "title" | "config" | "createdAt">
}

export function Playground({ chart }: PlaygroundProps) {
  const defaultValues = chartPatchSchema.parse(chart);

  const form = useForm<ChartPatchFormData>({
    resolver: zodResolver(chartPatchSchema),
    mode: 'onBlur',
    defaultValues,
  });

  const {
    handleSubmit,
  } = form;

  const router = useRouter()
  const [isSaving, setIsSaving] = useState<boolean>(false)

  async function onSubmit(data: ChartPatchFormData) {
    setIsSaving(true)

    const response = await fetch(`/api/charts/${chart.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        config: data.config,
      }),
    });

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your chart was not saved. Please try again.",
        variant: "destructive",
      })
    }

    router.refresh();

    return toast({
      description: "Your chart has been saved.",
    });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full gap-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-10">
              <Link
                href="/dashboard"
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                <>
                  <Icons.chevronLeft className="mr-2 h-4 w-4" />
                  Back
                </>
              </Link>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button">Save</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[475px]">
                <DialogHeader>
                  <DialogTitle>Save your chart</DialogTitle>
                  <DialogDescription>
                    This will save the current chart state which you
                    can access later.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Untitled chart" {...field} autoFocus />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    {isSaving && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    <span>Save</span>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grow lg:flex xl:px-2">
            <div className="flex-1">
              <div className="mx-auto mb-4 text-center sm:px-6 lg:pl-8 xl:shrink-0">
                <ChartSelector />
              </div>

              <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
                <ChartCanvas />
              </div>
            </div>

            <div className="w-full shrink-0 lg:w-96">
              <Tabs defaultValue="datasets">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="datasets">Datasets</TabsTrigger>
                  <TabsTrigger value="options">Options</TabsTrigger>
                  <TabsTrigger value="themes">Themes</TabsTrigger>
                </TabsList>
                <TabsContent value="datasets">
                  <Card>
                    <CardHeader>
                      <CardTitle>Datasets</CardTitle>
                      <CardDescription>
                        Update the datasets of the chart.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ChartPreset presets={presets} />
                      <ChartLabels />
                      <ChartDataSets />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="options">
                  <Card>
                    <CardHeader>
                      <CardTitle>Options</CardTitle>
                      <CardDescription>
                        Customize the chart render through options.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      TODO: Options
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="themes">
                  <Card>
                    <CardHeader>
                      <CardTitle>Themes</CardTitle>
                      <CardDescription>
                        Select a predefined theme.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      TODO: Themes
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
