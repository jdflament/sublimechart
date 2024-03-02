"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { PopoverProps } from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

import { Preset } from "@/data/presets"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { useFormContext } from "react-hook-form";
import { ChartPatchFormData } from "@/types/chart";
import {Icons} from "@/components/icons";
import {FormLabel} from "@/components/ui/form";
import {CollapsibleTrigger} from "@/components/ui/collapsible";

interface PresetSelectorProps extends PopoverProps {
  presets: Preset[]
}

export function ChartPreset({ presets, ...props }: PresetSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedPreset, setSelectedPreset] = React.useState<Preset>()
  const [snapshotPreset, setSnapshotPreset] = React.useState<Preset | undefined>();
  const [hasSnapshot, setHasSnapshot] = React.useState<boolean>(false);
  const form = useFormContext<ChartPatchFormData>();

  function handleApply() {
    if (!hasSnapshot) {
      setSnapshotPreset({
        id: "snapshot",
        // @ts-ignore
        name: form.getValues('title'),
        // @ts-ignore
        title: form.getValues('title'),
        // @ts-ignore
        config: form.getValues('config'),
      });

      setHasSnapshot(true);
    }

    if (selectedPreset) {
      form.setValue('title', selectedPreset.title);
      // @ts-ignore
      form.setValue('config', selectedPreset.config);
    }
  }

  return (
    <div>
      <FormLabel className="text-sm font-semibold">
        Select a preset
      </FormLabel>
      <div className="mt-2 flex gap-2">
        <Popover open={open} onOpenChange={setOpen} {...props}>
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
                  key={snapshotPreset.id}
                  onSelect={() => {
                    setSelectedPreset(snapshotPreset);
                    setOpen(false);
                  }}
                >
                  {snapshotPreset.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedPreset?.id === snapshotPreset.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              )}
              <CommandGroup heading="Examples">
                {presets.map((preset) => (
                  <CommandItem
                    key={preset.id}
                    onSelect={() => {
                      setSelectedPreset(preset)
                      setOpen(false)
                    }}
                  >
                    {preset.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedPreset?.id === preset.id
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
