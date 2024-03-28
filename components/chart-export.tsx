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
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { transcode } from "@/lib/transcoder";
import { record } from "@/lib/recorder";
import { downloadUrl } from "@/lib/downloader";

export function ChartExport() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button type="button" size="lg">Export</Button>
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
        <Button type="button" size="lg">Export</Button>
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
  const title = form.watch("config.options.plugins.title.text");
  const canvas = document.getElementById('chart') as HTMLCanvasElement;

  async function handleExportPNG() {
    if (!canvas) {
      return toast({
        title: "Something went wrong.",
        description: "Your chart was not exported. Please try again.",
        variant: "destructive",
      })
    }

    const url = canvas.toDataURL('image/png');
    downloadUrl(url, `${title}.png`);

    return toast({
      description: "🎉 Your chart has been successfully exported to PNG!",
    });
  }

  async function handleExportJPEG() {
    if (!canvas) {
      return toast({
        title: "Something went wrong.",
        description: "Your chart was not exported. Please try again.",
        variant: "destructive",
      })
    }

    const url = canvas.toDataURL('image/jpeg');
    downloadUrl(url, `${title}.jpeg`);

    return toast({
      description: "🎉 Your chart has been successfully exported to JPEG!",
    });
  }

  async function handleExportMP4() {
    const watermark = form.getValues().watermark;
    form.setValue('watermark', !watermark);
    const filename = `${title}.mp4`;

    try {
      const blob = await record(canvas);
      const url = await transcode(blob, 'video/mp4', filename);

      downloadUrl(url, filename);

      return toast({
        description: "🎉 Your chart has been successfully exported to MP4!",
      });
    } catch (error) {
      console.error(error);

      return toast({
        title: "Something went wrong.",
        description: "Your chart was not exported. Please try again.",
        variant: "destructive",
      })
    }
  }

  async function handleExportGIF() {
    const watermark = form.getValues().watermark;
    form.setValue('watermark', !watermark);
    const filename = `${title}.gif`;

    try {
      const blob = await record(canvas);
      const url = await transcode(blob, 'image/gif', filename);

      downloadUrl(url, filename);

      return toast({
        description: "🎉 Your chart has been successfully exported to GIF!",
      });
    } catch (error) {
      console.error(error);

      return toast({
        title: "Something went wrong.",
        description: "Your chart was not exported. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-2">
      <p className="text-lg font-bold">Static</p>
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
          onClick={handleExportJPEG}
          className="flex h-auto flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Icons.media className="mb-3 h-6 w-6" />
          JPEG
        </Button>
      </div>

      <Separator className="my-6" />

      <p className="text-lg font-bold">Animated</p>
      <div className={cn("grid grid-cols-2 gap-4", className)} {...props}>
        <Button
          type="button"
          variant="outline"
          onClick={handleExportMP4}
          className="flex h-auto flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Icons.clapperboard className="mb-3 h-6 w-6" />
          Video (MP4)
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleExportGIF}
          className="flex h-auto flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Icons.media className="mb-3 h-6 w-6" />
          GIF
        </Button>
      </div>
    </div>
  )
}
