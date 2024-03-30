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
import {ScrollArea} from "@/components/ui/scroll-area";
import {DialogClose} from "@radix-ui/react-dialog";
import Link from "next/link";
import {useEffect, useState} from "react";
import { Plugin } from "@/types";

export function ChartCode() {
  const form = useFormContext();
  const config = form.watch('config');
  const [plugins, setPlugins] = useState<Plugin[]>([]);

  useEffect(() => {
    if (config.options?.watermark) {
      delete config.options?.watermark;
    }

    const pluginsUsed: Plugin[] = [];

    if (config.options?.plugins?.datalabels?.display) {
      pluginsUsed.push({
        name: "Datalabels",
        link: "https://github.com/chartjs/chartjs-plugin-datalabels",
      });
    }

    setPlugins(pluginsUsed);
  }, [config]);

  function handleCopyConfig() {
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
            {JSON.stringify(config, null, 2)}
          </pre>
        </ScrollArea>
        <div>
          <p className="text-sm italic text-muted-foreground">
            ⚠️ We are using the following plugins in this chart:
            <ul className="list-disc pl-4">
              { plugins && plugins.map((plugin) => (
                <li key={plugin.name}>
                  <Link
                    href={plugin.link}
                    target="_blank"
                    rel="nofollow"
                    className="font-semibold hover:underline">
                    {plugin.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="https://www.chartjs.org/docs/latest/configuration/canvas-background.html"
                  target="_blank"
                  rel="nofollow"
                  className="font-semibold hover:underline">Canvas background
                </Link>
                <p className="text-xs italic text-muted-foreground">Follow the documentation to handle canvas backgrounds. Our own plugin for hexadecimal colors or linear gradients can be found <Link className="font-semibold hover:underline" href="/plugins/background.js">here</Link>.</p>
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
