"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface ChartCreateButtonProps extends ButtonProps {}

export function ChartCreateButton({
   className,
   variant,
   ...props
 }: ChartCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const response = await fetch("/api/charts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        config: {
          type: "line",
          data: {
            labels: ['Label'],
            datasets: [
              {
                label: 'My First Dataset',
                data: [0],
              }
            ]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Untitled Chart'
              }
            },
            layout: {
              padding: 20,
            }
          }
        }
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      if (response.status === 402) {
        return toast({
          title: "Limit of 3 charts reached.",
          description: "Please upgrade to the PRO plan.",
          variant: "destructive",
        })
      }

      return toast({
        title: "Something went wrong.",
        description: "Your chart was not created. Please try again.",
        variant: "destructive",
      })
    }

    const chart = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    router.push(`/playground/${chart.id}`)
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      New chart
    </button>
  )
}
