import type { ZodObject, ZodType } from 'zod'

export type ConfigSchema = ZodObject<Record<string, ZodType>>
