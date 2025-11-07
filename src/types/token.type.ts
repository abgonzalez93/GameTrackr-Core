import { z } from 'zod'
import {
  TokenGenerateInputSchema,
  TokenPairSchema,
  TokenRevocationStatusSchema,
  TokenRevocationStatusInputSchema,
  TokenRevokeInputSchema,
  TokenRotateInputSchema,
} from '#schemas/token.schema'

export type TokenGenerateInput = z.infer<typeof TokenGenerateInputSchema>
export type TokenPair = z.infer<typeof TokenPairSchema>
export type TokenRevocationStatus = z.infer<typeof TokenRevocationStatusSchema>
export type TokenRevocationStatusInput = z.infer<typeof TokenRevocationStatusInputSchema>
export type TokenRevokeInput = z.infer<typeof TokenRevokeInputSchema>
export type TokenRotateInput = z.infer<typeof TokenRotateInputSchema>
