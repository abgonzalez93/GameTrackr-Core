import { z } from 'zod'
import { IdSchema } from '#schemas/base/IdSchema'

export type Id = z.infer<typeof IdSchema>
