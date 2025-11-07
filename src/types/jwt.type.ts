import { z } from 'zod'
import { JWTExpSchema, JWTJtiSchema, JWTSubSchema } from '#schemas/jwt.schema'

export type JWTExp = z.infer<typeof JWTExpSchema>
export type JWTJti = z.infer<typeof JWTJtiSchema>
export type JWTSub = z.infer<typeof JWTSubSchema>
