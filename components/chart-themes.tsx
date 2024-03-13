import { useFormContext } from 'react-hook-form';
import {FormControl, FormLabel} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { themes } from '@/data/themes';
import * as React from "react";
import { ChartPatchFormData } from "@/types/chart";
import {mergeObjects} from "@/lib/utils";

export function ChartThemes() {
  const form = useFormContext<ChartPatchFormData>();
  const [selectedTheme, setSelectedTheme] = React.useState<string>()
  const config = form.watch("config");

  function onChangeTheme(themeSlug) {
    if (!themeSlug) {
      return;
    }

    setSelectedTheme(themeSlug);

    const theme = themes.find((theme) => theme.slug === themeSlug);

    if (theme) {
      // @ts-ignore
      form.setValue('config', mergeObjects(config, theme.config));
    }
  }

  return (
    <RadioGroup onValueChange={onChangeTheme}>
      <div className="grid max-w-md grid-cols-1 gap-2 pt-2">
        {themes.map((theme) => (
          <FormLabel htmlFor={theme.slug} key={theme.slug} className="[&:has([data-state=checked])>div]:border-primary">
            <FormControl>
              <RadioGroupItem
                id={theme.slug}
                value={theme.slug}
                checked={selectedTheme === theme.slug}
                className="sr-only"
              />
            </FormControl>
            <div className="cursor-pointer items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
              <div className="space-y-2 rounded-sm">
                <div
                  className="h-60 w-full rounded-md bg-cover bg-center"
                  style={{ backgroundImage: `url(${theme.image})` }}
                />
              </div>
            </div>
            <span className="block w-full p-2 text-center font-semibold">
              {theme.name}
            </span>
          </FormLabel>
        ))}
      </div>
    </RadioGroup>
  );
}
