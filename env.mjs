import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    // This is optional because it's only used in development.
    // See https://next-auth.js.org/deployment.
    NODE_ENV: z.string().min(1),
    NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.string().min(1),
    POSTGRES_PRISMA_URL: z.string().min(1),
    EMAIL_FROM: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    LEMONSQUEEZY_API_KEY: z.string().min(1),
    LEMONSQUEEZY_STORE_ID: z.string().min(1),
    LEMONSQUEEZY_VARIANT_ID: z.string().min(1),
    LEMONSQUEEZY_WEBHOOK_SECRET: z.string().min(1),
    SLACK_WEBHOOK_URL: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    EMAIL_FROM: process.env.EMAIL_FROM,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    LEMONSQUEEZY_API_KEY: process.env.LEMONSQUEEZY_API_KEY,
    LEMONSQUEEZY_STORE_ID: process.env.LEMONSQUEEZY_STORE_ID,
    LEMONSQUEEZY_VARIANT_ID: process.env.LEMONSQUEEZY_VARIANT_ID,
    LEMONSQUEEZY_WEBHOOK_SECRET: process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});
