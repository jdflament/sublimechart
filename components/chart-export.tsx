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
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL, fetchFile } from '@ffmpeg/util';
import { useRef, useState } from "react";

export function ChartExport() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button type="button">Export</Button>
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
        <Button type="button">Export</Button>
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
  const ffmpegRef = useRef(new FFmpeg());
  const [videoUrl, setVideoUrl] = useState<string>("");

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
      const url = ctx.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.png`;
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

  async function record(): Promise<Blob> {
    const recordedChunks: Blob[] = [];
    const timeLimit = 2000;

    const time = 0;
    const ctx = document.getElementById('chart') as HTMLCanvasElement;

    return new Promise(function (resolve, reject) {
      const stream = ctx.captureStream(60);

      console.log(stream);

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9"
      });

      mediaRecorder.start(time);

      mediaRecorder.ondataavailable = function (event) {
        recordedChunks.push(event.data);

        // Stop if nothing detected.
        if (event.data.size === 0) {
          mediaRecorder.stop();
        }
      }

      mediaRecorder.onstop = function () {
        const blob = new Blob(recordedChunks, {
          "type": "video/webm"
        });

        resolve(blob);
      }

      // Stop recording after 5 seconds max
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      }, timeLimit);
    });
  }

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
  }

  const transcode = async (blob) => {
    const webmUrl = URL.createObjectURL(blob);
    const ffmpeg = ffmpegRef.current;
    await load();
    await ffmpeg.writeFile('input.webm', await fetchFile(webmUrl));
    await ffmpeg.exec(['-i', 'input.webm', 'output.mp4'], 1000);
    const data = (await ffmpeg.readFile('output.mp4')) as any

    return URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
  }

  async function handleExportMP4() {
    // Trigger chart animation
    const watermark = form.getValues().watermark;
    form.setValue('watermark', !watermark);

    // @ts-ignore
    const blob = await record();

    // Transcode to MP4 and create object URL
    const url = await transcode(blob);

    // Create a link element to allow downloading the MP4 file
    console.log(url);

    setVideoUrl(url);
    // Simulate click on the link to start downloading
    //link.click();
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
          onClick={handleExportConfig}
          className="flex h-auto flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Icons.code className="mb-3 h-6 w-6" />
          Chart.JS Config
        </Button>
      </div>

    <Separator className="my-6" />

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
          disabled
          className="flex h-auto flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Icons.media className="mb-3 h-6 w-6" />
          GIF
        </Button>
      </div>

      { videoUrl && (
        <video controls className="mt-4 rounded-md" src={videoUrl} autoPlay loop />
      )}
    </div>
  )
}
