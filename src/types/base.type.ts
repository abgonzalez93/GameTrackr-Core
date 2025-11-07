import { z } from 'zod'
import { IdSchema, IdListSchema } from '#schemas/base.schema'

export type Id = z.infer<typeof IdSchema>
export type IdList = z.infer<typeof IdListSchema>
