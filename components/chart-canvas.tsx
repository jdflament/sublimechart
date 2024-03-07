import { useRef, useEffect, useCallback, useState } from 'react';
import { useFormContext } from "react-hook-form";
import { ChartPatchFormData } from "@/types/chart";
import ChartJS from "chart.js/auto";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Background from '@/lib/chart/plugins/background';
import {AspectRatio} from "@/components/ui/aspect-ratio";

export function ChartCanvas() {
  const form = useFormContext<ChartPatchFormData>();
  const {
    type,
    data,
    options
  } = form.watch("config");
  const ref = useRef<ChartJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const initializeChart = useCallback(async () => {
    const ChartJS = (await import("chart.js/auto")).default

    const ctx = document.getElementById('chart') as HTMLCanvasElement;

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

      ref.current = new ChartJS(ctx, {
        plugins: [ChartDataLabels, Background],
        // @ts-ignore
        type,
        // @ts-ignore
        data,
        // @ts-ignore
        options,
      });
    }
  }, [type, data, options]);

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
      ref.current.type = type;
      // @ts-ignore
      ref.current.data = data;
      // @ts-ignore
      ref.current.options = options;

      ref.current.update();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, JSON.stringify(data), JSON.stringify(options)]);

  return (
    <AspectRatio ratio={4 / 3}>
      <Card>
        <CardContent className="p-0">
            <canvas id="chart"></canvas>
        </CardContent>
      </Card>
    </AspectRatio>
  );
}
