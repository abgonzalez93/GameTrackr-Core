import { z } from 'zod'
import { CategorySchema } from './CategorySchema.ts'

export const CategoryListSchema = z.array(CategorySchema)
