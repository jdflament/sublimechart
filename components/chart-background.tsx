import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function ChartBackground() {
  const form = useFormContext();
  const backgroundColor = form.watch('config.options.plugins.background.color');

  const backgroundOptions = [
    {
      value: 'linear-gradient-to-red-orange',
      label: 'Red to Orange',
      color: 'linear-gradient(to right, #EF4444, #F59E0B)',
    },
    {
      value: 'linear-gradient-to-slate-1',
      label: 'Slate',
      color: 'linear-gradient(to right, #D1D5DB, #6B7280)',
    },
    {
      value: 'linear-gradient-to-[#ff6154]-[#ff4582]-bg-white',
      label: 'Custom',
      color: 'linear-gradient(to top right, #ff6154 60%, #ff4582 60%)',
    },
    {
      value: 'linear-gradient-to-[#144462]-[#010101]',
      label: 'Custom',
      color: 'linear-gradient(to bottom right, #144462, #010101)',
    },
    {
      value: 'linear-gradient-to-red-orange',
      label: 'Red to Orange',
      color: 'linear-gradient(to right, #EF4444, #F59E0B)',
    },
    {
      value: 'linear-gradient-to-rose-red',
      label: 'Rose to Red',
      color: 'linear-gradient(to right, #F43F5E, #EF4444)',
    },
    {
      value: 'linear-gradient-to-pink-rose',
      label: 'Pink to Rose',
      color: 'linear-gradient(to right, #F472B6, #F43F5E)',
    },
    {
      value: 'linear-gradient-to-amber-yellow',
      label: 'Amber to Yellow',
      color: 'linear-gradient(to right, #F59E0B, #FCD34D)',
    },
    {
      value: 'linear-gradient-to-amber-yellow',
      label: 'Amber to Yellow',
      color: 'linear-gradient(to right, #F59E0B, #FCD34D)',
    },
    {
      value: 'linear-gradient-to-amber-pink',
      label: 'Amber to Pink',
      color: 'linear-gradient(to right, #F59E0B, #F472B6)',
    },
    {
      value: 'linear-gradient-to-violet-pink',
      label: 'Violet to Pink',
      color: 'linear-gradient(to right, #9333EA, #F472B6)',
    },
    {
      value: 'linear-gradient-to-blue-cyan',
      label: 'Blue to Cyan',
      color: 'linear-gradient(to right, #3B82F6, #22D3EE)',
    },
    {
      value: 'linear-gradient-to-teal',
      label: 'Teal',
      color: 'linear-gradient(to right, #4ADE80, #22C55E)',
    },
    {
      value: 'linear-gradient-to-lime',
      label: 'Lime',
      color: 'linear-gradient(to right, #84CC16, #65A30D)',
    },
    {
      value: 'linear-gradient-to-teal-yellow',
      label: 'Teal to Yellow',
      color: 'linear-gradient(to right, #22C55E, #FCD34D)',
    },
    {
      value: 'linear-gradient-to-emerald-cyan',
      label: 'Emerald to Cyan',
      color: 'linear-gradient(to right, #10B981, #14B8A6)',
    },
    {
      value: 'linear-gradient-to-indigo-cyan',
      label: 'Indigo to Cyan',
      color: 'linear-gradient(to right, #6366F1, #22D3EE)',
    },
    {
      value: 'linear-gradient-to-cyan-blue',
      label: 'Cyan to Blue',
      color: 'linear-gradient(to right, #22D3EE, #3B82F6)',
    },
    {
      value: 'linear-gradient-to-indigo-blue',
      label: 'Indigo to Blue',
      color: 'linear-gradient(to right, #6366F1, #3B82F6)',
    },
    {
      value: 'linear-gradient-to-blue-violet',
      label: 'Blue to Violet',
      color: 'linear-gradient(to right, #3B82F6, #9333EA)',
    },
    {
      value: 'linear-gradient-to-fuchsia-cyan',
      label: 'Fuchsia to Cyan',
      color: 'linear-gradient(to right, #F472B6, #22D3EE)',
    },
    {
      value: 'linear-gradient-to-fuchsia-pink',
      label: 'Fuchsia to Pink',
      color: 'linear-gradient(to right, #F472B6, #F43F5E)',
    },
    {
      value: 'linear-gradient-to-fuchsia-purple',
      label: 'Fuchsia to Purple',
      color: 'linear-gradient(to right, #F472B6, #9333EA)',
    },
    {
      value: 'linear-gradient-to-fuchsia-pink',
      label: 'Fuchsia to Pink',
      color: 'linear-gradient(to right, #F472B6, #F43F5E)',
    },
    {
      value: 'linear-gradient-to-violet-purple',
      label: 'Violet to Purple',
      color: 'linear-gradient(to right, #9333EA, #8B5CF6)',
    },
    {
      value: 'linear-gradient-to-violet-indigo',
      label: 'Violet to Indigo',
      color: 'linear-gradient(to right, #9333EA, #6366F1)',
    },
    {
      value: 'linear-gradient-to-purple',
      label: 'Purple',
      color: 'linear-gradient(to right, #8B5CF6, #4F46E5)',
    },
    {
      value: 'linear-gradient-to-blue-indigo',
      label: 'Blue to Indigo',
      color: 'linear-gradient(to right, #3B82F6, #6366F1)',
    },
    {
      value: 'linear-gradient-to-gray-stone',
      label: 'Gray to Stone',
      color: 'linear-gradient(to right, #9CA3AF, #8B8B8B)',
    },
    {
      value: 'linear-gradient-to-stone',
      label: 'Stone',
      color: 'linear-gradient(to right, #8B8B8B, #4B5563)',
    },
    {
      value: 'linear-gradient-to-slate-2',
      label: 'Slate',
      color: 'linear-gradient(to right, #D1D5DB, #6B7280)',
    },
    {
      value: 'linear-gradient-to-emerald',
      label: 'Emerald',
      color: 'linear-gradient(to right, #10B981, #065F46)',
    },
    {
      value: 'linear-gradient-to-slate-3',
      label: 'Slate',
      color: 'linear-gradient(to right, #6B7280, #1F2937)',
    },
    {
      value: 'linear-gradient-to-pink-red-yellow',
      label: 'Pink to Red to Yellow',
      color: 'linear-gradient(to right, #F472B6, #EF4444, #FCD34D)',
    },
    {
      value: 'linear-gradient-to-green-blue-purple',
      label: 'Green to Blue to Purple',
      color: 'linear-gradient(to right, #22C55E, #3B82F6, #9333EA)',
    },
    {
      value: 'linear-gradient-to-pink-purple-indigo',
      label: 'Pink to Purple to Indigo',
      color: 'linear-gradient(to right, #F472B6, #8B5CF6, #6366F1)',
    },
    {
      value: 'linear-gradient-to-gray-black',
      label: 'Gray to Black',
      color: 'linear-gradient(to right, #6B7280, #111827)',
    },
    {
      value: 'linear-gradient-to-indigo-red-yellow',
      label: 'Indigo to Red to Yellow',
      color: 'linear-gradient(to right, #6366F1, #EF4444, #FCD34D)',
    },
    {
      value: 'linear-gradient-to-yellow',
      label: 'Yellow',
      color: 'linear-gradient(to right, #FCD34D, #F59E0B)',
    },
    {
      value: 'linear-gradient-to-yellow',
      label: 'Yellow',
      color: 'linear-gradient(to right, #F59E0B, #FCD34D)',
    },
    {
      value: 'linear-gradient-to-yellow-green',
      label: 'Yellow to Green',
      color: 'linear-gradient(to right, #FCD34D, #22C55E)',
    },
    {
      value: 'linear-gradient-to-gray',
      label: 'Gray',
      color: 'linear-gradient(to right, #9CA3AF, #6B7280)',
    },
    {
      value: 'linear-gradient-to-red-yellow',
      label: 'Red to Yellow',
      color: 'linear-gradient(to right, #EF4444, #FCD34D)',
    },
    {
      value: 'linear-gradient-to-green-blue',
      label: 'Green to Blue',
      color: 'linear-gradient(to right, #22C55E, #3B82F6)',
    },
    {
      value: 'linear-gradient-to-yellow',
      label: 'Yellow',
      color: 'linear-gradient(to right, #FCD34D, #F59E0B)',
    },
    {
      value: 'linear-gradient-to-green-purple',
      label: 'Green to Purple',
      color: 'linear-gradient(to right, #22C55E, #8B5CF6)',
    },
    {
      value: 'linear-gradient-to-red',
      label: 'Red',
      color: 'linear-gradient(to right, #EF4444, #991B1B)',
    },
    {
      value: 'linear-gradient-to-green-yellow-pink',
      label: 'Green to Yellow to Pink',
      color: 'linear-gradient(to right, #22C55E, #FCD34D, #F472B6)',
    },
    {
      value: 'linear-gradient-to-indigo-purple',
      label: 'Indigo to Purple',
      color: 'linear-gradient(to right, #6366F1, #8B5CF6)',
    },
    {
      value: 'linear-gradient-to-gray-blue',
      label: 'Gray to Blue',
      color: 'linear-gradient(to right, #9CA3AF, #3B82F6)',
    },
    {
      value: 'linear-gradient-to-blue',
      label: 'Blue',
      color: 'linear-gradient(to right, #3B82F6, #1E3A8A)',
    },
    {
      value: 'linear-gradient-to-green',
      label: 'Green',
      color: 'linear-gradient(to right, #22C55E, #047857)',
    },
    {
      value: 'linear-gradient-to-purple-yellow',
      label: 'Purple to Yellow',
      color: 'linear-gradient(to right, #8B5CF6, #FCD34D)',
    },
    {
      value: 'linear-gradient-to-red-gray-blue',
      label: 'Red to Gray to Blue',
      color: 'linear-gradient(to right, #EF4444, #9CA3AF, #3B82F6)',
    },
    {
      value: 'linear-gradient-to-red-yellow-yellow',
      label: 'Red to Yellow to Yellow',
      color: 'linear-gradient(to right, #EF4444, #FCD34D, #F59E0B)',
    },
    {
      value: 'linear-gradient-to-yellow',
      label: 'Yellow',
      color: 'linear-gradient(to right, #FCD34D, #F59E0B)',
    },
    {
      value: 'linear-gradient-to-blue-green-yellow',
      label: 'Blue to Green to Yellow',
      color: 'linear-gradient(to right, #3B82F6, #22C55E, #FCD34D)',
    },
    {
      value: 'linear-gradient-to-yellow-red',
      label: 'Yellow to Red',
      color: 'linear-gradient(to right, #FCD34D, #EF4444)',
    },
    {
      value: 'linear-gradient-to-green',
      label: 'Green',
      color: 'linear-gradient(to right, #22C55E, #047857)',
    },
    {
      value: 'linear-gradient-to-purple-yellow',
      label: 'Purple to Yellow',
      color: 'linear-gradient(to right, #8B5CF6, #FCD34D)',
    },
    {
      value: 'linear-gradient-to-red-gray-blue',
      label: 'Red to Gray to Blue',
      color: 'linear-gradient(to right, #EF4444, #9CA3AF, #3B82F6)',
    },
    {
      value: 'linear-gradient-to-red-yellow-yellow',
      label: 'Red to Yellow to Yellow',
      color: 'linear-gradient(to right, #EF4444, #FCD34D, #F59E0B)',
    },
    {
      value: 'linear-gradient-to-yellow',
      label: 'Yellow',
      color: 'linear-gradient(to right, #FCD34D, #F59E0B)',
    },
    {
      value: 'linear-gradient-to-blue-green-yellow',
      label: 'Blue to Green to Yellow',
      color: 'linear-gradient(to right, #3B82F6, #22C55E, #FCD34D)',
    },
    {
      value: 'linear-gradient-to-yellow-red',
      label: 'Yellow to Red',
      color: 'linear-gradient(to right, #FCD34D, #EF4444)',
    },
    {
      value: 'linear-gradient-to-blue-green',
      label: 'Blue to Green',
      color: 'linear-gradient(to right, #3B82F6, #22C55E)',
    },
  ];

  return (
    <FormField
      control={form.control}
      name="config.options.plugins.background.color"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormMessage />
          <RadioGroup
            onValueChange={field.onChange}
            value={backgroundColor}
            className="grid max-w-md grid-cols-2 gap-2 pt-2"
          >
            {backgroundOptions.map((option) => (
              <FormItem key={option.value}>
                <FormLabel>
                  <FormControl>
                    <RadioGroupItem
                      value={option.color}
                      checked={backgroundColor === option.color}
                      className="sr-only"
                    />
                  </FormControl>
                  <div
                    className={`cursor-pointer items-center rounded-md border-2 border-muted p-1 hover:border-accent ${
                      backgroundColor === option.color ? 'bg-popover' : ''
                    }`}
                  >
                    <div className="space-y-2 rounded-sm p-2">
                      <div
                        className="h-16 w-full rounded-md"
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
