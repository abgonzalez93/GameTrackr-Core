import { z } from 'zod'
import { NonEmptyStringSchema } from './NonEmptyStringSchema.ts'

export const OptionalStringArraySchema = z.array(NonEmptyStringSchema).optional()
