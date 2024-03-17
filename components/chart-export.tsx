import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Icons } from "@/components/icons";
import { useFormContext } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { chartPatchSchema } from "@/lib/validations/chart";
import { Separator } from "@/components/ui/separator";

export function ChartExport() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Export</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Export your Chart</DialogTitle>
            <DialogDescription>
              Pick a format to export your chart.
              Let&apos;s get your chart out there!
            </DialogDescription>
          </DialogHeader>
          <ExportButtons />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Export</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Export your Chart</DrawerTitle>
          <DrawerDescription>
            Pick a format to export your chart.
            Let&apos;s get your chart out there!
          </DrawerDescription>
        </DrawerHeader>
        <ExportButtons className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ExportButtons({ className, ...props }: React.ComponentProps<"div">) {
  const form = useFormContext();

  function handleExportConfig() {
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

  async function handleExportPNG() {
    const ctx = document.getElementById('chart') as HTMLCanvasElement;
    const title = form.watch("config.options.plugins.title.text");

    if (ctx) {
      const url = ctx.toDataURL("image/jpeg", 1.0);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.jpeg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    return toast({
      title: "Something went wrong.",
      description: "Your chart was not exported. Please try again.",
      variant: "destructive",
    })
  }

  return (
    <div className="mt-6 flex flex-col gap-2">
      <div className={cn("grid grid-cols-2 gap-4", className)} {...props}>
        <Button
          type="button"
          variant="outline"
          onClick={handleExportPNG}
          className="flex h-auto flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Icons.media className="mb-3 h-6 w-6" />
          PNG
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled
          className="flex h-auto flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Icons.clapperboard className="mb-3 h-6 w-6" />
          Video/GIF
        </Button>
      </div>

    <Separator className="my-6" />

      <div className={cn("grid grid-cols-2 gap-4", className)} {...props}>
        <Button
          type="button"
          variant="outline"
          onClick={handleExportConfig}
          className="flex h-auto flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Icons.code className="mb-3 h-6 w-6" />
          Chart.JS Config
        </Button>
        <div className="flex h-auto flex-col p-0">
          <p className="text-sm text-muted-foreground">
            <Icons.help className="mr-1 inline h-4 w-4" />
            <span>
              Plugins used:
            </span>
          </p>
          <ul className="ml-4 mt-2 list-disc text-sm text-muted-foreground">
            <li>
              <a
                href="https://github.com/chartjs/chartjs-plugin-datalabels"
                target="_blank"
                rel="nofollow noreferrer"
                className="font-medium text-primary underline underline-offset-4"
              >
                chartjs-plugin-datalabels
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
