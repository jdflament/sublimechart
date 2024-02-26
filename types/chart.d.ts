import * as z from "zod";
import { chartPatchSchema } from "@/lib/validations/chart";

declare global {
  namespace PrismaJson {
    type ChartConfigType = {
      type: string;
      data: {
        labels: string[];
        datasets: {
          label: string | null;
          data: number[];
          borderColor: string;
          backgroundColor: string;
          borderWidth: number;
        }[];
      }
    }
  }
}

export type ChartPatchFormData = z.infer<typeof chartPatchSchema>
