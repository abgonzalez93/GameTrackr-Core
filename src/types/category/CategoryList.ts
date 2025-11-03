import { z } from 'zod'
import { CategoryListSchema } from '#schemas/category/CategoryListSchema'

export type CategoryList = z.infer<typeof CategoryListSchema>
