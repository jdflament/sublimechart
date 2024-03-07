"use client"

import { useFormContext } from "react-hook-form";
import {ChartAxisItem} from "@/components/chart-axis-item";

export function ChartAxis() {
  const form = useFormContext();
  const type = form.watch('config.type');

  const XYOptions = [
    {
      name: "grid.display",
      label: "Grid",
    },
    {
      name: "ticks.display",
      label: "Labels",
    },
    {
      name: "border.display",
      label: "Border",
    },
    {
      name: "stacked",
      label: "Stacked",
    },
  ];

  const ROptions = [
    {
      name: "grid.display",
      label: "Grid",
    },
    {
      name: "pointLabels.display",
      label: "Point Labels",
    },
    {
      name: "ticks.display",
      label: "Labels",
    },
    {
      name: "angleLines.display",
      label: "Angle Lines",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <ChartAxisItem axis="x" options={XYOptions} />

      <ChartAxisItem axis="y" options={XYOptions} />

      { ['doughnut', 'radar', 'pie'].includes(type) && (
        <ChartAxisItem axis="r" options={ROptions} />
      )}
    </div>
  );
}
