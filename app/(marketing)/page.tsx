import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons";
import { CurvesEffect } from "@/components/curves-effect";
import Image from "next/image";
import LightPreview from '@/public/preview/light.png';
import DarkPreview from '@/public/preview/dark.png';
import { tiers } from "@/config/tiers";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { siteConfig } from "@/config/site";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { templates } from "@/config/templates";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    name: '5 different chart types',
    description:
      'Choose from a variety of chart types to visualize your data. Line, bar, doughnut, pie and radar charts are available.',
    icon: Icons.barChart,
  },
  {
    name: 'Start from a template',
    description:
      'Customize your charts with a comprehensive and easy to use editor. Add your data, change colors, labels, shapes and more.',
    icon: Icons.template,
  },
  {
    name: 'Advanced editor',
    description:
      'Customize your charts with a comprehensive and easy to use editor. Add your data, change colors, labels, shapes and more.',
    icon: Icons.settings,
  },
  {
    name: 'Multiple export options',
    description:
      'Export your chart to PNG, JPEG, GIF, MP4 or even Chart.js configuration. Create a unique chart to share with your audience or on your website.',
    icon: Icons.media,
  },
];

export default async function IndexPage() {
  return (
    <>
      <section className="relative space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <CurvesEffect className="-bottom-20" />
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <div className="mb-4 flex flex-col gap-4">
            <p className="text-sm">👋 I&apos;m {siteConfig.author} and I #buildinpublic</p>
            <Link
              href={siteConfig.links.twitter}
              className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
              target="_blank"
            >
              Follow me on Twitter
            </Link>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Create, design and export awesome charts.
          </h1>
          <p className="max-w-[50rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            SublimeChart is the all-in-one editor to create awesome charts easily. <br />
            Customize and export them to your website or social media in seconds.
          </p>
          <div className="space-x-4">
            <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started - for free!
            </Link>
          </div>
          <p className="leading-normal text-muted-foreground sm:text-xs">
            Powered by <Link href="https://www.chartjs.org" className="font-semibold hover:underline" target="_blank" rel="nofollow">Chart.js</Link>
          </p>
        </div>
      </section>
      <section className="relative overflow-hidden pt-32">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="font-heading leading-7 text-foreground">You are <span className="text-primary">unique</span>. Your charts are, too.</h2>
          <p className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">Make it your <span className="text-primary">own</span>.</p>
          <p className="mx-auto mt-6 max-w-2xl leading-normal text-muted-foreground">
            Craft captivating charts effortlessly with our intuitive editor. Customize colors, labels, shapes and more to tell your data&apos;s story beautifully.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[90rem] px-6 lg:px-8">
          <Image
            src={LightPreview}
            width={2432}
            height={1442}
            alt="App screenshot"
            className="mb-[-12%] block rounded-xl shadow-2xl ring-1 ring-secondary dark:hidden"
          />
          <Image
            src={DarkPreview}
            width={2432}
            height={1442}
            alt="App screenshot"
            className="mb-[-12%] hidden rounded-xl shadow-2xl ring-1 ring-secondary dark:block"
          />
          <div className="relative" aria-hidden="true">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-background pt-[7%]" />
          </div>
        </div>
      </section>
      <section id="features" className="container mx-auto mt-14 flex max-w-[64rem] sm:mt-16 lg:mt-24">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <p className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">All you need for your <span className="text-primary">charts</span> is here.</p>
          <p className="mx-auto mt-6 leading-normal text-muted-foreground">
            SublimeChart offers many features to help you create the perfect chart. Stop wasting time configuring your chart; make it and use it.
          </p>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-muted-foreground sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="inline font-heading text-secondary-foreground">
                  <feature.icon className="absolute left-1 top-1 h-5 w-5 text-primary" aria-hidden="true" />
                  {feature.name}
                </dt>{' '}
                <dd className="inline">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section id="templates" className="mx-auto mt-14 flex w-full sm:mt-16 lg:mt-24">
        <div className="mx-auto w-full px-16 text-center">
          <div className="mx-auto max-w-[64rem]">
            <h2 className="font-heading leading-7 text-foreground">We&apos;ve done all the work for you.</h2>
            <p className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">Create a chart in a <span className="text-primary">click</span>.</p>
            <p className="mx-auto mt-6 max-w-7xl leading-normal text-muted-foreground">
              We&apos;ve created for you built-in templates, ready to use in just a click. Change the colors or the values in a second.
            </p>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="mx-auto mt-16 w-full"
          >
            <CarouselContent>
              { templates && templates.map((template) => (
                <CarouselItem key={template.slug} className="md:basis-1/2 lg:basis-1/3">
                  <Card>
                    <CardContent className="flex items-center justify-center rounded-md p-0">
                      <Image src={template.image} alt={`Chart template - ${template.name} (${template.config.type})`} className="w-full select-none rounded-t-md text-3xl font-semibold" width={1600} height={900} />
                    </CardContent>
                    <CardFooter className="flex justify-between p-3">
                      <span className="font-heading font-bold">{ template.name }</span>
                      <Badge className="capitalize">{ template.config.type }</Badge>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
      <section id="pricing" className="container mt-14 flex flex-col gap-6 md:mt-16 md:max-w-[64rem] lg:mt-24">
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
          <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
            <h2 className="font-heading font-semibold leading-7">SublimeChart Pricing</h2>
            <p className="mt-2 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Build <span className="text-primary">awesome</span> charts today.
            </p>
          </div>
          <p className="mx-auto mt-2 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
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
      <section id="faq" className="container mt-14 flex flex-col gap-6 md:mt-16 md:max-w-[64rem] lg:mt-24">
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
                Of course! You can export the Chart.js configuration by clicking on the export button.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      <section className="mx-auto py-24 sm:px-6 sm:py-32 md:max-w-[64rem] lg:px-8">
        <div className="relative isolate overflow-hidden bg-secondary-foreground px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <CurvesEffect className="bottom-3 left-0" lastCurveClassName="stroke-secondary" />
          <h2 className="mx-auto max-w-2xl font-heading text-3xl tracking-tight text-secondary sm:text-4xl">
            Say goodbye to <span className="text-primary">boring</span> charts. <p>Start creating <span className="text-primary">today</span>.</p>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-secondary">
            Give a try to SublimeChart and start creating beautiful charts today. No credit card required.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/register" className={buttonVariants({ size: "lg", variant: 'secondary' })}>
              Sign up for free
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
