import crypto from "crypto";
import { env } from "@/env.mjs";
import { db } from "@/lib/db";
import { slackMessage } from "@/lib/slack";

export async function POST(req: Request) {
  try {
    const text = await req.text();
    const hmac = crypto.createHmac("sha256", env.LEMONSQUEEZY_WEBHOOK_SECRET);
    const digest = Buffer.from(hmac.update(text).digest("hex"), "utf8");
    const signature = Buffer.from(req.headers.get("x-signature") as string, "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      return new Response("Invalid signature.", {
        status: 400,
      });
    }

    const payload = JSON.parse(text);

    const {
      meta: { event_name: eventName },
      data,
    } = payload;

    switch (eventName) {
      case "order_created":
        let message = `💰 LEMON SQUEEZY - New sale of SublimeChart ! 💰  ${data.attributes.subtotal_formatted}`;

        if (data?.attributes?.discount_total) {
          message += ` (- ${data.attributes.discount_total_formatted} discount)`;
        }

        await slackMessage(message);
        break;
      case "order_refunded":
      case "license_key_updated":
        const customerId = data?.attributes?.customer_id;
        const isActiveLicenseKey = data?.attributes?.status === "active";

        if (customerId && !isActiveLicenseKey) {
          await db.user.update({
            where: {
              lemonSqueezyCustomerId: customerId.toString(),
            },
            data: {
              lemonSqueezyCustomerId: null,
              lemonSqueezyLicenseKey: null,
              lemonSqueezyOrderId: null,
            },
          })
        }
        break;
    }
  } catch (error) {
    if (error) {
      return new Response(`Webhook error: ${error.message}`, {
        status: 400,
      });
    }

    return new Response("Webhook error", {
      status: 400,
    });
  }

  return new Response(null, {
    status: 200,
  });
}
