import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function ChartBackground() {
  const form = useFormContext();
  const [selectedBackground, setSelectedBackground] = useState('color1');

  const backgroundOptions = [
    {
      value: 'color1',
      label: 'Color 1',
      color: '#F94144',
    },
    {
      value: 'color2',
      label: 'Color 2',
      color: '#F3722C',
    },
    {
      value: 'color3',
      label: 'Color 3',
      color: '#F8961E',
    },
    {
      value: 'color4',
      label: 'Color 4',
      color: '#F9C74F',
    },
    {
      value: 'color5',
      label: 'Color 5',
      color: '#90BE6D',
    },
    {
      value: 'color6',
      label: 'Color 6',
      color: '#43AA8B',
    },
    {
      value: 'color7',
      label: 'Color 7',
      color: '#577590',
    },
    {
      value: 'color8',
      label: 'Color 8',
      color: '#277DA1',
    },
    {
      value: 'color9',
      label: 'Color 9',
      color: '#E63946',
    },
    {
      value: 'color10',
      label: 'Color 10',
      color: '#F1FAEE',
    },
    {
      value: 'color11',
      label: 'Color 11',
      color: '#A8DADC',
    },
    {
      value: 'color12',
      label: 'Color 12',
      color: '#457B9D',
    },
    {
      value: 'color13',
      label: 'Color 13',
      color: '#1D3557',
    },
    {
      value: 'color14',
      label: 'Color 14',
      color: '#98C1D9',
    },
    {
      value: 'color15',
      label: 'Color 15',
      color: '#E0FBFC',
    },
    {
      value: 'color16',
      label: 'Color 16',
      color: '#B2DBBF',
    },
    {
      value: 'color17',
      label: 'Color 17',
      color: '#81B29A',
    },
    {
      value: 'color18',
      label: 'Color 18',
      color: '#FF6B6B',
    },
    {
      value: 'color19',
      label: 'Color 19',
      color: '#FFE66D',
    },
    {
      value: 'color20',
      label: 'Color 20',
      color: '#3D315B',
    },
  ];


  return (
    <FormField
      control={form.control}
      name="options.plugins.customCanvasBackgroundColor.color"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <RadioGroup
            defaultValue={field.value}
            onChange={field.onChange}
            className="grid max-w-md grid-cols-2 gap-2 pt-2"
          >
            {backgroundOptions.map((option) => (
              <FormItem key={option.value}>
                <FormLabel>
                  <FormControl>
                    <RadioGroupItem
                      value={option.value}
                      checked={selectedBackground === option.value}
                      className="sr-only"
                    />
                  </FormControl>
                  <div
                    className={`cursor-pointer items-center rounded-md border-2 border-muted p-1 hover:border-accent ${
                      selectedBackground === option.value ? 'bg-popover' : ''
                    }`}
                  >
                    <div className="space-y-2 rounded-sm p-2">
                      <div
                        className="h-12 w-full rounded-md"
                        style={{ background: option.color }}
                      />
                    </div>
                  </div>
                </FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
