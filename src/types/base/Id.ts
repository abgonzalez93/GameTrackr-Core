import { z } from 'zod'
import { IdSchema } from '#schemas/base/IdSchema'

/**
 * **Id**
 *
 * Type alias inferred from {@link IdSchema}.
 *
 * Represents a unique **positive numeric identifier** used across
 * all domain entities (e.g., users, games, categories).
 *
 * ### Notes
 * - Guaranteed to be a **positive integer** (`> 0`).
 * - Serves as a **domain-level identifier**, abstracted from provider-specific IDs.
 * - Commonly used in DTOs, repositories, and schema relations.
 *
 * @see {@link IdSchema}
 */
export type Id = z.infer<typeof IdSchema>
