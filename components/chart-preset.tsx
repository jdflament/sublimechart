"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { presets } from "@/data/presets"
import {cn, mergeObjects} from "@/lib/utils"

import { Preset } from "@/data/presets"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { useFormContext } from "react-hook-form";
import { ChartPatchFormData } from "@/types/chart";
import { Icons } from "@/components/icons";
import { chartPatchSchema } from "@/lib/validations/chart";

export function ChartPreset() {
  const [open, setOpen] = React.useState(false)
  const [selectedPreset, setSelectedPreset] = React.useState<Preset>()
  const [snapshotPreset, setSnapshotPreset] = React.useState<Preset | undefined>();
  const [hasSnapshot, setHasSnapshot] = React.useState<boolean>(false);
  const form = useFormContext<ChartPatchFormData>();
  const config = form.watch("config");

  function handleApply() {
    if (!hasSnapshot) {
      const data = chartPatchSchema.parse(form.getValues());

      setSnapshotPreset({
        slug: "snapshot",
        name: data.config?.options?.plugins?.title?.text,
        // @ts-ignore
        config: data.config,
      });

      setHasSnapshot(true);
    }

    if (selectedPreset) {
      // @ts-ignore
      form.setValue('config', mergeObjects(config, selectedPreset.config));
    }
  }

  return (
    <div>
      <div className="mt-2 flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-label="Load a preset..."
              aria-expanded={open}
              className="flex-1 justify-between"
            >
              {selectedPreset ? selectedPreset.name : "Load a preset..."}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search presets..." />
              <CommandEmpty>No presets found.</CommandEmpty>
              {snapshotPreset && (
                <CommandItem
                  key={snapshotPreset.slug}
                  onSelect={() => {
                    setSelectedPreset(snapshotPreset);
                    setOpen(false);
                  }}
                >
                  {snapshotPreset.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedPreset?.slug === snapshotPreset.slug
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              )}
              <CommandGroup heading="Examples">
                {presets.map((preset) => (
                  <CommandItem
                    key={preset.slug}
                    onSelect={() => {
                      setSelectedPreset(preset)
                      setOpen(false)
                    }}
                  >
                    {preset.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedPreset?.slug === preset.slug
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Button type="button" variant="outline" onClick={handleApply} disabled={!selectedPreset}>
          <Icons.arrowDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
