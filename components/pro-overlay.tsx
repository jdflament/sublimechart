import React from 'react';
import { Icons } from "@/components/icons";

export function ProOverlay() {
  return (
    <div className="absolute -right-2 -top-2 z-10 flex rounded-md bg-accent-foreground p-1 text-xs opacity-75 dark:bg-accent">
      <Icons.lock className="h-4 w-4 text-primary"/>
      <span className="ml-0 h-0 w-0 text-xs font-semibold text-secondary opacity-0 transition-all duration-300 ease-in-out group-hover:ml-1 group-hover:h-auto group-hover:w-auto group-hover:opacity-100 dark:text-secondary-foreground">PRO</span>
    </div>
  );
}
