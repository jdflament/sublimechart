"use client"

import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export function ChartLabels() {
  const form = useFormContext();
  const [isOpen, setIsOpen] = useState(true);

  const {
    fields,
    append ,
    remove,
  } = useFieldArray({
    name: "config.data.labels",
    control: form.control,
  });

  const labels = form.watch('config.data.labels', fields);

  const {
    remove: removeData,
  } = useFieldArray({
    name: "config.data.datasets.*.data",
    control: form.control,
  });

  function handleAppend() {
    if (!isOpen) {
      setIsOpen(true);
    }

    append(`Label #${labels.length + 1}`)
  }

  function handleRemove(index: number) {
    remove(index);
    removeData(index);
  }

  return (
    <div>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="flex items-center justify-between space-x-4">
          <FormLabel className="text-sm font-semibold">
            Configure labels
          </FormLabel>
          <CollapsibleTrigger defaultChecked={true} asChild>
            <Button variant="outline" size="sm">
              <CaretSortIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-2 grid grid-cols-2 gap-2">
          {labels.map((label, index) => (
            <FormField
              control={form.control}
              key={label.id}
              name={`config.data.labels.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl className="flex gap-2">
                    <div>
                      <Input placeholder={`Label #${index + 1}`} {...field} />
                      <Button type="button" variant="outline" onClick={() => handleRemove(index)}>
                        <Icons.trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
      <Button
        type="button"
        variant="outline"
        className="mt-2 w-full"
        onClick={handleAppend}
      >
        <span>Add label</span>
        <Icons.add className="h-4 w-4" />
      </Button>
    </div>
  );
}
