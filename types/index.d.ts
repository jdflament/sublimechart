import { User } from "@prisma/client"
import type { Icon } from "lucide-react"

import { Icons } from "@/components/icons"
import {ChartConfigType, ChartDataType} from "@/types/chart";

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  author: string
  links: {
    twitter: string
    github: string
  }
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  features: string[]
  lemonSqueezyStoreId: string
  lemonSqueezyVariantId: string
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "lemonSqueezyCustomerId" | "lemonSqueezyLicenseKey" | "lemonSqueezyOrderId"> & {
    isPro: boolean
  }

export type Color = {
  value: string
  label: string
  color: string
}

export type Preset = {
  slug: string
  name: string|undefined
  config: {
    type?: string|undefined
    data: ChartDataType
  }
}

export type Template = {
  slug: string
  name: string|undefined
  image: string|undefined
  config: ChartConfigType
}

export type Tier = {
  name: string
  id: string
  price: string
  discount?: {
    price: string
    code: string
    limit: number
  }
  priceHelpText?: string
  description: string
  features: string[]
  featured: boolean
}

export type Animation = {
  label: string
  value: string
  key: string
  animation: any
}

export type Plugin = {
  name: string
  link: string
}
