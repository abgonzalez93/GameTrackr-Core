import { PositiveNumberSchema } from '@schemas/shared'
import { z } from 'zod'

/**
 * Zod schema for creating a game entry.
 */
export const CreateGameSchema = z.object({
  id: PositiveNumberSchema,
  name: z.string().min(1),
  summary: z.string().nullable().optional(),
  coverUrl: z.url().nullable().optional(),
  releaseDate: z.coerce.date().nullable().optional(),
  genres: z.array(z.string()),
  platforms: z.array(z.string()),
})

export type CreateGame = z.infer<typeof CreateGameSchema>
