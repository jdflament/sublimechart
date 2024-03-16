import { Preset } from "@/types";

export const presets: Preset[] = [
  {
    slug: "months",
    name: "Months",
    config: {
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      },
    },
  },
  {
    slug: "website-traffic",
    name: "Website traffic",
    config: {
      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Organic",
            data: [100, 200, 300, 400, 500, 600, 700],
            backgroundColor: [],
            borderColor: [],
          },
          {
            label: "Paid",
            data: [200, 300, 400, 500, 600, 700, 800],
            backgroundColor: [],
            borderColor: [],
          },
        ],
      },
    },
  },
  {
    slug: "project-mrr",
    name: "Project MRR",
    config: {
      type: 'bar',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
          {
            label: "2022",
            data: [0, 0, 120, 140, 250, 225, 300, 400, 500, 600, 700, 800],
            backgroundColor: [],
            borderColor: [],
          },
          {
            label: "2023",
            data: [810, 790, 1190, 1335, 1500, 1800, 2000, 2200, 2400, 2600, 2800, 3000],
            backgroundColor: [],
            borderColor: [],
          },
          {
            label: "2024",
            data: [3240, 3700],
            backgroundColor: [],
            borderColor: [],
          },
        ]
      },
    },
  },
]
