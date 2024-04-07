import * as z from "zod";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const routeContextSchema = z.object({
  params: z.object({
    chartId: z.string(),
  }),
})

export async function POST(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    if (!(await verifyCurrentUserHasAccessToChart(params.chartId))) {
      return new Response(null, { status: 403 })
    }

    // Retrieve the chart data from the database
    const chart = await db.chart.findUnique({
      where: {
        id: params.chartId,
      },
    })

    if (!chart) {
      return new Response(null, { status: 404 })
    }

    const newChart = await db.chart.create({
      data: {
        aspectRatio: chart.aspectRatio,
        watermark: chart.watermark,
        authorId: chart.authorId,
        // @ts-ignore
        config: {
          ...chart.config,
          options: {
            ...chart.config?.options,
            plugins: {
              ...chart.config?.options?.plugins,
              title: {
                ...chart.config?.options?.plugins?.title,
                text: `${chart.config?.options?.plugins?.title?.text} (copy)`,
              }
            }
          }
        }
      },
      select: {
        id: true,
      },
    });

    return new Response(JSON.stringify(newChart))
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToChart(chartId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.chart.count({
    where: {
      id: chartId,
      authorId: session?.user.id,
    },
  })

  return count > 0
}
