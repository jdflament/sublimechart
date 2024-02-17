import {MainNav} from "@/components/main-nav";
import {dashboardConfig} from "@/config/dashboard";
import {UserAccountNav} from "@/components/user-account-nav";
import {getCurrentUser} from "@/lib/session";
import {notFound, redirect} from "next/navigation";
import {authOptions} from "@/lib/auth";
import {ModeToggle} from "@/components/mode-toggle";
import * as React from "react";

interface EditorProps {
  children?: React.ReactNode
}

export default async function PlaygroundLayout({ children }: EditorProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <nav className="flex items-center justify-center gap-3">
            <ModeToggle />
            <UserAccountNav
              user={{
                name: user.name ? user.name : user.email,
                image: user.image,
                email: user.email,
              }}
            />
          </nav>
        </div>
      </header>
      <div className="container mx-auto grid items-start gap-10">
        {children}
      </div>
    </div>
  )
}
