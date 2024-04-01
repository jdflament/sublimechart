import * as React from "react"

import { cn } from "@/lib/utils"
import Image from "next/image";
import Link from "next/link";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Image src="/logo.png" alt="Logo" className="h-8 w-8" width={32} height={32} />
          <p className="text-center text-sm leading-loose md:text-left">
            © Copyright 2024. All rights reserved.
          </p>
        </div>
        <nav className="flex gap-4">
          <Link href="/terms" className="text-sm hover:underline">Terms</Link>
          <Link href="/privacy" className="text-sm hover:underline">Privacy</Link>
        </nav>
      </div>
    </footer>
  )
}
