import { db } from "@/lib/db"
import { setupLemonSqueezy } from "@/lib/lemonsqueezy";
import { activateLicenseKeySchema } from "@/lib/validations/lemonsqueezy"
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { activateLicense } from "@lemonsqueezy/lemonsqueezy.js";
import { proPlan } from "@/config/subscriptions";
import { siteConfig } from "@/config/site";
import { z } from "zod";

export async function POST(
  req: Request
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(null, {status: 403})
    }

    const body = await req.json()
    const payload = activateLicenseKeySchema.parse(body)

    if (!payload.licenseKey) {
      return new Response('You must pass a valid license key.', {status: 400});
    }

    setupLemonSqueezy();

    const response = await activateLicense(payload.licenseKey, `${siteConfig.name} ${proPlan.name}`);

    const meta = response.data?.meta;
    const licenseKey = response.data?.license_key;

    if (!licenseKey) {
      return new Response('Invalid license key.', { status: 400 });
    }

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        lemonSqueezyLicenseKey: licenseKey?.key,
        lemonSqueezyCustomerId: meta?.customer_id.toString(),
        lemonSqueezyOrderId: meta?.order_id.toString(),
      },
    })
    return new Response(null, { status: 200 })
  }  catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(error?.message || 'An error occurred.', { status: 400 })
  }
}
