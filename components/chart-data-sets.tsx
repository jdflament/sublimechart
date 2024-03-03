"use client"

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
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
import { ColorPicker } from "@/components/ui/color-picker";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ChartDataSets() {
  const form = useFormContext();
  const [isOpen, setIsOpen] = useState(true)

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

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary">
                          <span className="sr-only">Actions</span>
                          <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Sheet>
                          <SheetTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              Edit
                            </DropdownMenuItem>
                          </SheetTrigger>
                          <SheetContent className="w-80">
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
                              <ScrollArea className="max-h-96 whitespace-nowrap rounded-md border">
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
                                              onChange={(event) => field.onChange(parseFloat(event.target.value))}
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
                            <div className="grid gap-4 py-4">
                              <FormLabel>Background color</FormLabel>
                              <FormField
                                control={form.control}
                                key={`dataset-${datasetIndex}-backgroundColor`}
                                name={`config.data.datasets.${datasetIndex}.backgroundColor`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl className="flex gap-2">
                                      <ColorPicker {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grid gap-4 py-4">
                              <FormLabel>Border color</FormLabel>
                              <FormField
                                control={form.control}
                                key={`dataset-${datasetIndex}-borderColor`}
                                name={`config.data.datasets.${datasetIndex}.borderColor`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl className="flex gap-2">
                                      <ColorPicker {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
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
                          <div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onSelect={() => remove(datasetIndex)}
                              className="text-red-600"
                            >
                              Remove
                            </DropdownMenuItem>
                          </div>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
