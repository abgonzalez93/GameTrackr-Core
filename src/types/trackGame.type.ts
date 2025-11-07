import { z } from 'zod'
import { TrackGameSchema } from '#schemas/trackGame.schema'

export type TrackGame = z.infer<typeof TrackGameSchema>
