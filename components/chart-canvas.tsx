import {useRef, useEffect, useCallback, useState} from 'react';
import { useFormContext } from "react-hook-form";
import { ChartPatchFormData } from "@/types/chart";
import ChartJS from "chart.js/auto";
import * as React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export function ChartCanvas() {
  const form = useFormContext<ChartPatchFormData>();
  const title = form.watch('title');
  const { type, data } = form.watch("config");
  const ref = useRef<ChartJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const initializeChart = useCallback(async () => {
    const ChartJS = (await import("chart.js/auto")).default

    const ctx = document.getElementById('chart') as HTMLCanvasElement;

    if (!ref.current) {
      ref.current = new ChartJS(ctx, {
        // @ts-ignore
        type,
        // @ts-ignore
        data,
      });
    }
  }, [type, data]);

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

      ref.current.update();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, JSON.stringify(data)]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <canvas id="chart"></canvas>
      </CardContent>
    </Card>
  );
}
