import { z } from 'zod'
import { IdSchema } from './IdSchema.ts'

export const IdListSchema = z.array(IdSchema)
