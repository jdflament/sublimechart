import * as z from "zod"

export const chartCreateSchema = z.object({
  title: z.string(),
  config: z.object({
    type: z.enum(['bar', 'line', 'pie', 'radar', 'doughnut', 'polarArea'], {
      required_error: "Please select a type.",
    }),
    data: z.object({
      labels: z.string().array().min(1),
      datasets: z.array(z.object({
        label: z.string().optional(),
        data: z.number().array().min(1),
        backgroundColor: z.string().optional(),
        borderColor: z.string().optional(),
        borderWidth: z.number().optional(),
      })).optional(),
    }),
  }),
});

export const chartPatchSchema = z.object({
  title: z.string().optional(),
  config: z.object({
    type: z.enum(['bar', 'line', 'pie', 'radar', 'doughnut', 'polarArea']).optional(),
    data: z.object({
      labels: z.string().array().min(1),
      datasets: z.array(z.object({
        label: z.string().optional(),
        data: z.number().array().min(1),
        backgroundColor: z.string().optional(),
        borderColor: z.string().optional(),
        borderWidth: z.number().optional(),
      })).optional(),
    }),
  }),
})
