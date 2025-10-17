/**
 * **JWT Constant**
 *
 * Defines shared constants used for **JSON Web Token (JWT)** generation,
 * validation, and configuration across TrackPlay services.
 *
 * ### Scope
 * - Centralizes JWT-related metadata such as supported token types,
 *   default issuer, and signing algorithm.
 * - Ensures consistent token semantics across all microservices.
 *
 * ### Notes
 * - Uses **RS256** (asymmetric RSA with SHA-256) for signing and verification.
 * - Tokens are issued with `iss` (issuer) set to `"trackplay-auth"`.
 * - Supported token types include `"access"` (short-lived) and `"refresh"` (long-lived).
 * - These constants are used by the {@link jwtAdapter} during token creation.
 *
 * @see {@link jwtAdapter}
 * @see {@link tokenService}
 * @see {@link TokenUseCase}
 */
export const JWT = {
  /**
   * Supported JWT token types issued by the authentication service.
   *
   * - `"access"` — short-lived token used for API authorization.
   * - `"refresh"` — long-lived token used for session renewal.
   */
  TOKEN_TYPES: ['access', 'refresh'],

  /**
   * The canonical issuer (`iss`) claim used in all JWTs.
   */
  ISSUER: 'trackplay-auth',

  /**
   * The signing algorithm used for JWT generation and validation.
   *
   * RS256 → RSA Signature with SHA-256.
   */
  ALGORITHM: 'RS256',
} as const
