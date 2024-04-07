import { LineChart } from "@/components/icons/LineChart";
import { BarChart } from "@/components/icons/BarChart";
import { DoughnutChart } from "@/components/icons/DoughnutChart";
import { PieChart } from "@/components/icons/PieChart";
import { RadarChart } from "@/components/icons/RadarChart";
import { Chart } from "@/types/chart";

export const charts: Array<Chart> = [
  {
    name: 'Line Chart',
    type: 'line',
    icon: LineChart,
    pro: false,
  },
  {
    name: 'Bar Chart',
    type: 'bar',
    icon: BarChart,
    pro: false,
  },
  {
    name: 'Doughnut Chart',
    type: 'doughnut',
    icon: DoughnutChart,
    pro: false,
  },
  {
    name: 'Pie Chart',
    type: 'pie',
    icon: PieChart,
    pro: true,
  },
  {
    name: 'Radar Chart',
    type: 'radar',
    icon: RadarChart,
    pro: true,
  },
]
