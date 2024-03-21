import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"

import { env } from "@/env.mjs"
import { db } from "@/lib/db"

import { sendVerificationRequest } from '@/lib/resend';

// Configuration for MailDev
const maildevConfig = {
  server: {
    host: '0.0.0.0',
    port: 1025,
  },
  secure: false,
};

const resendConfig = {
  from: env.EMAIL_FROM,
  sendVerificationRequest,
};

const emailProvider = process.env.NODE_ENV === 'development' ? EmailProvider(maildevConfig) : EmailProvider(resendConfig);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    emailProvider,
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name ? token.name : token.email
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name ? dbUser.name : dbUser.email,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
}
