import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { solidColors, gradientColors } from '@/config/colors';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function ChartBackground() {
  const form = useFormContext();
  const backgroundColor = form.watch('config.options.plugins.background.color');

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
          >
            <Tabs defaultValue="solid">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="solid">Solid</TabsTrigger>
                <TabsTrigger value="gradient">Gradient</TabsTrigger>
              </TabsList>
              <TabsContent value="solid" className="grid max-w-md grid-cols-2 gap-2 pt-2">
                {solidColors.map((color) => (
                  <FormItem key={color.value}>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem
                          value={color.color}
                          checked={backgroundColor === color.color}
                          className="sr-only"
                        />
                      </FormControl>
                      <div
                        className={`cursor-pointer items-center rounded-md border-2 border-muted p-1 hover:border-accent ${
                          backgroundColor === color.color ? 'bg-popover' : ''
                        }`}
                      >
                        <div className="space-y-2 rounded-sm p-2">
                          <div
                            className="h-16 w-full rounded-md"
                            style={{ background: color.color }}
                          />
                        </div>
                      </div>
                    </FormLabel>
                  </FormItem>
                ))}
              </TabsContent>
              <TabsContent value="gradient" className="grid max-w-md grid-cols-2 gap-2 pt-2">
                {gradientColors.map((color) => (
                  <FormItem key={color.value}>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem
                          value={color.color}
                          checked={backgroundColor === color.color}
                          className="sr-only"
                        />
                      </FormControl>
                      <div
                        className={`cursor-pointer items-center rounded-md border-2 border-muted p-1 hover:border-accent ${
                          backgroundColor === color.color ? 'bg-popover' : ''
                        }`}
                      >
                        <div className="space-y-2 rounded-sm p-2">
                          <div
                            className="h-16 w-full rounded-md"
                            style={{ background: color.color }}
                          />
                        </div>
                      </div>
                    </FormLabel>
                  </FormItem>
                ))}
              </TabsContent>
            </Tabs>
          </RadioGroup>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
