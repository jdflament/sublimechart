import { Chart } from "@/types/chart";

export function ChartIcon({ icon: Icon }: { icon: Chart['icon'] }) {
  return (
    <Icon className="h-6 w-6" />
  )
}
