import { z } from 'zod'
import { CategorySchema } from '#schemas/category/CategorySchema'

/**
 * **Category**
 *
 * Type alias inferred from {@link CategorySchema}.
 *
 * Represents a **domain-level category entity**, such as a genre, platform,
 * or theme, normalized across different external providers (IGDB, RAWG, etc.).
 *
 * ### Notes
 * - Each category is **provider-agnostic**, ensuring cross-service consistency.
 * - Used to represent reusable taxonomies across the `Game` and `Catalog` domains.
 * - Often grouped into lists using {@link CategoryList}.
 *
 * @see {@link CategorySchema}
 * @see {@link CategoryList}
 */
export type Category = z.infer<typeof CategorySchema>
