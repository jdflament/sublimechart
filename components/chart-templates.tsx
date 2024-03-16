import { useFormContext } from 'react-hook-form';
import {FormControl, FormLabel} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { templates } from '@/config/templates';
import * as React from "react";
import { ChartPatchFormData } from "@/types/chart";

export function ChartTemplates() {
  const form = useFormContext<ChartPatchFormData>();
  const [selectedTheme, setSelectedTheme] = React.useState<string>()

  function onChangeTheme(templateSlug) {
    if (!templateSlug) {
      return;
    }

    setSelectedTheme(templateSlug);

    const template = templates.find((template) => template.slug === templateSlug);

    if (template) {
      // @ts-ignore
      form.setValue('config', template.config);
    }
  }

  return (
    <RadioGroup onValueChange={onChangeTheme}>
      <div className="grid max-w-md grid-cols-1 gap-2 pt-2">
        {templates.map((template) => (
          <FormLabel htmlFor={template.slug} key={template.slug} className="[&:has([data-state=checked])>div]:border-primary">
            <FormControl>
              <RadioGroupItem
                id={template.slug}
                value={template.slug}
                checked={selectedTheme === template.slug}
                className="sr-only"
              />
            </FormControl>
            <div className="cursor-pointer items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
              <div className="space-y-2 rounded-sm">
                <div
                  className="h-60 w-full rounded-md bg-cover bg-center"
                  style={{ backgroundImage: `url(${template.image})` }}
                />
              </div>
            </div>
            <span className="block w-full p-2 text-center font-semibold">
              {template.name}
            </span>
          </FormLabel>
        ))}
      </div>
    </RadioGroup>
  );
}
