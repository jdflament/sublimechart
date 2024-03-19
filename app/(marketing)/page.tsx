import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons";
import { CurvesEffect } from "@/components/curves-effect";
import Image from "next/image";
import LightPreview from '@/public/preview/light.png';
import DarkPreview from '@/public/preview/dark.png';

const features = [
  {
    name: 'Unlimited inboxes',
    description:
      'Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.',
    icon: Icons.media,
  },
  {
    name: 'Manage team members',
    description:
      'Vero eum voluptatem aliquid nostrum voluptatem. Vitae esse natus. Earum nihil deserunt eos quasi cupiditate. A inventore et molestiae natus.',
    icon: Icons.clapperboard,
  },
  {
    name: 'Spam report',
    description:
      'Et quod quaerat dolorem quaerat architecto aliquam accusantium. Ex adipisci et doloremque autem quia quam. Quis eos molestiae at iure impedit.',
    icon: Icons.sun,
  },
];

const tiers = [
  {
    name: 'Free',
    id: 'tier-free',
    href: '#',
    priceMonthly: '$0',
    description: "Give a try to SublimeChart with our free tier.",
    features: ['Line, Bar and Doughnut charts', 'Up to 3 charts saved', 'Basic editor options', 'PNG and Chart.js config export'],
    featured: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '#',
    priceMonthly: '$69',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'All chart types',
      'Unlimited charts saved',
      'Animated charts with video export',
      'Predefined templates',
      'All editor options',
      'No watermark',
    ],
    featured: true,
  },
]

export default async function IndexPage() {
  return (
    <>
      <section className="relative space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <CurvesEffect className="top-48 md:top-36 lg:top-44" />
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Create, design and export awesome charts.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Start building beautiful charts with ease. <br />
            Customize and export them to your website, social media and more.
          </p>
          <div className="space-x-4">
            <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started - for free!
            </Link>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden pt-32">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="font-heading font-semibold leading-7 text-foreground">You are <span className="text-primary">unique</span>. You&apos;re chart too.</h2>
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
      <div className="container mx-auto mt-16 flex max-w-[64rem] sm:mt-20 lg:mt-24">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col">
              <dt className="text-base font-semibold leading-7">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-1 flex flex-auto flex-col leading-7 text-muted-foreground">
                <p className="flex-auto">{feature.description}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
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
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
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
                {tier.priceMonthly}
              </span>
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
                <Link href={tier.href} aria-describedby={tier.id} className={cn(buttonVariants({ size: "lg", variant: tier.featured ? 'default' : 'outline' }), 'mt-4 w-full')}>
                  Sign up for free
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
