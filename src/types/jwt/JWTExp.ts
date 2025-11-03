import { z } from 'zod'
import { JWTExpSchema } from '#schemas/jwt/JWTExpSchema'

export type JWTExp = z.infer<typeof JWTExpSchema>
