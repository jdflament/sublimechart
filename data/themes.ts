import { ChartOptionsType } from "@/types/chart";

export interface Theme {
  slug: string
  name: string|undefined
  image: string|undefined
  datasets?: {
    borderColor?: string[];
    backgroundColor?: string[]
    borderWidth?: number | undefined;
    fill?: boolean | undefined;
  }
  config: {
    type: string
    options: ChartOptionsType
  }
}

export const themes: Theme[] = [
  {
    slug: "peps",
    name: "Pep's",
    image: "/themes/peps.png",
    datasets: {
      borderColor: ["#FFFFFF"],
      backgroundColor: ["#FFFFFF"],
      borderWidth: 1,
      fill: false
    },
    config: {
      type: "bar",
      options: {
        plugins: {
          datalabels: {
            display: false,
          },
          background: {
            color: "linear-gradient(to right, #9333EA, #F472B6)",
          },
          title: {
            display: true,
            text: "Project MRR (in dollar)",
            font: {
              family: "'__Cabin_f6121f', '__Cabin_Fallback_f6121f'",
              size: 20
            },
            color: "#f8fafc",
            align: "center",
            position: "top",
            padding: 10
          },
          legend: {
            labels: {
              color: "#f8fafc",
              font: {
                family: "'__Cabin_f6121f', '__Cabin_Fallback_f6121f'"
              }
            },
            display: true
          }
        },
        layout: {
          padding: 20
        },
        scales: {
          x: {
            border: {
              display: true,
              color: "#f8fafc"
            },
            grid: {
              display: false,
              color: "rgba(0,0,0,0.1)"
            },
            ticks: {
              display: true,
              color: "#f8fafc",
              font: {
                family: "'__Cabin_f6121f', '__Cabin_Fallback_f6121f'"
              }
            }
          },
          y: {
            border: {
              display: true,
              color: "#f8fafc"
            },
            grid: {
              display: false,
              color: "rgba(0,0,0,0.1)"
            },
            ticks: {
              display: true,
              color: "#f8fafc",
              font: {
                family: "'__Cabin_f6121f', '__Cabin_Fallback_f6121f'"
              }
            }
          }
        },
      }
    }
  },
  {
    slug: "mars",
    name: "Mars",
    image: "/themes/mars.png",
    datasets: {
      backgroundColor: ["#fef9c3"],
      borderColor: ["#fef9c3"],
      borderWidth: 1,
      fill: false
    },
    config: {
      type: "line",
      options: {
        plugins: {
          datalabels: {
            display: true,
            anchor: "center",
            align: "center",
            color: "#f8fafc",
            backgroundColor: "#10374e",
            borderRadius: 11,
            font: {
              family: "'__Fira_Sans_2c3147', '__Fira_Sans_Fallback_2c3147'",
              size: 13
            }
          },
          background: {
            color: "linear-gradient(to bottom right, #144462, #010101)"
          },
          title: {
            display: true,
            text: "Project MRR (in dollar)",
            font: {
              family: "'__Fira_Sans_2c3147', '__Fira_Sans_Fallback_2c3147'",
              size: 26
            },
            color: "#f1f5f9",
            align: "start",
            position: "top",
            padding: 24
          },
          legend: {
            labels: {
              color: "#f8fafc",
              font: {
                family: "'__Fira_Sans_2c3147', '__Fira_Sans_Fallback_2c3147'"
              }
            },
            display: false
          }
        },
        layout: {
          padding: 15
        },
        scales: {
          x: {
            border: {
              display: true,
              color: "#f8fafc"
            },
            grid: {
              display: false,
              color: "rgba(0,0,0,0.1)"
            },
            ticks: {
              display: true,
              color: "#f8fafc",
              font: {
                family: "'__Fira_Sans_2c3147', '__Fira_Sans_Fallback_2c3147'"
              }
            }
          },
          y: {
            border: {
              display: false,
              color: "#f8fafc"
            },
            grid: {
              display: false,
              color: "rgba(0,0,0,0.1)"
            },
            ticks: {
              display: false,
              color: "#f8fafc",
              font: {
                family: "'__Fira_Sans_2c3147', '__Fira_Sans_Fallback_2c3147'"
              }
            }
          }
        },
      }
    }
  }
]
