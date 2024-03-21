import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Tailwind,
  Section,
} from '@react-email/components';

type SignInEmailTemplateProps = {
  email: string;
  actionUrl: string;
}

export const SignInEmailTemplate = ({ email, actionUrl }: SignInEmailTemplateProps) => {
  const previewText = `Welcome to SublimeChart, ${email}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto bg-white font-sans">
          <Container className="mx-auto my-10 w-[465px] p-5">
            <Heading className="mx-0 my-8 p-0 text-center font-heading text-2xl">
              Welcome back!
            </Heading>
            <Text className="text-sm">Hello {email},</Text>
            <Text className="text-sm">
              Here is your sign-in link for SublimeChart.
              Happy charting!
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded bg-[#FACC14] px-10 py-3 text-center font-semibold text-[#0D0A09] no-underline"
                href={actionUrl}
              >
                Log in
              </Button>
            </Section>
            <Text className="text-sm">
              Cheers,
              <br />
              The SublimeChart Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
