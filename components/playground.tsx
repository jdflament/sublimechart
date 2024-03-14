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
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChartLabels } from "@/components/chart-labels";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartPatchFormData } from "@/types/chart";
import { ChartDataSets } from "@/components/chart-data-sets";
import { ChartOptions } from "@/components/chart-options";
import { ChartBackground } from "@/components/chart-background";
import { ChartTitle } from "@/components/chart-title";
import { ChartAspectRatio } from "@/components/chart-aspect-ratio";
import { ChartWatermark } from "@/components/chart-watermark";
import { ChartTemplates } from "@/components/chart-templates";

interface PlaygroundProps {
  chart: Pick<Chart, "id" | "aspectRatio" | "config" | "watermark" | "createdAt">
}

export function Playground({ chart }: PlaygroundProps) {
  const defaultValues = chartPatchSchema.parse(chart);

  const form = useForm<ChartPatchFormData>({
    resolver: zodResolver(chartPatchSchema),
    mode: 'onBlur',
    defaultValues,
  });

  const { watch, unregister } = form;
  const type = watch("config.type");
  const labels = watch('config.data.labels');
  const datasets = watch('config.data.datasets');

  const {
    handleSubmit,
  } = form;

  const router = useRouter()
  const [isSaving, setIsSaving] = useState<boolean>(false)

  // Clear conditional fields
  useEffect(() => {
    if (['line', 'bar'].includes(type)) {
      unregister('config.options.scales.r');
    }
  }, [type, unregister]);

  // Clear excess data if labels are removed
  useEffect(() => {
    if (labels?.length && datasets?.length) {
      datasets.forEach((dataset, datasetIndex) => {
        if (!dataset.data) {
          return;
        }

        const excess = dataset.data.length - labels.length;

        if (excess > 0) {
          const newData = [...dataset.data];
          newData.splice(labels.length, excess);
          form.setValue(`config.data.datasets.${datasetIndex}.data`, newData);
        }
      });
    }
  }, [labels, datasets, form]);

  async function onSubmit(data: ChartPatchFormData) {
    setIsSaving(true)

    const response = await fetch(`/api/charts/${chart.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        aspectRatio: data.aspectRatio,
        config: data.config,
        watermark: data.watermark,
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
            <div className="flex gap-4">
              <ChartWatermark />
              <ChartAspectRatio />
              <ChartTitle />

              <Button type="submit">
                {isSaving && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span>Save</span>
              </Button>
            </div>
          </div>
          <div className="grow lg:flex xl:px-2">
            <div className="flex-1">
              <div className="mx-auto mb-4 text-center sm:px-6 lg:pl-8 xl:shrink-0">
                <ChartSelector />
              </div>

              <div className="px-4 py-6 sm:px-6 md:sticky md:top-10 lg:flex-1 lg:pl-8 xl:pl-6">
                <ChartCanvas />
              </div>
            </div>

            <div className="mb-4 w-full shrink-0 lg:ml-14 lg:w-[500px]">
              <Tabs defaultValue="templates">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="data">Data</TabsTrigger>
                  <TabsTrigger value="options">Options</TabsTrigger>
                  <TabsTrigger value="background">Background</TabsTrigger>
                </TabsList>
                <TabsContent value="templates">
                  <Card>
                    <CardHeader>
                      <CardTitle>Templates</CardTitle>
                      <CardDescription>
                        Select a predefined template.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ChartTemplates />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="data">
                  <Card>
                    <CardHeader>
                      <CardTitle>Data</CardTitle>
                      <CardDescription>
                        Update the data of the chart.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
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
                      <ChartOptions />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="background">
                  <Card>
                    <CardHeader>
                      <CardTitle>Background</CardTitle>
                      <CardDescription>
                        Select your favorite background.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ChartBackground />
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
