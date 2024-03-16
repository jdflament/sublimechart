import { Template } from "@/types";

export const templates: Template[] = [
  {
    slug: 'project-mrr',
    name: 'Project MRR',
    image: '/templates/project-mrr.png',
    config: {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "12 last months",
            data: [
              135,
              155,
              210,
              180,
              250,
              325,
              350,
              380,
              480,
              680,
              890,
              1020
            ],
            backgroundColor: [
              "#f8fafc"
            ],
            borderColor: [
              "#f8fafc"
            ],
            borderWidth: 3,
            fill: false
          }
        ]
      },
      options: {
        plugins: {
          datalabels: {
            display: true,
            anchor: "end",
            align: "end",
            color: "#f8fafc",
            backgroundColor: "#818cf8",
            borderRadius: 5,
            font: {
              family: "'__Karla_432edd', '__Karla_Fallback_432edd'",
              size: 12
            }
          },
          background: {
            color: "linear-gradient(to right, #8B5CF6, #4F46E5)"
          },
          title: {
            display: true,
            text: "Project MRR ($)",
            font: {
              family: "'__Karla_432edd', '__Karla_Fallback_432edd'",
              size: 25
            },
            color: "#f1f5f9",
            align: "center",
            position: "top",
            padding: 0
          },
          legend: {
            labels: {
              color: "#f8fafc",
              font: {
                family: "'__Karla_432edd', '__Karla_Fallback_432edd'",
                size: 10
              },
              padding: 10
            },
            display: true,
            position: "top",
            align: "center"
          }
        },
        layout: {
          padding: 25
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
                family: "'__Karla_432edd', '__Karla_Fallback_432edd'"
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
                family: "'__Karla_432edd', '__Karla_Fallback_432edd'"
              }
            }
          }
        }
      }
    }
  },
  {
    slug: 'social-growth',
    name: 'Social growth',
    image: '/templates/social-growth.png',
    config: {
      type: "bar",
      data: {
        labels: [
          "LinkedIn",
          "YouTube",
          "X",
          "Reddit"
        ],
        datasets: [
          {
            label: "Campaign #1",
            data: [
              13,
              18,
              14,
              23
            ],
            backgroundColor: [
              "#fcd34d"
            ],
            borderColor: [
              "#f8fafc"
            ],
            borderWidth: 0,
            fill: false
          },
          {
            label: "Campaign #2",
            data: [
              23,
              30,
              11,
              40
            ],
            backgroundColor: [
              "#f43f5e"
            ],
            borderColor: [
              "#FFFFFF"
            ],
            borderWidth: 0,
            fill: false
          },
          {
            label: "Campaign #3",
            data: [
              32,
              21,
              19,
              37
            ],
            backgroundColor: [
              "#6d28d9"
            ],
            borderColor: [
              "#FFFFFF"
            ],
            borderWidth: 0,
            fill: false
          }
        ]
      },
      options: {
        plugins: {
          datalabels: {
            display: false,
            anchor: "end",
            align: "end",
            color: "#f8fafc",
            backgroundColor: "#818cf8",
            borderRadius: 5,
            font: {
              family: "'__Vollkorn_f79d75', '__Vollkorn_Fallback_f79d75'",
              size: 12
            }
          },
          background: {
            color: "#1e1b4b"
          },
          title: {
            display: true,
            text: "Social growth",
            font: {
              family: "'__Vollkorn_f79d75', '__Vollkorn_Fallback_f79d75'",
              size: 25
            },
            color: "#f1f5f9",
            align: "center",
            position: "top",
            padding: 0
          },
          legend: {
            labels: {
              color: "#f8fafc",
              font: {
                family: "'__Vollkorn_f79d75', '__Vollkorn_Fallback_f79d75'",
                size: 10
              },
              padding: 10
            },
            display: true,
            position: "top",
            align: "center"
          }
        },
        layout: {
          padding: 25
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
                family: "'__Vollkorn_f79d75', '__Vollkorn_Fallback_f79d75'"
              }
            },
            stacked: false
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
                family: "'__Vollkorn_f79d75', '__Vollkorn_Fallback_f79d75'"
              }
            }
          }
        },
      }
    }
  },
  {
    slug: 'customers-per-country',
    name: 'Customers per country',
    image: '/templates/customers-per-country.png',
    config: {
      type: "doughnut",
      data: {
        labels: [
          "United States",
          "India",
          "France",
          "Spain",
          "China",
          "Canada",
          "Germany",
          "Belgium"
        ],
        datasets: [
          {
            label: "Campaign #1",
            data: [
              25,
              20,
              15,
              12,
              10,
              8,
              6,
              4
            ],
            backgroundColor: [
              "#bfdbfe",
              "#a5f3fc",
              "#22d3ee",
              "#0ea5e9",
              "#60a5fa",
              "#3b82f6",
              "#2563eb",
              "#1d4ed8"
            ],
            borderColor: [
              "#1e40af",
              "#1e40af",
              "#1e40af",
              "#1e40af",
              "#1e40af",
              "#1e40af",
              "#1e40af",
              "#1e40af"
            ],
            borderWidth: 6,
            fill: false
          }
        ]
      },
      options: {
        plugins: {
          datalabels: {
            display: true,
            anchor: "center",
            align: "center",
            color: "#f8fafc",
            backgroundColor: "#1e40af",
            borderRadius: 10,
            font: {
              family: "'__Fira_Sans_2c3147', '__Fira_Sans_Fallback_2c3147'",
              size: 20
            }
          },
          background: {
            color: "#1e40af"
          },
          title: {
            display: true,
            text: "Customers per Country (%)",
            font: {
              family: "'__Fira_Sans_2c3147', '__Fira_Sans_Fallback_2c3147'",
              size: 20
            },
            color: "#f1f5f9",
            align: "start",
            position: "bottom",
            padding: 0
          },
          legend: {
            labels: {
              color: "#f8fafc",
              font: {
                family: "'__Fira_Sans_2c3147', '__Fira_Sans_Fallback_2c3147'",
                size: 13
              },
              padding: 10
            },
            display: true,
            position: "left",
            align: "start"
          }
        },
        layout: {
          padding: 34
        },
        scales: {
          r: {
            grid: {
              display: false,
              color: "rgba(0,0,0,0.1)"
            },
            ticks: {
              display: false,
              color: "#666"
            },
            pointLabels: {
              display: false,
              color: "#e11d48"
            },
            angleLines: {
              display: false
            }
          },
          x: {
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
            },
            stacked: false
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
            },
            stacked: false
          }
        }
      }
    }
  },
  {
    slug: 'quarterly-sales',
    name: 'Quarterly sales',
    image: '/templates/quarterly-sales.png',
    config: {
      type: "pie",
      data: {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [
          {
            label: "Quaterly sales",
            data: [17500, 18200, 14000, 21900],
            backgroundColor: [
              "#4f46e5",
              "#a78bfa",
              "#fb7185",
              "#fde68a"
            ],
            borderColor: [
              "#f8fafc",
              "#f8fafc",
              "#f8fafc",
              "#f8fafc"
            ],
            borderWidth: 6,
            fill: false
          }
        ],
      },
      options: {
        plugins: {
          datalabels: {
            display: true,
            anchor: "end",
            align: "center",
            color: "#f3f4f6",
            backgroundColor: "#1e3a8a",
            borderRadius: 16,
            font: {
              family: "'__Merriweather_331a76', '__Merriweather_Fallback_331a76'",
              size: 15
            }
          },
          background: {
            color: "#f8fafc"
          },
          title: {
            display: true,
            text: "Quarterly sales",
            font: {
              family: "'__Merriweather_331a76', '__Merriweather_Fallback_331a76'",
              size: 26
            },
            color: "#3730a3",
            align: "start",
            padding: 8
          },
          legend: {
            labels: {
              color: "#3730a3",
              font: {
                family: "'__Merriweather_331a76', '__Merriweather_Fallback_331a76'",
                size: 17
              },
              padding: 14
            },
            display: true,
            position: "right",
            align: "start"
          }
        },
        layout: {
          padding: 20
        },
        scales: {
          r: {
            grid: {
              display: false,
              color: "rgba(0,0,0,0.1)"
            },
            ticks: {
              display: false,
              color: "#666"
            },
            pointLabels: {},
            angleLines: {}
          },
          x: {
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
                family: "'__Merriweather_331a76', '__Merriweather_Fallback_331a76'"
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
                family: "'__Merriweather_331a76', '__Merriweather_Fallback_331a76'"
              }
            }
          }
        },
      }
    }
  },
  {
    slug: 'skills',
    name: 'Skills',
    image: '/templates/skills.png',
    config: {
      type: "radar",
      data: {
        labels: [
          "Javascript",
          "PHP",
          "SQL",
          "CSS",
          "Python"
        ],
        datasets: [
          {
            label: "Current",
            data: [
              13,
              18,
              14,
              13,
              9
            ],
            backgroundColor: [
              "#a7f3d0"
            ],
            borderColor: [
              "#f8fafc"
            ],
            borderWidth: 0,
            fill: true
          },
          {
            label: "Aim",
            data: [
              16,
              19,
              17,
              16,
              14
            ],
            backgroundColor: [
              "#0d9488"
            ],
            borderColor: [
              "#FFFFFF"
            ],
            borderWidth: 0,
            fill: true
          }
        ]
      },
      options: {
        plugins: {
          datalabels: {
            display: false,
            anchor: "end",
            align: "end",
            color: "#f8fafc",
            backgroundColor: "#818cf8",
            borderRadius: 5,
            font: {
              family: "'__Cabin_f6121f', '__Cabin_Fallback_f6121f'",
              size: 12
            }
          },
          background: {
            color: "#134e4a"
          },
          title: {
            display: true,
            text: "Skills",
            font: {
              family: "'__Cabin_f6121f', '__Cabin_Fallback_f6121f'",
              size: 40
            },
            color: "#f1f5f9",
            align: "start",
            position: "left",
            padding: 0
          },
          legend: {
            labels: {
              color: "#f8fafc",
              font: {
                family: "'__Cabin_f6121f', '__Cabin_Fallback_f6121f'",
                size: 15
              },
              padding: 0
            },
            display: true,
            position: "left",
            align: "end"
          }
        },
        layout: {
          padding: 25
        },
        scales: {
          r: {
            grid: {
              display: true,
              color: "#0d9488"
            },
            ticks: {
              display: false,
              color: "#666"
            },
            pointLabels: {
              display: true,
              color: "#f8fafc"
            },
            angleLines: {
              display: false
            }
          },
          x: {
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
                family: "'__Cabin_f6121f', '__Cabin_Fallback_f6121f'"
              }
            },
            stacked: false
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
                family: "'__Cabin_f6121f', '__Cabin_Fallback_f6121f'"
              }
            }
          }
        },
      }
    }
  },
]
