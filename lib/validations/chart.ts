import * as z from "zod"

const aspectRatio = z.enum(['1/1', '2/3', '3/2', '4/3', '4/5', '16/9', '9/16'], {
  'required_error': 'Please select an aspect ratio.',
});

const type = z.enum(['bar', 'line', 'pie', 'radar', 'doughnut'], {
  required_error: "Please select a type.",
});

const data = z.object({
  labels: z.string().array().min(1),
  datasets: z.array(z.object({
    label: z.string().optional(),
    data: z.number().array().min(1),
    backgroundColor: z.string().optional(),
    borderColor: z.string().optional(),
    borderWidth: z.number().optional(),
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
  }).optional(),
  stacked: z.boolean().optional(),
}).optional();

const options = z.object({
  plugins: z.object({
    datalabels: z.object({
      display: z.boolean().default(false).optional(),
      anchor: z.enum(['start', 'center', 'end']).default('end').optional(),
      align: z.enum(['start', 'center', 'end', 'top', 'left', 'right', 'bottom']).default('top').optional(),
      color: z.string().default('#000000').optional(),
      backgroundColor: z.string().optional(),
      borderRadius: z.number().optional(),
      font: z.object({
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
        size: z.number().optional(),
      }).optional(),
      color: z.string().optional(),
      align: z.enum(['start', 'center', 'end']).optional(),
      position: z.enum(['top', 'left', 'right', 'bottom']).optional(),
      padding: z.number().optional(),
    }).optional(),
    legend: z.object({
      display: z.boolean().optional(),
    }).optional(),
  }).optional(),
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
}).optional();

export const chartCreateSchema = z.object({
  aspectRatio,
  config: z.object({
    type,
    data,
    options,
  }),
});

export const chartPatchSchema = z.object({
  aspectRatio,
  config: z.object({
    type,
    data,
    options,
  }),
})
