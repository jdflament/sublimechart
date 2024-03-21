import { Resend } from 'resend';
import { SendVerificationRequestParams } from 'next-auth/providers';
import { db } from "@/lib/db";
import { SignInEmailTemplate } from "@/components/emails/sign-in-email-template";
import { ActivationEmailTemplate } from "@/components/emails/activation-email-template";

export const sendVerificationRequest = async ({ identifier, provider, url }: SendVerificationRequestParams) => {
  const user = await db.user.findUnique({
    where: {
      email: identifier,
    },
    select: {
      emailVerified: true,
    },
  });

  const resend = new Resend( process.env.RESEND_API_KEY );
  const subject = user?.emailVerified ? 'Sign in to your account' : 'Activate your account';

  const EmailTemplate = user?.emailVerified
    ? SignInEmailTemplate
    : ActivationEmailTemplate;

  try {
    await resend.emails.send({
      from: provider.from as string,
      to: identifier,
      subject,
      react: EmailTemplate({
        email: identifier,
        actionUrl: url,
      }),
    });
  } catch (error) {
    throw new Error(error);
  }
};
