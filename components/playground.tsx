"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Chart } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { chartPatchSchema } from "@/lib/validations/chart";
import { ChartSelector } from "@/components/chart-selector";
import { ChartCanvas } from "@/components/chart-canvas";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {Button, buttonVariants} from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Link from "next/link";
import {cn} from "@/lib/utils";

interface PlaygroundProps {
  chart: Pick<Chart, "id" | "title" | "config" | "createdAt">
}

type FormData = z.infer<typeof chartPatchSchema>

export function Playground({ chart }: PlaygroundProps) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(chartPatchSchema),
  });
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    console.log(data);
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
              <ChartSelector chart={chart} {...register('config.type')} />
            </div>

            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              <ChartCanvas chart={chart} />
            </div>
          </div>

          <div className="w-96 shrink-0 px-4 py-6 sm:px-6 lg:w-80">
            Data / Templates / Themes
          </div>
        </div>
      </div>
    </form>
  )
}
