import { useRef, useEffect, useCallback, useState } from 'react';
import { useFormContext } from "react-hook-form";
import { ChartPatchFormData } from "@/types/chart";
import ChartJS from "chart.js/auto";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Background from '@/lib/chart/plugins/background';
import ChartjsPluginWatermark from 'chartjs-plugin-watermark'
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {cn} from "@/lib/utils";
import {chartPatchSchema} from "@/lib/validations/chart";

export function ChartCanvas() {
  const form = useFormContext<ChartPatchFormData>();
  const aspectRatio = form.watch("aspectRatio");
  const {
    type,
    data,
    options
  } = form.watch("config");
  const watermark = form.watch('watermark');
  const ref = useRef<ChartJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [chartContainerClass, setChartContainerClass] = useState<string>('w-[500px]');

  useEffect(() => {
    switch (aspectRatio) {
      case "9/16":
      case "4/5":
      case "2/3":
        setChartContainerClass('w-[350px]');
        break;
      case "16/9":
      default:
        setChartContainerClass('w-[650px]');
    }
  }, [aspectRatio]);

  // TODO: Uncomment to get the chart config
  console.log(chartPatchSchema.parse(form.getValues()).config);

  const initializeChart = useCallback(async () => {
    const ChartJS = (await import("chart.js/auto")).default

    const ctx = document.getElementById('chart') as HTMLCanvasElement;

    if (watermark && options) {
      // TODO: Adjust watermark options with correct logo
      options.watermark = {
        image: '/watermark.png',
        x: 15,
        y: 15,
        width: 115,
        height: 41,
        alignX: 'right',
        alignY: 'bottom',
        opacity: 0.4,
        position: 'back',
        alignToChartArea: false,
      }
    }

    if (!watermark && options) {
      delete options.watermark;
    }

    if (ref.current) {
      ref.current.destroy();
    }

    if (!ref.current) {
      ChartJS.defaults.plugins.title.font = {
        size: 16,
        weight: "bold",
      };

      ChartJS.defaults.plugins.datalabels = { display: false };
      ChartJS.defaults.aspectRatio = 1;
      ChartJS.defaults.responsive = true;
      ChartJS.defaults.maintainAspectRatio = false;

      // @ts-ignore
      ref.current = new ChartJS(ctx, {
        plugins: [
          ChartDataLabels,
          Background,
          ChartjsPluginWatermark,
        ],
        // @ts-ignore
        type,
        // @ts-ignore
        data,
        // @ts-ignore
        options,
      });
    }
  }, [type, data, options, watermark]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      initializeChart().then(() => console.log('Chart initialized'));

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeChart]);

  // Update chart when the form data changes
  useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      ref.current.data = data;
      // @ts-ignore
      ref.current.options = options;

      ref.current.update();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data), JSON.stringify(options)]);

  function parseAspectRatio(aspectRatio) {
    const [width, height] = aspectRatio.split('/').map(Number);
    return width / height;
  }

  return (
      <Card className={cn('mx-auto overflow-hidden', chartContainerClass)}>
        <CardContent className="p-0">
          <AspectRatio ratio={parseAspectRatio(aspectRatio)}>
            <canvas id="chart" className="rounded-md"></canvas>
          </AspectRatio>
        </CardContent>
      </Card>
  );
}
