import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { tiers } from "@/config/tiers";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

export const metadata = {
  title: "Pricing",
}

export default function PricingPage() {
  return (
    <>
      <section id="pricing" className="container flex flex-col gap-6 py-14 md:max-w-[64rem] md:py-16 lg:py-24">
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
          <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
            <h2 className="font-heading font-semibold leading-7">SublimeChart Pricing</h2>
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
                      { tier.discount?.price && (
                        <>
                          <span className="mr-1 text-3xl line-through">{tier.price}</span>
                          {tier.discount?.price}
                        </>
                      ) || tier.price }
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
                { tier.discount?.code && (
                  <p className={cn(
                    tier.featured ? 'text-accent' : 'text-secondary-foreground',
                    'mt-1 tracking-tight'
                  )}>
                    with code <strong>{tier.discount?.code}</strong>
                    { tier.discount?.limit && (
                      <span className={cn(
                        tier.featured ? 'text-accent' : 'text-secondary-foreground',
                        'ml-1 mt-1 text-xs tracking-tight'
                      )}>
                          (Limited to <strong>{tier.discount?.limit}</strong> uses)
                        </span>
                    )}
                  </p>
                )}
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
      <section id="faq" className="container my-14 flex flex-col gap-6 md:my-16 md:max-w-[64rem] lg:my-24">
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
          <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
            <h2 className="font-heading font-semibold leading-7 text-primary">Frequently Asked Questions</h2>
            <p className="mt-2 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Everything you need to know.
            </p>
          </div>
          <Accordion type="single" collapsible className="mt-4 w-full sm:mt-16">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is SublimeChart?</AccordionTrigger>
              <AccordionContent>
                SublimeChart is a live editor tool that allows you to create, design and export charts.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What kind of chart type are available?</AccordionTrigger>
              <AccordionContent>
                Currently we are supporting 5 different chart types: Line, Bar, Doughnut, Pie and Radar.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is SublimeChart free?</AccordionTrigger>
              <AccordionContent>
                Yes, you can start using SublimeChart for free. We also offer a pro version with more features.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I import my data?</AccordionTrigger>
              <AccordionContent>
                Not yet, but we are working on it. Stay tuned for updates.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I use my chart inside my application?</AccordionTrigger>
              <AccordionContent>
                Of course! You can export the Chart.JS configuration by clicking on the export button.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  )
}
