import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";
import { env } from "@/env.mjs"

export async function slackMessage(text: string) {
  return fetch(env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });
}
