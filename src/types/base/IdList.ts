import { z } from 'zod'
import { IdListSchema } from '#schemas/base/IdListSchema'

export type IdList = z.infer<typeof IdListSchema>
