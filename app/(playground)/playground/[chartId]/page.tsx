import { getCurrentUser } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Chart, User } from "@prisma/client";
import { db } from "@/lib/db";
import { ChartSelector } from "@/components/chart-selector";

async function getChartForUser(chartId: Chart["id"], userId: User["id"]) {
  return await db.chart.findFirst({
    where: {
      id: chartId,
      authorId: userId,
    },
  })
}

interface PlaygroundPageProps {
  params: { chartId: string }
}

export default async function PlaygroundPage({ params }: PlaygroundPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const chart = await getChartForUser(params.chartId, user.id)

  if (!chart) {
    notFound()
  }

  return (
    <main className="mx-auto w-full max-w-7xl">
      <div className="mx-auto mb-6 text-center">
        <ChartSelector chart={chart} />
      </div>
      <div className="grow lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div className="border-b border-gray-200 px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6">
            Themes
          </div>

          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            Chart
          </div>
        </div>

        <div className="shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
            Data
        </div>
      </div>
    </main>
  )
}
