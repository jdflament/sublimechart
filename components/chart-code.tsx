import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/icons";
import { useFormContext } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { chartPatchSchema } from "@/lib/validations/chart";
import {ScrollArea} from "@/components/ui/scroll-area";
import {DialogClose} from "@radix-ui/react-dialog";
import Link from "next/link";

export function ChartCode() {
  const form = useFormContext();

  function handleCopyConfig() {
    const config = chartPatchSchema.parse(form.getValues()).config;

    if (config.options?.watermark) {
      delete config.options?.watermark;
    }

    navigator.clipboard
      .writeText(JSON.stringify(config, null, 2))
      .then(() => {
        return toast({
          description: "🎉 Your chart config has been copied to clipboard!",
        });
      })
      .catch((error) => {
        console.error(error);

        return toast({
          title: "Something went wrong.",
          description: "An error occurred while copying your chart config. Please try again.",
          variant: "destructive",
        });
      })
    ;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Icons.code className="h-4 w-4" />
          <span className="sr-only">Chart code</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>View code</DialogTitle>
          <DialogDescription>
            You can use the following code into your project using <Link href="https://www.chartjs.org/" target="_blank" rel="nofollow" className="font-semibold hover:underline">Chart.js</Link> .
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px]">
          <pre className="rounded-md border border-muted bg-background p-4 text-sm text-muted-foreground">
            {JSON.stringify(form.getValues().config, null, 2)}
          </pre>
        </ScrollArea>
        <div>
          <p className="text-sm italic text-muted-foreground">
            *We are using the following plugins in this chart:
            <ul>
              <li>
                <Link
                  href="https://github.com/chartjs/chartjs-plugin-datalabels"
                  target="_blank"
                  rel="nofollow"
                  className="font-semibold hover:underline">
                  chartjs-plugin-datalabels
                </Link>
              </li>
            </ul>
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={handleCopyConfig}>
            Copy to clipboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
