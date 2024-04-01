import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { tiers } from "@/config/tiers";

export const metadata = {
  title: "Pricing",
}

export default function PricingPage() {
  return (
    <section id="pricing" className="container flex flex-col gap-6 py-14 md:max-w-[64rem] md:py-16 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="font-heading font-semibold leading-7 text-primary">SublimeChart Pricing</h2>
          <p className="mt-2 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Build awesome charts today.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
          SublimeChart offers a straightforward pricing model. No hidden fees, no surprises.
        </p>
        <div className="mx-auto mt-4 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-16 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={cn(
                tier.featured ? 'relative bg-accent-foreground shadow-2xl' : 'bg-background/60 sm:mx-8 lg:mx-0',
                tier.featured
                  ? ''
                  : tierIdx === 0
                    ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none'
                    : 'sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
                'rounded-3xl p-8 ring-1 ring-secondary sm:p-10'
              )}
            >
              <h3
                id={tier.id}
                className={cn(
                  tier.featured ? 'text-accent' : 'text-secondary-foreground',
                  'text-base font-semibold leading-7'
                )}
              >
                {tier.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                  <span
                    className={cn(
                      tier.featured ? 'text-accent' : 'text-secondary-foreground',
                      'font-heading text-5xl tracking-tight'
                    )}
                  >
                    {tier.price}
                  </span>
                { tier.priceHelpText && (
                  <span className={cn(
                    tier.featured ? 'text-accent' : 'text-secondary-foreground',
                    'font-heading text-sm tracking-tight'
                  )}>
                    {tier.priceHelpText}
                  </span>
                )}
              </p>
              <p className={cn(tier.featured ? 'text-accent' : 'text-secondary-foreground', 'mt-6 text-base leading-7')}>
                {tier.description}
              </p>
              <ul
                role="list"
                className={cn(tier.featured ? 'text-accent' : 'text-muted-foreground', 'mt-8 space-y-3 text-sm leading-6 sm:mt-10')}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Icons.check
                      className="h-6 w-5 flex-none text-primary"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/register" aria-describedby={tier.id} className={cn(buttonVariants({ size: "lg", variant: tier.featured ? 'default' : 'outline' }), 'mt-4 w-full')}>
                Sign up for free
              </Link>
              { tier.featured && (
                <p className="mt-4 text-xs italic text-muted">
                  *We are using <Link href="https://www.lemonsqueezy.com" className="font-semibold hover:underline" target="_blank" rel="nofollow">Lemon Squeezy</Link> for payments. <br />
                  Taxes will be automatically calculated depending on your country. <br />
                  Invoices will be available directly on their platform.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
