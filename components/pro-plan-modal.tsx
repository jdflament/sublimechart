import * as React from "react"

import { cn } from "@/lib/utils"
import {Button, buttonVariants} from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {proTier} from "@/config/tiers";
import {DialogClose} from "@radix-ui/react-dialog";
import Link from "next/link";

interface ProPlanModalProps extends React.HTMLAttributes<HTMLFormElement> {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProPlanModal({
  open,
  onOpenChange,
  className,
  ...props
}: ProPlanModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function handleClickUpgrade() {
    setIsLoading(!isLoading)

    // Get a Stripe session URL.
    const response = await fetch("/api/users/lemon-squeezy")

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Please refresh the page and try again.",
        variant: "destructive",
      })
    }

    const session = await response.json()

    if (session) {
      window.location.href = session.url
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Get your PRO Plan to unlock all features!</DialogTitle>
          </DialogHeader>
          <div className="my-4 w-full rounded-3xl bg-background/60 p-8 ring-2 ring-secondary sm:p-10">
            <h3 className="text-base font-semibold leading-7 text-secondary-foreground">
              {proTier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="font-heading text-5xl tracking-tight text-secondary-foreground">
                {proTier.price}
              </span>
              { proTier.priceHelpText && (
                <span className="font-heading text-sm tracking-tight text-secondary-foreground">
                  {proTier.priceHelpText}
                </span>
              )}
            </p>
            <p className="mt-6 text-base leading-7 text-secondary-foreground">
              {proTier.description}
            </p>
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground sm:mt-10">
              {proTier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <Icons.check
                    className="h-6 w-5 flex-none text-primary"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs italic text-muted-foreground">
              *We are using <Link href="https://www.lemonsqueezy.com" className="font-semibold hover:underline" target="_blank" rel="nofollow">Lemon Squeezy</Link> for payments. <br />
              Taxes will be automatically calculated depending on your country. <br />
              Invoices will be available directly on their platform.
            </p>
          </div>
          <DialogFooter className="mx-auto flex flex-col items-center gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <button
              type="button"
              className={cn(buttonVariants())}
              disabled={isLoading}
              onClick={handleClickUpgrade}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Upgrade to PRO
            </button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
