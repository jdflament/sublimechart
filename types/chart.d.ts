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
          fill: boolean | undefined;
        }[];
      },
      options: {
        plugins?: {
          datalabels?: {
            display?: boolean|undefined;
            anchor?: string|undefined;
            align?: string|undefined;
            color?: string|undefined;
            backgroundColor?: string|undefined;
            borderRadius?: number|undefined;
            font?: {
              size?: number|undefined;
            },
          },
          legend?: {
            display?: boolean | undefined;
          },
          title: {
            display: boolean;
            text: string;
          }
          background?: {
            color?: string | {
              gradient?: {
                offset: number | undefined;
                color: string | undefined;
              }[];
              direction?: 'vertical' | 'horizontal';
            };
          }
        },
        layout?: {
          padding?: number | undefined;
        },
        scales?: {
          r?: {
            grid?: {
              display?: boolean | undefined;
            },
            ticks?: {
              display?: boolean | undefined;
            }
          }
          x?: {
            border?: {
              display?: boolean | undefined;
            }
            grid?: {
              display?: boolean | undefined;
            },
            ticks?: {
              display?: boolean | undefined;
            }
            stacked?: boolean | undefined;
          },
          y?: {
            border?: {
              display?: boolean | undefined;
            }
            grid?: {
              display?: boolean | undefined;
            },
            ticks?: {
              display?: boolean | undefined;
            }
            stacked?: boolean | undefined;
          },
        }
      },
    }
  }
}

export type ChartPatchFormData = z.infer<typeof chartPatchSchema>

export type ChartConfigType = PrismaJson.ChartConfigType
