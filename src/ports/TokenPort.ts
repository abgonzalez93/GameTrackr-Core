import { JWTPayload } from 'jose'

/**
 * TokenPort
 *
 * Defines the contract for issuing JWT tokens.
 * This port abstracts away the underlying signing library (e.g., jose).
 */
export interface TokenPort {
  /**
   * Signs and issues a short-lived access token.
   *
   * @param payload - Data to embed in the JWT (e.g., user id, roles, etc.)
   * @returns A signed access token string
   */
  generateAccessToken(payload: Partial<JWTPayload>): Promise<string>

  /**
   * Signs and issues a long-lived refresh token.
   *
   * @param payload - Data to embed in the JWT
   * @returns A signed refresh token string
   */
  generateRefreshToken(payload: Partial<JWTPayload>): Promise<string>
}
