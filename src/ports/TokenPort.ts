import { JWTPayload } from 'jose'

/**
 * **TokenPort**
 *
 * Defines the **infrastructure-level contract** for issuing signed JSON Web Tokens (JWT).
 *
 * ### Responsibilities
 * - Encapsulate the low-level signing process for access and refresh tokens.
 * - Abstract away the underlying JWT library (e.g. {@link jose}) and signing algorithm.
 * - Provide a unified interface for the application to generate tokens without
 *   depending on specific cryptographic details or key management.
 *
 * ### Layer
 * - **Port (Infrastructure Contract)** — implemented by adapters using cryptographic libraries.
 * - Consumed by the {@link TokenService} in the application layer.
 *
 * ### Notes
 * - Implementations must sign tokens according to the configured algorithm and key pair.
 * - Access tokens are typically short-lived; refresh tokens are longer-lived.
 */
export interface TokenPort {
  /**
   * Generates and signs a short-lived access token.
   *
   * Access tokens are used for authenticating API requests and should contain
   * minimal claims (e.g., `sub`, `roles`, or `permissions`).
   *
   * @param payload - The claims to embed in the token (e.g., user ID, roles, etc.).
   * @returns A promise resolving to a signed access token string.
   */
  generateAccessToken(payload: Partial<JWTPayload>): Promise<string>

  /**
   * Generates and signs a long-lived refresh token.
   *
   * Refresh tokens are used to obtain new access tokens once the previous ones expire.
   *
   * @param payload - The claims to embed in the token.
   * @returns A promise resolving to a signed refresh token string.
   */
  generateRefreshToken(payload: Partial<JWTPayload>): Promise<string>
}
