import { z, type ZodObject } from 'zod'
import { type EnvSchema } from './EnvSchema.ts'

/**
 * **InferEnv**
 *
 * Infers the TypeScript type from a given Zod environment schema.
 * Used internally to derive precise typing for both `server` and `client`
 * environment variables without manual duplication.
 *
 */
export type InferEnv<Schema extends EnvSchema | undefined> = Schema extends EnvSchema
  ? z.infer<ZodObject<Schema>>
  : Record<string, never>
