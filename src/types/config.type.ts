import type { ZodObject, ZodType } from 'zod'
import { z } from 'zod'

export type ConfigSchema = ZodObject<Record<string, ZodType>>
export type ConfigValues = Record<string, string | undefined>
export type InferConfig<Schema extends ConfigSchema> = z.infer<Schema>
