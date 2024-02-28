import {Input, InputProps} from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Paintbrush } from 'lucide-react'
import {forwardRef, useEffect, useState} from 'react'
import { cn } from "@/lib/utils";

const ColorPicker = forwardRef<HTMLInputElement, InputProps>(({ className, onChange, value, ...props }, ref) => {
  // @ts-ignore
  const [color, setColor] = useState<string>(value || '');

  const solids = [
    '#E2E2E2',
    '#ff75c3',
    '#ffa647',
    '#ffe83f',
    '#9fff5b',
    '#70e2ff',
    '#cd93ff',
    '#09203f',
    '#a62626',
    '#692b4e',
    '#eacdae',
    '#c7b212',
    '#4aad00',
    '#14caff',
    '#701cb9',
    '#084094',
  ]

  const gradients = [
    'linear-gradient(to top left,#accbee,#e7f0fd)',
    'linear-gradient(to top left,#d5d4d0,#d5d4d0,#eeeeec)',
    'linear-gradient(to top left,#000000,#434343)',
    'linear-gradient(to top left,#09203f,#537895)',
    'linear-gradient(to top left,#AC32E4,#7918F2,#4801FF)',
    'linear-gradient(to top left,#f953c6,#b91d73)',
    'linear-gradient(to top left,#ee0979,#ff6a00)',
    'linear-gradient(to top left,#F00000,#DC281E)',
    'linear-gradient(to top left,#00c6ff,#0072ff)',
    'linear-gradient(to top left,#4facfe,#00f2fe)',
    'linear-gradient(to top left,#0ba360,#3cba92)',
    'linear-gradient(to top left,#FDFC47,#24FE41)',
    'linear-gradient(to top left,#8a2be2,#0000cd,#228b22,#ccff00)',
    'linear-gradient(to top left,#40E0D0,#FF8C00,#FF0080)',
    'linear-gradient(to top left,#fcc5e4,#fda34b,#ff7882,#c8699e,#7046aa,#0c1db8,#020f75)',
    'linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)',
  ]

  const defaultTab = 'solid';

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
                className="h-4 w-4 rounded !bg-cover !bg-center transition-all"
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
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="gradient">
              Gradient
            </TabsTrigger>
          </TabsList>

          <TabsContent value="solid" className="mt-0 flex flex-wrap gap-1">
            {solids.map((solid) => (
              <div
                key={solid}
                style={{ background: solid }}
                className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
                onClick={() => handleColorChange(solid)}
              />
            ))}
            <Input
              id="color"
              type="color"
              className="w-full cursor-pointer rounded-md"
              onChange={(e) => handleColorChange(e.currentTarget.value)}
            />
          </TabsContent>

          <TabsContent value="gradient" className="mt-0">
            <div className="mb-2 flex flex-wrap gap-1">
              {gradients.map((gradient) => (
                <div
                  key={gradient}
                  style={{ background: gradient }}
                  className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
                  onClick={() => handleColorChange(gradient)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
})
ColorPicker.displayName = "ColorPicker"

export { ColorPicker }
