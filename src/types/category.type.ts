import { z } from 'zod'
import { CategorySchema, CategoryListSchema } from '#schemas/category.schema'

export type Category = z.infer<typeof CategorySchema>
export type CategoryList = z.infer<typeof CategoryListSchema>
