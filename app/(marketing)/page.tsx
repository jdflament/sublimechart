import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons";

export default async function IndexPage() {
  return (
    <>
      <section className="relative space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="lines hidden md:block">
          <svg width="100%" viewBox="0 0 745.88685 88.700434" id="svg3362" version="1.1">
          <defs id="defs3364"/>
          <g id="layer1" transform="translate(0.35777846,-262.17068)">
            <path style={{
              fill: 'none',
              fillRule: 'evenodd',
              stroke: '#000000',
              strokeWidth: '1.5px',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeOpacity: 1
            }} d="M -0.22423031,268.46083 C 166.75045,222.31585 447.20677,473.98235 745.24443,268.46083" id="path3384"/>
          </g>
        </svg>
        <svg width="100%" viewBox="0 0 685.88685 123.700434" id="svg3362" version="1.1">
          <defs id="defs3364"/>
          <g id="layer1" transform="translate(0.25777846,-242.17068)">
            <path style={{
              fill: 'none',
              fillRule: 'evenodd',
              stroke: '#000000',
              strokeWidth: '2.7px',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeOpacity: 1
            }} d="M -0.22423031,268.46083 C 166.75045,222.31585 447.20677,473.98235 745.24443,268.46083" id="path3384"/>
          </g>
        </svg>
        <svg width="100%" viewBox="0 0 754.94473 93.855249" id="svg3350" version="1.1">
          <defs id="defs3352"/>
          <g id="layer1" transform="translate(1.7580844,-434.006)">
            <path style={{
              fill: 'none',
              fillRule: 'evenodd',
              stroke: '#000000',
              strokeWidth: '0.3px',
              strokeLinecap: 'round',
              strokeLinejoin: 'miter',
              strokeOpacity: 1
            }}
              d="M 752.86109,480.7659 C 638.87925,578.55455 579.84882,491.94626 399.49271,492.88773 263.8489,504.35649 85.845895,554.95289 -1.35284,434.29888"
              id="path3358"/>
          </g>
        </svg>
      </div>
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Create, design and export awesome charts.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Start building beautiful charts with ease. <br />
            Customize and export them to your website, social media and more.
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started - for free!
            </Link>
          </div>
        </div>
      </section>
      <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Simple, transparent pricing
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Unlock all features including unlimited posts for your blog.
          </p>
        </div>
        <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
          <div className="grid gap-6">
            <h3 className="text-xl font-bold sm:text-2xl">
              What&apos;s included in the PRO plan
            </h3>
            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Unlimited Posts
              </li>
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Unlimited Users
              </li>

              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Custom domain
              </li>
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Dashboard Analytics
              </li>
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Access to Discord
              </li>
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Premium Support
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <div>
              <h4 className="text-7xl font-bold">$19</h4>
              <p className="text-sm font-medium text-muted-foreground">
                Billed Monthly
              </p>
            </div>
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
