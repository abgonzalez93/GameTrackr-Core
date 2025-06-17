import z from 'zod'

/**
 * Zod schema for the response returned when checking the revocation status of a refresh token.
 *
 * Indicates whether the token has been revoked (`true`) or is still valid (`false`).
 */
export const RefreshTokenRevocationResponseSchema = z.object({
  revoked: z.boolean(),
})

export type RefreshTokenRevocationResponse = z.infer<typeof RefreshTokenRevocationResponseSchema>
