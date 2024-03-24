"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { useForm, FormProvider } from "react-hook-form";
import { ActivateLicenseKeyFormData } from "@/types/lemonsqueezy";
import { zodResolver } from "@hookform/resolvers/zod";
import { activateLicenseKeySchema } from "@/lib/validations/lemonsqueezy";
import { useState } from "react";
import { useRouter} from "next/navigation";
import {FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ActivateLicenseKeyFormProps {
  licenseKey: string|null
}

export function ActivateLicenseKeyForm({ licenseKey }: ActivateLicenseKeyFormProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const defaultValues = activateLicenseKeySchema.parse({ licenseKey: licenseKey || '' });

  const form = useForm<ActivateLicenseKeyFormData>({
    resolver: zodResolver(activateLicenseKeySchema),
    defaultValues,
  });

  const router = useRouter()
  const { handleSubmit} = form;
  const hasLicenseKey = licenseKey !== null;

  async function onSubmit(data: ActivateLicenseKeyFormData) {
    if (hasLicenseKey) {
      return;
    }

    setIsSaving(true)

    const response = await fetch(`/api/users/lemon-squeezy/activate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "An error occurred while activating your license key. Please try again.",
        variant: "destructive",
      })
    }

    router.refresh();

    return toast({
      description: "🎉 Your license key has been activated! Enjoy the full potential of SublimeChart.",
    });
  }

  return (
    <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Activate a license key</CardTitle>
              <CardDescription>
                Please enter your license key to activate the PRO plan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="licenseKey"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormControl>
                      <Input placeholder="Your license key" {...field} disabled={hasLicenseKey} />
                    </FormControl>
                    { hasLicenseKey && (
                      <FormDescription className="font-semibold">
                        A license key has already been activated for your account. Thank you. ✅
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
              <button
                type="submit"
                className={cn(buttonVariants())}
                disabled={isSaving || hasLicenseKey}
              >
                {isSaving && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Activate
              </button>
            </CardFooter>
          </Card>
      </form>
    </FormProvider>
  )
}
