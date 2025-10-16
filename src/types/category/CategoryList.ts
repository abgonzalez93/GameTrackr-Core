import { z } from 'zod'
import { CategoryListSchema } from '#schemas/category/CategoryListSchema'

/**
 * **CategoryList**
 *
 * Type alias inferred from {@link CategoryListSchema}.
 *
 * Represents an **array of domain-level categories**, each defined by {@link Category}.
 * Commonly used to group genres, platforms, or themes retrieved from game providers.
 *
 * ### Notes
 * - Each element is a validated {@link Category}.
 * - Used across the **Catalog** and **Game** domains to provide consistent taxonomy structures.
 * - Typically returned by {@link CategoryPort} implementations.
 *
 * @see {@link CategorySchema}
 * @see {@link Category}
 */
export type CategoryList = z.infer<typeof CategoryListSchema>
