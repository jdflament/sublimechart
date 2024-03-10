"use client"

import { FormLabel } from "@/components/ui/form"

import { useFormContext } from "react-hook-form";
import { FontPicker } from "@/components/ui/font-picker";

export function ChartFont() {
  const form = useFormContext();

  function handleChangeFont(font) {
    form.setValue("config.options.plugins.title.font.family", font);
    form.setValue("config.options.plugins.legend.labels.font.family", font);
    form.setValue("config.options.plugins.datalabels.font.family", font);
    form.setValue("config.options.scales.x.ticks.font.family", font);
    form.setValue("config.options.scales.y.ticks.font.family", font);

    if (form.getValues("config.options.scales.r.ticks.display")) {
      form.setValue("config.options.scales.r.ticks.font.family", font);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <FormLabel>Font-Family</FormLabel>
      <FontPicker onChange={handleChangeFont} />
    </div>
  )
}
