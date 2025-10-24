import type { ZodObject, ZodType } from 'zod'

/**
 * **ConfigSchema**
 *
 * Defines the **canonical Zod schema type** used across TrackPlay’s configuration system
 * (e.g., environment variables, secrets, runtime configuration).
 */
export type ConfigSchema = ZodObject<Record<string, ZodType>>
