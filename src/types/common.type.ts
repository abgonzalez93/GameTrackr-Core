import { z } from 'zod'
import { IdSchema } from '#schemas/common.schema'

export type Id = z.infer<typeof IdSchema>
