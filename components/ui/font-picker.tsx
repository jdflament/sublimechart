import { InputProps } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { forwardRef, useState } from 'react'
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Fonts } from "@/data/fonts";
import { ScrollArea } from "@/components/ui/scroll-area";

const FontPicker = forwardRef<HTMLInputElement, InputProps>(({ className, onChange, value, ...props }, ref) => {
  // @ts-ignore
  const [font, setFont] = useState<string>(value);

  const fonts = Fonts.map((font, name) => ({
    label: font.name,
    value: font.loader.style.fontFamily,
  }));

  const handleFontChange = (newFont) => {
    setFont(newFont);

    if (onChange) {
      onChange(newFont);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "justify-between",
            !font && "text-muted-foreground"
          )}
        >
          {font
            ? fonts.find(
              (fontItem) => fontItem.value === font
            )?.label
            : "Select font"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command value={font}>
          <CommandInput
            placeholder="Search font..."
            className="h-9"
            ref={ref}
            {...props}
          />
          <ScrollArea className="h-64">
            <CommandEmpty>No font found.</CommandEmpty>
            <CommandGroup>
                {fonts.map((fontItem) => (
                  <CommandItem
                    value={fontItem.value}
                    key={fontItem.value}
                    onSelect={() => handleFontChange(fontItem.value)}
                    style={{ fontFamily: fontItem.value }}
                  >
                    {fontItem.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        fontItem.value === font
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
})
FontPicker.displayName = "FontPicker"

export { FontPicker }
