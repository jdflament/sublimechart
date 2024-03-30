"use client"

import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Check, ChevronsUpDown } from "lucide-react"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

const easings = [
  { label: "linear", value: "linear" },
  { label: "easeInQuad", value: "easeInQuad" },
  { label: "easeOutQuad", value: "easeOutQuad" },
  { label: "easeInOutQuad", value: "easeInOutQuad" },
  { label: "easeInCubic", value: "easeInCubic" },
  { label: "easeOutCubic", value: "easeOutCubic" },
  { label: "easeInOutCubic", value: "easeInOutCubic" },
  { label: "easeInQuart", value: "easeInQuart" },
  { label: "easeOutQuart", value: "easeOutQuart" },
  { label: "easeInOutQuart", value: "easeInOutQuart" },
  { label: "easeInQuint", value: "easeInQuint" },
  { label: "easeOutQuint", value: "easeOutQuint" },
  { label: "easeInOutQuint", value: "easeInOutQuint" },
  { label: "easeInSine", value: "easeInSine" },
  { label: "easeOutSine", value: "easeOutSine" },
  { label: "easeInOutSine", value: "easeInOutSine" },
  { label: "easeInExpo", value: "easeInExpo" },
  { label: "easeOutExpo", value: "easeOutExpo" },
  { label: "easeInOutExpo", value: "easeInOutExpo" },
  { label: "easeInCirc", value: "easeInCirc" },
  { label: "easeOutCirc", value: "easeOutCirc" },
  { label: "easeInOutCirc", value: "easeInOutCirc" },
  { label: "easeInElastic", value: "easeInElastic" },
  { label: "easeOutElastic", value: "easeOutElastic" },
  { label: "easeInOutElastic", value: "easeInOutElastic" },
  { label: "easeInBack", value: "easeInBack" },
  { label: "easeOutBack", value: "easeOutBack" },
  { label: "easeInOutBack", value: "easeInOutBack" },
  { label: "easeInBounce", value: "easeInBounce" },
  { label: "easeOutBounce", value: "easeOutBounce" },
  { label: "easeInOutBounce", value: "easeInOutBounce" },
] as const

export function ChartAnimations() {
  const form = useFormContext();
  const animations = !!form.watch('config.options.animations');

  return (
    <div className="rounded-lg border p-4">
      <div className="flex flex-row items-center justify-between">
        <div className="space-y-0.5">
          <FormLabel className="text-sm font-semibold">
            Animations
          </FormLabel>
          <FormDescription>
            Use animations to make your chart more interactive.
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="config.options.animations"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      { animations && (
        <div className="mt-2 flex flex-col space-y-2">
          <FormField
            control={form.control}
            name="config.options.animation.duration"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormControl>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <FormLabel>Duration</FormLabel>
                      <span className="mr-3 w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                        {value ?? '-'}ms
                      </span>
                    </div>
                    <Slider
                      max={10000}
                      min={100}
                      defaultValue={[value]}
                      step={100}
                      className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                      aria-label="Duration"
                      onValueChange={(values) => onChange(values[0])}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="config.options.animation.easing"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Easing</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? easings.find(
                            (easing) => easing.value === field.value
                          )?.label
                          : "Select easing"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search easing..." />
                      <ScrollArea className="h-64">
                        <CommandEmpty>No easing found.</CommandEmpty>
                        <CommandGroup>
                          {easings.map((easing) => (
                            <CommandItem
                              value={easing.label}
                              key={easing.value}
                              onSelect={() => {
                                field.onChange(easing.value)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  easing.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {easing.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </ScrollArea>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  You can look at <Link href="https://easings.net/" target="_blank" rel="nofollow" className="font-semibold hover:underline">easings.net</Link> to see the easing effects.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="config.options.animation.loop"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="mr-auto">Loop</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  )
}
