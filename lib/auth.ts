import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { Client } from "postmark"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { db } from "@/lib/db"

const postmarkClient = new Client(env.POSTMARK_API_TOKEN);

// Configuration for MailDev
const maildevConfig = {
  server: {
    host: '0.0.0.0',
    port: 1025,
  },
  secure: false,
};

// Configuration for real email provider (Postmark)
const emailProviderConfig = {
  from: env.SMTP_FROM,
  sendVerificationRequest: async ({ identifier, url, provider }) => {
    const user = await db.user.findUnique({
      where: {
        email: identifier,
      },
      select: {
        emailVerified: true,
      },
    });

    const templateId = user?.emailVerified
      ? env.POSTMARK_SIGN_IN_TEMPLATE
      : env.POSTMARK_ACTIVATION_TEMPLATE;
    if (!templateId) {
      throw new Error("Missing template id");
    }

    const result = await postmarkClient.sendEmailWithTemplate({
      TemplateId: parseInt(templateId),
      To: identifier,
      From: provider.from as string,
      TemplateModel: {
        action_url: url,
        product_name: siteConfig.name,
      },
      Headers: [
        {
          Name: "X-Entity-Ref-ID",
          Value: new Date().getTime() + "",
        },
      ],
    });

    if (result.ErrorCode) {
      throw new Error(result.Message);
    }
  },
};

// Choose email provider based on the environment
// @ts-ignore
const emailProvider = process.env.NODE_ENV === 'development' ? EmailProvider(maildevConfig) : EmailProvider(emailProviderConfig);

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
