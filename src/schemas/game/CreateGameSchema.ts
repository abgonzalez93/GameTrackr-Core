import { nullToUndefined } from '@schemas/shared'
import { z } from 'zod'

/**
 * Zod schema for creating a game entry.
 */
export const CreateGameSchema = z.object({
  igdbId: z.number().int(),
  name: z.string().min(1),
  summary: nullToUndefined(z.string()),
  coverUrl: nullToUndefined(z.string().url()),
  releaseDate: nullToUndefined(z.coerce.date()),
  genres: z.array(z.string()),
  platforms: z.array(z.string()),
})

export type CreateGame = z.infer<typeof CreateGameSchema>
