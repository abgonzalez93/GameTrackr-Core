import { z } from 'zod'
import { PositiveNumberSchema, NonEmptyStringSchema } from './base.schema.ts'

export const JWTExpSchema = PositiveNumberSchema
export const JWTJtiSchema = z.uuid()
export const JWTSubSchema = NonEmptyStringSchema.regex(/^\d+$/)
