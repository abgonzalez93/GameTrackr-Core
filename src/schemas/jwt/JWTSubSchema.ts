import { NonEmptyStringSchema } from '../base/NonEmptyStringSchema.ts'

export const JWTSubSchema = NonEmptyStringSchema.regex(/^\d+$/)
