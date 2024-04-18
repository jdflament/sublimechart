import * as React from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dropzone } from "@/components/ui/dropzone";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { usePapaParse } from 'react-papaparse';
import {usePlayground} from "@/components/playground-context";
import {useRouter} from "next/navigation";

export function ChartImport() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button type="button" variant="secondary">
            <span className="mr-1">Import</span>
            <Icons.import className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Import your data</DialogTitle>
            <DialogDescription>
              Upload your CSV file.
              Learn more about the format.
            </DialogDescription>
          </DialogHeader>
          <Import />
          <DialogFooter className="pt-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button type="button" variant="secondary">
          <span className="mr-1">Import</span>
          <Icons.import className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Import your data</DrawerTitle>
          <DrawerDescription>
            Upload your CSV file.
            Learn more about the format.
          </DrawerDescription>
        </DrawerHeader>
        <Import className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function Import({ className, ...props }: React.ComponentProps<"div">) {
  const { chart } = usePlayground();
  const router = useRouter();
  const [isImporting, setIsImporting] = useState(false);
  const { readString } = usePapaParse();

  const defaultValues: { file: null | File } = {
    file: null,
  };

  const methods = useForm({
    defaultValues,
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
  });

  async function handleImport() {
    const file = methods.getValues('file');

    if (isImporting || !file) {
      return;
    }

    setIsImporting(true);

    const reader = new FileReader();

    reader.onload = async function(event) {
      const csv = event.target?.result;

      if (typeof csv !== 'string') {
        setIsImporting(false);
        return;
      }

      const parseResponse = readString(csv, {
        complete: () => {}
      });

      try {
        const response = await fetch(`/api/charts/${chart?.id}/csv`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // @ts-ignore
          body: parseResponse.data,
        });

        if (response.ok) {
          toast({
            description: "🎉 Your data has been successfully imported!",
          });

          router.refresh();
        } else {
          throw new Error('Failed to import data. Please try again.');
        }
      } catch (error) {
        toast({
          description: `❌ Error: ${error.message}`,
        });
      } finally {
        setIsImporting(false);
      }
    };

    reader.readAsText(file);
  }

  function handleOnDrop(acceptedFiles: FileList | null) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const allowedTypes = [
        { name: "csv", types: ["text/csv"] },
        {
          name: "excel",
          types: [
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          ],
        },
      ];

      const fileType = allowedTypes.find((allowedType) =>
        allowedType.types.find((type) => type === acceptedFiles[0].type)
      );

      if (!fileType) {
        methods.setValue("file", null);
        methods.setError("file", {
          message: "File type is not valid",
          type: "typeError",
        });
      } else {
        methods.setValue("file", acceptedFiles[0]);
        methods.clearErrors("file");
      }
    } else {
      methods.setValue("file", null);
      methods.setError("file", {
        message: "File is required",
        type: "typeError",
      });
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        className={cn("w-100 flex flex-col items-center justify-center gap-2", className)}
        onSubmit={methods.handleSubmit(handleImport)}
        noValidate
        autoComplete="off"
      >
        <FormField
          control={methods.control}
          name="file"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Dropzone
                  classNameWrapper="p-16"
                  dropMessage="Drop files or click here"
                  handleOnDrop={handleOnDrop}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {methods.watch("file") && (
          <div className="relative flex items-center justify-center gap-3 p-4">
            <Icons.import className="h-4 w-4" />
            <p className="text-sm font-medium">{methods.watch("file")?.name}</p>
          </div>
        )}
        <Button type="submit" disabled={isImporting}>
          {isImporting && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          <span>Import</span>
        </Button>
      </form>
    </FormProvider>
  )
}
