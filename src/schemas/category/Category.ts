import { IdSchema } from '@schemas/shared'
import { z } from 'zod'

/**
 * Neutral schema for a single category entity.
 * A category can represent a genre, platform, or theme,
 * independent of the provider (IGDB, RAWG, Steam, etc.).
 */
export const CategorySchema = z.object({
  id: IdSchema,
  name: z.string(),
  slug: z.string(),
})

/**
 * Schema for a list of categories.
 */
export const CategoryListSchema = z.array(CategorySchema)

export type Category = z.infer<typeof CategorySchema>
export type CategoryList = z.infer<typeof CategoryListSchema>
