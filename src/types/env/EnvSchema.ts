import { type ZodRawShape } from 'zod'

/**
 * **EnvSchema**
 *
 * Represents the "shape" of environment variables to validate.
 *
 * Each key corresponds to an environment variable name and
 * maps to a Zod validator (e.g. z.string(), z.coerce.number()).
 *
 * Compatible with `z.object()` and `z.infer<z.ZodObject<EnvSchema>>`.
 */
export type EnvSchema = ZodRawShape
