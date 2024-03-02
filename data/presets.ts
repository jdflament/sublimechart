export interface Preset {
  id: string
  name: string
  title: string
  config: {
    type: string
    data: {
      labels: string[]
      datasets: {
        label: string | null
        data: number[]
        borderColor: string
        backgroundColor: string
        borderWidth: number
      }[]
    }
  }
}

export const presets: Preset[] = [
  {
    id: "9cb0e66a-9937-465d-a188-2c4c4ae2401f",
    name: "Website traffic",
    title: "Website traffic",
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
          },
          {
            label: "Paid",
            data: [200, 300, 400, 500, 600, 700, 800],
            borderColor: "#e83636",
            backgroundColor: "#e85555",
            borderWidth: 1,
          },
        ],
      }
    }
  },
  {
    id: "61eb0e32-2391-4cd3-adc3-66efe09bc0b7",
    name: "Project MRR",
    title: "Project MRR (in dollar)",
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
          },
          {
            label: "2023",
            data: [810, 790, 1190, 1335, 1500, 1800, 2000, 2200, 2400, 2600, 2800, 3000],
            borderColor: "#6899ee",
            backgroundColor: "#83a7e5",
            borderWidth: 1,
          },
          {
            label: "2024",
            data: [3240, 3700],
            borderColor: "#3678e0",
            backgroundColor: "#5590e8",
            borderWidth: 1,
          },
        ]
      }
    }
  },
]
