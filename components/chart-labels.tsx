"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Chart } from "@prisma/client";
import {Icons} from "@/components/icons";
import {Input} from "@/components/ui/input";

interface ChartLabelsProps {
  chart: Pick<Chart, "id" | "config">
}

export function ChartLabels({ chart }: ChartLabelsProps) {
  const [isOpen, setIsOpen] = React.useState(true)
  const [labels, setLabels] = React.useState(chart.config?.labels || [''])

  console.log(labels);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="flex items-center justify-between space-x-4">
        <h4 className="text-sm font-semibold">
          Configure labels
        </h4>
        <CollapsibleTrigger defaultChecked={true} asChild>
          <Button variant="outline" size="sm">
            <CaretSortIcon className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2 space-y-2">
        {labels && labels.map((label, index) => (
          <div key={index} className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder={`Label #${index + 1}`} />
            <Button type="button" variant="outline">
              <Icons.trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ChartLabels;
