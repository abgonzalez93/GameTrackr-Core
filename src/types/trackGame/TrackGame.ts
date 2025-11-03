import { z } from 'zod'
import { TrackGameSchema } from '#schemas/trackGame/TrackGameSchema'

export type TrackGame = z.infer<typeof TrackGameSchema>
