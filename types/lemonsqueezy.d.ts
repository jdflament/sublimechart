import * as z from "zod";
import { activateLicenseKeySchema } from "@/lib/validations/lemonsqueezy";

export type ActivateLicenseKeyFormData = z.infer<typeof activateLicenseKeySchema>
