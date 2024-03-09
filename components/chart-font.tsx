"use client"

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Inter, Playfair_Display, Lato, Abel } from "next/font/google";
import {useFormContext} from "react-hook-form";

const fonts =  [Inter, Playfair_Display, Lato, Abel].map((font) => ({
  label: font.name,
  value: font.name,
}));

export function ComboboxForm() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="language"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Language</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? fonts.find(
                      (font) => font.value === field.value
                    )?.label
                    : "Select font"}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandEmpty>No font found.</CommandEmpty>
                <CommandGroup>
                  {fonts.map((font) => (
                    <CommandItem
                      value={font.label}
                      key={font.value}
                      onSelect={() => {
                        form.setValue("font", font.value)
                      }}
                    >
                      {font.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          font.value === field.value
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
          <FormDescription>
            This is the font that will be used in the chart.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
