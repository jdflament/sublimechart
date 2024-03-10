"use client"

import { useFormContext } from "react-hook-form";
import { FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

const settings = {
  image: 'https://picsum.photos/200/300',
  opacity: 0.5,
  // x and y offsets of the image
  x: 50,
  y: 50,

  // width and height to resize the image to
  // image is not resized if these values are not set
  width: 108,
  height: 39,

  // x-alignment of the image (default: "left")
  // valid values: "left", "middle", "right"
  alignX: "right",
  // y-alignment of the image (default: "top")
  // valid values: "top", "middle", "bottom"
  alignY: "bottom",

  // if true, aligns the watermark to the inside of the chart area (where the lines are)
  // (where the lines are)
  // if false, aligns the watermark to the inside of the canvas
  // see samples/alignToChartArea.html
  alignToChartArea: false,

  // determines whether the watermark is drawn on top of or behind the chart
  // valid values: "front", "back", "between"
  position: "back",
}

export function ChartWatermark() {
  const form = useFormContext();

  function handleWatermarkChange(checked) {
    if (checked) {
      form.setValue("config.watermark", settings);
    } else {
      form.unregister("config.watermark");
    }

    console.log(form.getValues('config.watermark'));
  }

  return (
    <div className="flex items-center space-x-2">
      <FormLabel>Watermark</FormLabel>
      <Switch
        checked={!!form.watch("config.watermark")}
        onCheckedChange={handleWatermarkChange}
      />
    </div>
  );
}
