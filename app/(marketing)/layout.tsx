import Link from "next/link"

import { UserAccountNav } from "@/components/user-account-nav"
import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { getCurrentUser } from "@/lib/session"
import { ModeToggle } from "@/components/mode-toggle";


interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {

  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-16 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav className="flex items-center justify-center gap-3">
            <ModeToggle />
            {
              user
                ?
                <UserAccountNav
                  user={{
                    name: user.name ? user.name : user.email,
                    image: user.image,
                    email: user.email,
                  }}
                />
                :
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "px-4"
                  )}
                >
                  Sign up for free
                </Link>
            }
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
