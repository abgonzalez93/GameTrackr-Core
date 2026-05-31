import { z } from 'zod'
import { PositiveNumberSchema, RequiredString } from './common.schema.ts'

export const JWTExpSchema = PositiveNumberSchema
export const JWTJtiSchema = z.uuid()
export const JWTSubSchema = RequiredString.regex(/^\d+$/)
