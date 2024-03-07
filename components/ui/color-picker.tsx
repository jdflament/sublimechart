import {Input, InputProps} from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Paintbrush } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { cn } from "@/lib/utils";
import { solidColors } from "@/data/colors";

const ColorPicker = forwardRef<HTMLInputElement, InputProps>(({ className, onChange, value, ...props }, ref) => {
  // @ts-ignore
  const [color, setColor] = useState<string>(value || '');

  const solids = solidColors.map((color) => color.color);

  const handleColorChange = (newColor) => {
    setColor(newColor);

    if (onChange) {
      onChange(newColor);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative">
          <div className="flex w-full items-center gap-2">
            {color ? (
              <div
                className="h-4 w-5 rounded !bg-cover !bg-center transition-all"
                style={{ background: color }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <Input
              ref={ref}
              type="text"
              className={cn(
                'w-full justify-start text-left font-normal',
                !color && 'text-muted-foreground',
                className
              )}
              {...props}
              readOnly
              value={color}
            />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Input
          id="color"
          type="color"
          className="w-full cursor-pointer rounded-md"
          value={color}
          onChange={(e) => handleColorChange(e.currentTarget.value)}
        />
        <div className="mt-2 flex max-h-32 w-full flex-wrap gap-1 overflow-y-auto ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          { solids.map((solid, index) => (
            <div
              key={`${solid}-${index}`}
              style={{ background: solid }}
              className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
              onClick={() => handleColorChange(solid)}
            />
          )) }
        </div>
      </PopoverContent>
    </Popover>
  )
})
ColorPicker.displayName = "ColorPicker"

export { ColorPicker }
