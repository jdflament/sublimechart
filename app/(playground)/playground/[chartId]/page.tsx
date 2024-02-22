import { getCurrentUser } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Chart, User } from "@prisma/client";
import { db } from "@/lib/db";
import { Playground } from "@/components/playground";

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
      <Playground chart={chart} />
    </main>
  )
}
