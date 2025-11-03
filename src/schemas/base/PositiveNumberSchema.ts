import { z } from 'zod'

export const PositiveNumberSchema = z.coerce.number().int().positive()
