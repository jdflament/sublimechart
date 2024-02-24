"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Chart } from "@prisma/client"
import { useForm, FormProvider } from "react-hook-form"
import * as z from "zod"

import { chartPatchSchema } from "@/lib/validations/chart";
import { ChartSelector } from "@/components/chart-selector";
import { ChartCanvas } from "@/components/chart-canvas";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ChartLabels from "@/components/chart-labels";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

interface PlaygroundProps {
  chart: Pick<Chart, "id" | "title" | "config" | "createdAt">
}

type FormData = z.infer<typeof chartPatchSchema>

export function Playground({ chart }: PlaygroundProps) {
  const methods = useForm<FormData>({
    resolver: zodResolver(chartPatchSchema),
    mode: 'onBlur',
  });

  const {
    register,
    handleSubmit,
    watch,
    formState,
    formState: { isValidating },
  } = methods;

  const router = useRouter()
  const [isSaving, setIsSaving] = useState<boolean>(false)

  async function onSubmit(data: FormData) {
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

  const data = watch();

  useEffect(() => {
    if (formState.isValid && !isValidating) {
      console.log(data);
    }
  }, [formState, data, isValidating]);

  return (
    <FormProvider {...methods}>
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
              <Input
                type="text"
                placeholder="Chart title..."
                defaultValue={chart.title}
                {...register("title", { required: true })}
              />
            </div>
            <Button type="submit">
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Save</span>
            </Button>
          </div>
          <div className="grow lg:flex xl:px-2">
            <div className="flex-1">
              <div className="mx-auto mb-4 text-center sm:px-6 lg:pl-8 xl:shrink-0">
                <ChartSelector chart={chart} />
              </div>

              <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
                <ChartCanvas chart={chart} />
              </div>
            </div>

            <div className="w-full shrink-0 lg:w-96">
              <Tabs defaultValue="datasets">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="datasets">Datasets</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
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
                      <ChartLabels chart={chart} />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="templates">
                  <Card>
                    <CardHeader>
                      <CardTitle>Templates</CardTitle>
                      <CardDescription>
                        Select a template.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      TODO: Templates
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
