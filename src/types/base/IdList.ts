import { IdListSchema } from '#schemas/base/IdListSchema'
import { z } from 'zod'

/**
 * **IdList**
 *
 * Type alias inferred from {@link IdListSchema}.
 *
 * Represents a list of positive numeric identifiers (`Id[]`)
 * used to reference related entities across the domain.
 *
 * ### Notes
 * - Each element is validated as a **positive integer** (`> 0`).
 * - Commonly used in entities like `Game`, `Category`, or `User` relationships.
 * - Ensures consistent identifier typing across all domain models.
 *
 * @see {@link IdListSchema}
 */
export type IdList = z.infer<typeof IdListSchema>
