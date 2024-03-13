import * as z from "zod";
import { chartPatchSchema } from "@/lib/validations/chart";

export type ChartDataType = {
  labels: string[];
  datasets?: {
    label: string | null;
    data: number[];
    borderColor?: string[];
    backgroundColor?: string[];
    borderWidth?: number;
    fill?: boolean | undefined;
  }[];
}

export type ChartOptionsType = {
  plugins?: {
    datalabels?: {
      display?: boolean|undefined;
      anchor?: string|undefined;
      align?: string|undefined;
      color?: string|undefined;
      backgroundColor?: string|undefined;
      borderRadius?: number|undefined;
      font?: {
        family?: string|undefined;
        size?: number|undefined;
      },
    },
    legend?: {
      labels?: {
        color?: string|undefined;
        font?: {
          family?: string|undefined;
          size?: number|undefined;
        },
        padding?: number|undefined;
      },
      display?: boolean | undefined;
      position?: string | undefined;
      align?: string | undefined;
    },
    title?: {
      display?: boolean;
      text?: string;
      font?: {
        family?: string | undefined;
        size?: number | undefined;
      },
      align?: string | undefined;
      color?: string | undefined;
      position?: string | undefined;
      padding?: number | undefined;
    }
    background?: {
      color?: string | undefined;
    },
  },
  layout?: {
    padding?: number | undefined;
  },
  datasets?: {
    bar?: {
      backgroundColor?: string | undefined;
      borderColor?: string | undefined;
      borderWidth?: number | undefined;
      fill?: boolean | undefined;
    },
  },
  scales?: {
    r?: {
      grid?: {
        display?: boolean | undefined;
        color?: string | undefined;
      },
      ticks?: {
        display?: boolean | undefined;
        color?: string | undefined;
        font?: {
          family?: string | undefined;
        }
      },
      pointLabels?: {
        display?: boolean | undefined;
        color?: string | undefined;
      },
      angleLines?: {
        display?: boolean | undefined;
      }
    }
    x?: {
      border?: {
        display?: boolean | undefined;
        color?: string | undefined;
      }
      grid?: {
        display?: boolean | undefined;
        color?: string | undefined;
      },
      ticks?: {
        display?: boolean | undefined;
        color?: string | undefined;
        font?: {
          family?: string | undefined;
        }
      }
      stacked?: boolean | undefined;
    },
    y?: {
      border?: {
        display?: boolean | undefined;
        color?: string | undefined;
      }
      grid?: {
        display?: boolean | undefined;
        color?: string | undefined;
      },
      ticks?: {
        display?: boolean | undefined;
        color?: string | undefined;
        font?: {
          family?: string | undefined;
        }
      }
      stacked?: boolean | undefined;
    },
  },
  watermark?: {
    image?: string | undefined;
    x?: number | undefined;
    y?: number | undefined;
    alignX?: string | undefined;
    alignY?: string | undefined;
    opacity?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
    position?: string | undefined;
    alignToChartArea?: boolean | undefined;
  }
}

declare global {
  namespace PrismaJson {
    type ChartConfigType = {
      type: string;
      data: ChartDataType,
      options: ChartOptionsType,
    }
  }
}

export type ChartPatchFormData = z.infer<typeof chartPatchSchema>

export type ChartConfigType = PrismaJson.ChartConfigType
