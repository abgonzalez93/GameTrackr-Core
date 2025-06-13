/**
 * Constants used for JSON Web Token (JWT) generation and validation across services.
 *
 * Includes supported token types, default issuer, and selected signing algorithm (RS256).
 */
export const JWT = {
  TOKEN_TYPES: ['access', 'refresh'] as const,
  ISSUER: 'trackplay-auth',
  ALGORITHM: 'RS256',
}
