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
import { useEffect, useState } from "react";
import { transcode } from "@/lib/transcoder";
import { record } from "@/lib/recorder";
import { downloadUrl } from "@/lib/downloader";
import { usePlayground } from "@/components/playground-context";
import {ProOverlay} from "@/components/pro-overlay";

export function ChartExport() {
  const [open, setOpen] = useState(false);
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
  const [isExporting, setIsExporting] = useState(false);
  const [isExportingMP4, setIsExportingMP4] = useState(false);
  const [isExportingGIF, setIsExportingGIF] = useState(false);
  const { isPro, toggleProPlanModal, toggleRerenderChart } = usePlayground();

  useEffect(() => {
    if (isExportingMP4 || isExportingGIF) {
      setIsExporting(true);
      return;
    }

    setIsExporting(false);
  }, [isExportingMP4, isExportingGIF]);

  async function handleExportPNG() {
    if (isExporting) {
      return;
    }

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
    if (isExporting) {
      return;
    }

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
    if (isExporting || !isPro) {
      return;
    }

    setIsExportingMP4(true);
    toggleRerenderChart();

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
    } finally {
      setIsExportingMP4(false);
    }
  }

  async function handleExportGIF() {
    if (isExporting || !isPro) {
      return;
    }

    setIsExportingGIF(true);
    toggleRerenderChart();

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
    finally {
      setIsExportingGIF(false);
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-2">
      <p className="text-lg font-bold">Image</p>
      <div className={cn("grid grid-cols-2 gap-4", className)} {...props}>
        <Button
          type="button"
          variant="outline"
          onClick={handleExportPNG}
          disabled={isExporting}
          className="flex h-auto flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Icons.media className="mb-3 h-6 w-6" />
          PNG
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleExportJPEG}
          disabled={isExporting}
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
          onClick={isPro ? handleExportMP4 : toggleProPlanModal}
          disabled={isExporting}
          className={cn(
            "group relative flex h-auto flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
            !isPro && "border-muted/50 bg-popover/50"
          )}
        >
          { isExportingMP4 ? (
            <Icons.spinner className={cn("mb-3 h-6 w-6 animate-spin", !isPro && "opacity-50")} />
          ) : (
            <Icons.clapperboard className={cn("mb-3 h-6 w-6", !isPro && "opacity-50")} />
          )}
          <span className={!isPro ? "opacity-50" : ""}>Video (MP4)</span>
          { !isPro && (
            <ProOverlay />
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={isPro ? handleExportGIF : toggleProPlanModal}
          disabled={isExporting}
          className={cn(
            "group relative flex h-auto flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
            !isPro && "border-muted/50 bg-popover/50"
          )}
        >
          { isExportingGIF ? (
            <Icons.spinner className={cn("mb-3 h-6 w-6 animate-spin", !isPro && "opacity-50")} />
          ) : (
            <Icons.media className={cn("mb-3 h-6 w-6", !isPro && "opacity-50")} />
          )}
          <span className={!isPro ? "opacity-50" : ""}>GIF</span>
          { !isPro && (
            <ProOverlay />
          )}
        </Button>
      </div>
    </div>
  )
}
