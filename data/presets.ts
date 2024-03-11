import { ChartConfigType } from "@/types/chart";

export interface Preset {
  slug: string
  name: string|undefined
  aspectRatio: string
  config: ChartConfigType
  watermark: boolean
}

export const presets: Preset[] = [
  {
    slug: "website-traffic",
    name: "Website traffic",
    aspectRatio: "16/9",
    config: {
      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Organic",
            data: [100, 200, 300, 400, 500, 600, 700],
            borderColor: "#3678e0",
            backgroundColor: "#5590e8",
            borderWidth: 1,
            fill: false,
          },
          {
            label: "Paid",
            data: [200, 300, 400, 500, 600, 700, 800],
            borderColor: "#e83636",
            backgroundColor: "#e85555",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
          },
          title: {
            display: true,
            text: "Website traffic",
          },
        },
        layout: {
          padding: 20,
        },
        scales: {
          x: {
            grid: {
              display: true,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        }
      }
    },
    watermark: true,
  },
  {
    slug: "project-mrr",
    name: "Project MRR",
    aspectRatio: "4/3",
    config: {
      type: 'bar',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
          {
            label: "2022",
            data: [0, 0, 120, 140, 250, 225, 300, 400, 500, 600, 700, 800],
            borderColor: "#97baf6",
            backgroundColor: "#b3cfff",
            borderWidth: 1,
            fill: false,
          },
          {
            label: "2023",
            data: [810, 790, 1190, 1335, 1500, 1800, 2000, 2200, 2400, 2600, 2800, 3000],
            borderColor: "#6899ee",
            backgroundColor: "#83a7e5",
            borderWidth: 1,
            fill: false,
          },
          {
            label: "2024",
            data: [3240, 3700],
            borderColor: "#3678e0",
            backgroundColor: "#5590e8",
            borderWidth: 1,
            fill: false,
          },
        ]
      },
      options: {
        plugins: {
          legend: {
            display: true,
          },
          title: {
            display: true,
            text: "Project MRR (in dollar)",
          },
        },
        layout: {
          padding: 20,
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        }
      }
    },
    watermark: true,
  },
]
