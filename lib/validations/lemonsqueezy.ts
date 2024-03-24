import * as z from "zod"

export const activateLicenseKeySchema = z.object({
  licenseKey: z.string().optional(),
})
