import { z } from 'zod'
import { JWTSubSchema } from '#schemas/jwt/JWTSubSchema'

export type JWTSub = z.infer<typeof JWTSubSchema>
