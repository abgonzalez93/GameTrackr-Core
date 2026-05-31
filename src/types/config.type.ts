import type { ZodObject, ZodType, z } from 'zod'
import { BaseServerEnvSchema } from '#schemas/config.schema'

export type ConfigSchema = ZodObject<Record<string, ZodType>>
export type ConfigValues = Record<string, string | undefined>
export type SchemaOutput<T extends ZodType> = z.infer<T>
export type BaseServerEnv = z.infer<typeof BaseServerEnvSchema>
