"use client"

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { ChartDataSetsColors } from "@/components/chart-data-sets-colors";
import { Slider } from "@/components/ui/slider";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

export function ChartDataSets() {
  const form = useFormContext();
  const [isOpen, setIsOpen] = useState(true)

  const type = form.watch('config.type');
  const labels = form.watch('config.data.labels');
  const datasets = form.watch('config.data.datasets');

  const {
    append: append,
    remove: remove,
  } = useFieldArray({
    name: "config.data.datasets",
    control: form.control,
  });

  function handleAppend() {
    if (!isOpen) {
      setIsOpen(true);
    }

    append({
      label: '',
      data: labels.map(() => 0),
    })
  }

  return (
      <div className="grid gap-2 pt-2">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <div className="flex items-center justify-between space-x-4">
            <FormLabel className="text-sm font-semibold">
              Configure datasets
            </FormLabel>
            <CollapsibleTrigger defaultChecked={true} asChild>
              <Button variant="outline" size="sm">
                <CaretSortIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-2 space-y-2">
            <div className="grid space-y-2">
              {datasets && datasets.map((dataset, datasetIndex) => (
                <Card key={`dataset-${datasetIndex}`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3">
                    <CardTitle className="text-sm font-medium">
                      Dataset #{datasetIndex + 1}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button type="button" variant="outline">
                            <span className="sr-only">Configure</span>
                            <Icons.settings className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-96">
                          <SheetHeader>
                            <SheetTitle className="text-sm font-medium">
                              Dataset #{datasetIndex + 1}
                            </SheetTitle>
                            <SheetDescription>
                              Edit the dataset values and style.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="grid gap-4 py-4">
                            <FormLabel>Dataset</FormLabel>
                            <ScrollArea className="max-h-[600px] whitespace-nowrap rounded-md border">
                              <div className="flex flex-col space-y-4 p-4">
                                { labels && labels.map((label, index) => (
                                  <FormField
                                    control={form.control}
                                    key={`dataset-${datasetIndex}-label-${index}`}
                                    name={`config.data.datasets.${datasetIndex}.data.${index}`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl className="flex gap-2">
                                          <Input
                                            type="number"
                                            placeholder={label ? `Data for ${label}` : `Data #${index + 1}`}
                                            {...field}
                                            onChange={(event) => (
                                              field.onChange(event.target.value ? parseFloat(event.target.value) : null)
                                            )}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                ))}
                              </div>
                            </ScrollArea>
                          </div>
                          <SheetFooter>
                            <SheetTrigger asChild>
                              <Button type="button">
                                Save
                              </Button>
                            </SheetTrigger>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>

                      { datasetIndex !== 0 && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost">
                              <Icons.trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure to remove this dataset?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your dataset.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => remove(datasetIndex)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="px-3 pb-3">
                    <FormField
                      control={form.control}
                      key={dataset.id}
                      name={`config.data.datasets.${datasetIndex}.label`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl className="flex gap-2">
                              <Input placeholder="Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`config.data.datasets.${datasetIndex}.borderWidth`}
                      render={({ field: { value, onChange } }) => (
                        <FormItem className="py-2">
                          <FormControl>
                            <div className="grid gap-4">
                              <div className="flex items-center justify-between">
                                <FormLabel htmlFor="padding">Border width</FormLabel>
                                <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                                  {value ?? '-'}
                                </span>
                              </div>
                              <Slider
                                id="padding"
                                max={20}
                                defaultValue={[value]}
                                step={1}
                                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                                aria-label="Padding"
                                onValueChange={(values) => onChange(values[0])}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    { ['line', 'radar'].includes(type) && (
                      <FormField
                        control={form.control}
                        name={`config.data.datasets.${datasetIndex}.fill`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between py-2">
                            <div className="space-y-0.5">
                              <FormLabel className="text-sm">
                                Fill
                              </FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                defaultChecked={true}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}

                    <ChartDataSetsColors datasetIndex={datasetIndex} />
                  </CardContent>
                </Card>
              ))}
            </div>
        </CollapsibleContent>
      </Collapsible>

      <Button
        type="button"
        variant="outline"
        className="mt-2 w-full"
        onClick={handleAppend}
      >
        <span>Add dataset</span>
        <Icons.add className="h-4 w-4" />
      </Button>
    </div>
  );
}
