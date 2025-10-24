import { z } from 'zod'
import { type ConfigSchema } from './ConfigSchema.ts'

/**
 * **InferConfig**
 *
 * Infers the TypeScript type from a given Zod environment schema.
 *
 */
export type InferConfig<Schema extends ConfigSchema> = z.infer<Schema>
