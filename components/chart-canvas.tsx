import { useRef, useEffect } from 'react';
import ChartJS from "chart.js/auto";
import { useFormContext } from "react-hook-form";
import { ChartPatchFormData } from "@/types/chart";

export function ChartCanvas() {
  const form = useFormContext<ChartPatchFormData>();
  const { type, data } = form.watch("config");
  const ref = useRef<ChartJS>();

  useEffect(() => {
    const ctx = document.getElementById('chart') as HTMLCanvasElement;

    if (ctx) {
      if (ref.current) {
        ref.current.destroy();
      }

      // Create a new chart
      ref.current = new ChartJS(ctx, {
        // @ts-ignore
        type,
        // @ts-ignore
        data,
      });
    }

    return () => {
      if (ref.current) {
        ref.current.destroy();
      }
    };
  }, [type, JSON.stringify(data)]);

  return (
    <canvas id="chart"></canvas>
  );
}
