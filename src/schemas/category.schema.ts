import { z } from 'zod'
import { IdSchema } from './base.schema.ts'

export const CategorySchema = z.object({
  id: IdSchema,
  name: z.string(),
  slug: z.string(),
})

export const CategoryListSchema = z.array(CategorySchema)
