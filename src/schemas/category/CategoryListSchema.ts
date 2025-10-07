import { CategorySchema } from './CategorySchema.js'
import { z } from 'zod'

/**
 * **CategoryListSchema**
 *
 * Zod schema representing a list of {@link CategorySchema} objects.
 *
 * ### Purpose
 * Validates arrays of normalized category entities such as genres,
 * platforms, or themes returned by external game providers.
 *
 * ### Behavior
 * - Ensures that every element in the list conforms to {@link CategorySchema}.
 * - Allows empty arrays but rejects non-array or malformed values.
 *
 * @see {@link CategorySchema}
 */
export const CategoryListSchema = z.array(CategorySchema)
