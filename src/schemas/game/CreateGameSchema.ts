import { z } from 'zod'
import { PositiveNumberSchema } from '../base/PositiveNumberSchema.ts'

export const CreateGameSchema = z.object({
  id: PositiveNumberSchema,
  name: z.string().min(1),
  summary: z.string().nullable().optional(),
  coverUrl: z.url().nullable().optional(),
  releaseDate: z.coerce.date().nullable().optional(),
  genres: z.array(z.string()),
  platforms: z.array(z.string()),
})
