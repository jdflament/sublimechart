import * as z from "zod"

const aspectRatio = z.enum(['1/1', '2/3', '3/2', '4/3', '4/5', '16/9', '9/16'], {
  required_error: 'Please select an aspect ratio.',
});

const type = z.enum(['bar', 'line', 'pie', 'radar', 'doughnut'], {
  required_error: "Please select a type.",
});

const data = z.object({
  labels: z.string().array().min(1),
  datasets: z.array(z.object({
    label: z.string().optional(),
    data: z.array(z.number().nullish()).optional(),
    backgroundColor: z.string().array().optional(),
    borderColor: z.array(z.string().nullish()).optional(),
    borderWidth: z.number().optional(),
    borderRadius: z.number().optional(),
    tension: z.number().optional(),
    pointRadius: z.number().optional(),
    fill: z.boolean().optional().default(false),
  })).optional(),
});

const axis = z.object({
  border: z.object({
    display: z.boolean().optional(),
    color: z.string().optional(),
  }).optional(),
  grid: z.object({
    display: z.boolean().optional(),
    color: z.string().optional(),
  }).optional(),
  ticks: z.object({
    display: z.boolean().optional(),
    color: z.string().optional(),
    font: z.object({
      family: z.string().optional(),
    }).optional(),
  }).optional(),
  stacked: z.boolean().optional(),
}).optional();

const animation = z.record(
  z.string().optional(),
  z.object({
    duration: z.number().optional(),
    easing: z.string().optional(),
    from: z.number().optional(),
    to: z.number().optional(),
    loop: z.boolean().optional(),
    delay: z.number().optional(),
    render: z.function().optional()
  }).optional()
).optional();

const options = z.object({
  plugins: z.object({
    datalabels: z.object({
      display: z.boolean().optional(),
      anchor: z.enum(['start', 'center', 'end']).default('end').optional(),
      align: z.enum(['start', 'center', 'end', 'top', 'left', 'right', 'bottom']).default('top').optional(),
      color: z.string().default('#000000').optional(),
      backgroundColor: z.string().optional(),
      borderRadius: z.number().optional(),
      font: z.object({
        family: z.string().optional(),
        size: z.number().optional(),
      }).optional(),
    }).optional(),
    background: z.object({
      color: z.string().optional(),
    }).optional(),
    title: z.object({
      display: z.boolean(),
      text: z.string(),
      font: z.object({
        family: z.string().optional(),
        size: z.number().optional(),
      }).optional(),
      color: z.string().optional(),
      align: z.enum(['start', 'center', 'end']).optional(),
      position: z.enum(['top', 'left', 'right', 'bottom']).optional(),
      padding: z.number().optional(),
    }).optional(),
    subtitle: z.object({
      display: z.boolean().optional(),
      text: z.string().optional(),
      font: z.object({
        family: z.string().optional(),
        size: z.number().optional(),
      }).optional(),
      color: z.string().optional(),
      align: z.enum(['start', 'center', 'end']).optional(),
      position: z.enum(['top', 'left', 'right', 'bottom']).optional(),
      padding: z.number().optional(),
    }).optional(),
    legend: z.object({
      labels: z.object({
        color: z.string().optional(),
        font: z.object({
          family: z.string().optional(),
          size: z.number().optional(),
        }).optional(),
        padding: z.number().optional(),
      }).optional(),
      display: z.boolean().optional(),
      position: z.enum(['top', 'left', 'right', 'bottom']).optional(),
      align: z.enum(['start', 'center', 'end']).optional(),
    }).optional(),
  }).optional(),
  animations: z.object({
    animation,
  }).or(z.boolean()).optional(),
  layout: z.object({
    padding: z.number().optional(),
  }).optional(),
  scales: z.object({
    r: z.object({
      grid: z.object({
        display: z.boolean().optional(),
        color: z.string().optional(),
      }).optional(),
      ticks: z.object({
        display: z.boolean().optional(),
        color: z.string().optional(),
        font: z.object({
          family: z.string().optional(),
        }).optional(),
      }).optional(),
      pointLabels: z.object({
        display: z.boolean().optional(),
        color: z.string().optional(),
      }).optional(),
      angleLines: z.object({
        display: z.boolean().optional(),
      }).optional(),
    }).optional(),
    x: axis,
    y: axis,
  }).optional(),
  watermark: z.object({
    image: z.string().optional(),
    x: z.number().optional(),
    y: z.number().optional(),
    alignX: z.enum(['left', 'middle', 'right']).optional(),
    alignY: z.enum(['top', 'middle', 'bottom']).optional(),
    opacity: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    position: z.enum(['front', 'back', 'between']).optional(),
    alignToChartArea: z.boolean().optional(),
  }).optional(),
}).optional();

const watermark = z.boolean();

export const chartCreateSchema = z.object({
  aspectRatio,
  config: z.object({
    type,
    data,
    options,
  }),
  watermark,
});

export const chartPatchSchema = z.object({
  aspectRatio,
  config: z.object({
    type,
    data,
    options,
  }),
  watermark,
})
