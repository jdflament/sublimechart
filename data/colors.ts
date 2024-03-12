import Colors from 'tailwindcss/colors';

export interface Color {
  value: string
  label: string
  color: string
}

export const solidColors: Color[] = [];

for (const colorGroup in Colors) {
  if (['lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray'].includes(colorGroup)) {
    continue;
  }

  if (typeof Colors[colorGroup] !== "string") {
    // If it's a group of shades, iterate through each shade
    for (const shade in Colors[colorGroup]) {
      solidColors.push({
        value: `${colorGroup}-${shade}`,
        label: `${colorGroup.charAt(0).toUpperCase() + colorGroup.slice(1)} ${shade}`,
        color: Colors[colorGroup][shade]
      });
    }
  }
}

export const gradientColors: Color[] = [
  {
    value: 'red-to-orange',
    label: 'Red to Orange',
    color: 'linear-gradient(to right, #EF4444, #F59E0B)',
  },
  {
    value: 'slate-1',
    label: 'Slate',
    color: 'linear-gradient(to right, #D1D5DB, #6B7280)',
  },
  {
    value: 'custom-1',
    label: 'Custom',
    color: 'linear-gradient(to top right, #ff6154 60%, #ff4582 60%)',
  },
  {
    value: 'custom-2',
    label: 'Custom',
    color: 'linear-gradient(to bottom right, #144462, #010101)',
  },
  {
    value: 'rose-to-red',
    label: 'Rose to Red',
    color: 'linear-gradient(to right, #F43F5E, #EF4444)',
  },
  {
    value: 'pink-to-rose',
    label: 'Pink to Rose',
    color: 'linear-gradient(to right, #F472B6, #F43F5E)',
  },
  {
    value: 'amber-to-yellow',
    label: 'Amber to Yellow',
    color: 'linear-gradient(to right, #F59E0B, #FCD34D)',
  },
  {
    value: 'amber-to-pink',
    label: 'Amber to Pink',
    color: 'linear-gradient(to right, #F59E0B, #F472B6)',
  },
  {
    value: 'violet-to-pink',
    label: 'Violet to Pink',
    color: 'linear-gradient(to right, #9333EA, #F472B6)',
  },
  {
    value: 'blue-to-cyan',
    label: 'Blue to Cyan',
    color: 'linear-gradient(to right, #3B82F6, #22D3EE)',
  },
  {
    value: 'teal',
    label: 'Teal',
    color: 'linear-gradient(to right, #4ADE80, #22C55E)',
  },
  {
    value: 'lime',
    label: 'Lime',
    color: 'linear-gradient(to right, #84CC16, #65A30D)',
  },
  {
    value: 'teal-to-yellow',
    label: 'Teal to Yellow',
    color: 'linear-gradient(to right, #22C55E, #FCD34D)',
  },
  {
    value: 'emerald-to-cyan',
    label: 'Emerald to Cyan',
    color: 'linear-gradient(to right, #10B981, #14B8A6)',
  },
  {
    value: 'indigo-to-cyan',
    label: 'Indigo to Cyan',
    color: 'linear-gradient(to right, #6366F1, #22D3EE)',
  },
  {
    value: 'cyan-to-blue',
    label: 'Cyan to Blue',
    color: 'linear-gradient(to right, #22D3EE, #3B82F6)',
  },
  {
    value: 'indigo-to-blue',
    label: 'Indigo to Blue',
    color: 'linear-gradient(to right, #6366F1, #3B82F6)',
  },
  {
    value: 'blue-to-violet',
    label: 'Blue to Violet',
    color: 'linear-gradient(to right, #3B82F6, #9333EA)',
  },
  {
    value: 'fuchsia-to-cyan',
    label: 'Fuchsia to Cyan',
    color: 'linear-gradient(to right, #F472B6, #22D3EE)',
  },
  {
    value: 'fuchsia-to-purple',
    label: 'Fuchsia to Purple',
    color: 'linear-gradient(to right, #F472B6, #9333EA)',
  },
  {
    value: 'violet-to-purple',
    label: 'Violet to Purple',
    color: 'linear-gradient(to right, #9333EA, #8B5CF6)',
  },
  {
    value: 'violet-to-indigo',
    label: 'Violet to Indigo',
    color: 'linear-gradient(to right, #9333EA, #6366F1)',
  },
  {
    value: 'purple',
    label: 'Purple',
    color: 'linear-gradient(to right, #8B5CF6, #4F46E5)',
  },
  {
    value: 'blue-to-indigo',
    label: 'Blue to Indigo',
    color: 'linear-gradient(to right, #3B82F6, #6366F1)',
  },
  {
    value: 'gray-to-stone',
    label: 'Gray to Stone',
    color: 'linear-gradient(to right, #9CA3AF, #8B8B8B)',
  },
  {
    value: 'stone',
    label: 'Stone',
    color: 'linear-gradient(to right, #8B8B8B, #4B5563)',
  },
  {
    value: 'slate-2',
    label: 'Slate',
    color: 'linear-gradient(to right, #D1D5DB, #6B7280)',
  },
  {
    value: 'emerald',
    label: 'Emerald',
    color: 'linear-gradient(to right, #10B981, #065F46)',
  },
  {
    value: 'slate-3',
    label: 'Slate',
    color: 'linear-gradient(to right, #6B7280, #1F2937)',
  },
  {
    value: 'pink-red-yellow',
    label: 'Pink to Red to Yellow',
    color: 'linear-gradient(to right, #F472B6, #EF4444, #FCD34D)',
  },
  {
    value: 'green-blue-purple',
    label: 'Green to Blue to Purple',
    color: 'linear-gradient(to right, #22C55E, #3B82F6, #9333EA)',
  },
  {
    value: 'pink-purple-indigo',
    label: 'Pink to Purple to Indigo',
    color: 'linear-gradient(to right, #F472B6, #8B5CF6, #6366F1)',
  },
  {
    value: 'gray-black',
    label: 'Gray to Black',
    color: 'linear-gradient(to right, #6B7280, #111827)',
  },
  {
    value: 'indigo-red-yellow',
    label: 'Indigo to Red to Yellow',
    color: 'linear-gradient(to right, #6366F1, #EF4444, #FCD34D)',
  },
  {
    value: 'yellow',
    label: 'Yellow',
    color: 'linear-gradient(to right, #FCD34D, #F59E0B)',
  },
  {
    value: 'yellow-green',
    label: 'Yellow to Green',
    color: 'linear-gradient(to right, #FCD34D, #22C55E)',
  },
  {
    value: 'gray',
    label: 'Gray',
    color: 'linear-gradient(to right, #9CA3AF, #6B7280)',
  },
  {
    value: 'red-yellow',
    label: 'Red to Yellow',
    color: 'linear-gradient(to right, #EF4444, #FCD34D)',
  },
  {
    value: 'green-blue',
    label: 'Green to Blue',
    color: 'linear-gradient(to right, #22C55E, #3B82F6)',
  },
  {
    value: 'blue-green-yellow',
    label: 'Blue to Green to Yellow',
    color: 'linear-gradient(to right, #3B82F6, #22C55E, #FCD34D)',
  },
  {
    value: 'yellow-red',
    label: 'Yellow to Red',
    color: 'linear-gradient(to right, #FCD34D, #EF4444)',
  },
  {
    value: 'blue-green',
    label: 'Blue to Green',
    color: 'linear-gradient(to right, #3B82F6, #22C55E)',
  },
  {
    value: 'purple-yellow',
    label: 'Purple to Yellow',
    color: 'linear-gradient(to right, #8B5CF6, #FCD34D)',
  },
  {
    value: 'red-gray-blue',
    label: 'Red to Gray to Blue',
    color: 'linear-gradient(to right, #EF4444, #9CA3AF, #3B82F6)',
  },
  {
    value: 'red-yellow-yellow',
    label: 'Red to Yellow to Yellow',
    color: 'linear-gradient(to right, #EF4444, #FCD34D, #F59E0B)',
  },
];
