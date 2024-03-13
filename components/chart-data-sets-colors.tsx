"use client"

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ColorPicker } from "@/components/ui/color-picker";

interface ChartDataSetsColorsProps {
  datasetIndex: number
}

export function ChartDataSetsColors({ datasetIndex }: ChartDataSetsColorsProps) {
  const form = useFormContext();
  const colors = form.watch(`config.data.datasets.${datasetIndex}.backgroundColor`, []);

  const {
    append: appendBackgroundColor,
    remove: removeBackgroundColor,
  } = useFieldArray({
    name: `config.data.datasets.${datasetIndex}.backgroundColor`,
    control: form.control,
  });

  const {
    append: appendBorderColor,
    remove: removeBorderColor,
  } = useFieldArray({
    name: `config.data.datasets.${datasetIndex}.borderColor`,
    control: form.control,
  });

  function handleAppend() {
    appendBackgroundColor('#FFFFFF');
    appendBorderColor('#FFFFFF');
  }

  function handleRemove(colorIndex: number) {
    removeBackgroundColor(colorIndex);
    removeBorderColor(colorIndex);
  }

  return (
    <div className="py-2">
      { colors && colors.map((color, colorIndex) => (
        <div key={`dataset-${datasetIndex}-color-${colorIndex}`} className="mt-2 flex items-end gap-4">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              key={`dataset-${datasetIndex}-backgroundColor-${colorIndex}`}
              name={`config.data.datasets.${datasetIndex}.backgroundColor.${colorIndex}`}
              render={({ field }) => (
                <FormItem>
                  { colorIndex === 0 && <FormLabel>Background color</FormLabel> }
                  <FormControl className="flex gap-2">
                    <ColorPicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              key={`dataset-${datasetIndex}-borderColor-${colorIndex}`}
              name={`config.data.datasets.${datasetIndex}.borderColor.${colorIndex}`}
              render={({ field }) => (
                <FormItem>
                  { colorIndex === 0 && <FormLabel>Border color</FormLabel> }
                  <FormControl className="flex gap-2">
                    <ColorPicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="button" variant="outline" onClick={() => handleRemove(colorIndex)}>
            <Icons.trash className="h-4 w-4" />
          </Button>
        </div>
      ) )}

      <Button
        type="button"
        variant="outline"
        className="mt-2 w-full"
        onClick={handleAppend}
      >
        <span>Add color</span>
        <Icons.add className="h-4 w-4" />
      </Button>
    </div>
  );
}
