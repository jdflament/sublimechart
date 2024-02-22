import { useRef, useEffect, useCallback, useState } from 'react';
import { Chart } from "@prisma/client";
import { chartPatchSchema } from "@/lib/validations/chart";
import ChartJS from "chart.js/auto";

interface ChartItemProps {
  chart: Pick<Chart, "id" | "config">
}

export function ChartCanvas({ chart }: ChartItemProps) {
  const ref = useRef<ChartJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const initializeChart = useCallback(async () => {
    const ChartJS = (await import("chart.js/auto")).default

    const body = chartPatchSchema.parse(chart);

    if (!ref.current) {
      const ctx = document.getElementById('chart') as HTMLCanvasElement;

      if (ctx) {
        ref.current = new ChartJS(ctx, {
          // @ts-ignore
          type: body.config?.type,
          // @ts-ignore
          data: body.config?.data,
        });
      }
    }
  }, [chart]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeChart().then(() => console.log('Chart initialized'));

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeChart])


  return <canvas id="chart"></canvas>;
}
