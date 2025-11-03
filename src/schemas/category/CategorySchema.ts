import { z } from 'zod'
import { IdSchema } from '../base/IdSchema.ts'

export const CategorySchema = z.object({
  id: IdSchema,
  name: z.string(),
  slug: z.string(),
})
