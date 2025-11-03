import { z } from 'zod'
import { JWTJtiSchema } from '#schemas/jwt/JWTJtiSchema'

export type JWTJti = z.infer<typeof JWTJtiSchema>
