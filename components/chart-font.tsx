"use client"

import { FormLabel } from "@/components/ui/form"

import { useFormContext } from "react-hook-form";
import { FontPicker } from "@/components/ui/font-picker";
import { usePlayground } from "@/components/playground-context";

export function ChartFont() {
  const form = useFormContext();
  const { isPro } = usePlayground();

  function handleChangeFont(font) {
    form.setValue("config.options.plugins.title.font.family", font);
    form.setValue("config.options.plugins.legend.labels.font.family", font);
    form.setValue("config.options.plugins.datalabels.font.family", font);
    form.setValue("config.options.scales.x.ticks.font.family", font);
    form.setValue("config.options.scales.y.ticks.font.family", font);

    if (form.getValues("config.options.scales.r.ticks.display")) {
      form.setValue("config.options.scales.r.ticks.font.family", font);
    }

    if (isPro && form.getValues("config.options.plugins.subtitle.display")) {
      form.setValue("config.options.plugins.subtitle.font.family", font);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <FormLabel>Font-Family</FormLabel>
      <FontPicker onChange={handleChangeFont} />
    </div>
  )
}
