import { type JWTJti } from '#types/jwt/JWTJti'

/**
 * **BlacklistPort**
 *
 * Contract defining how the application interacts with a blacklist storage system.
 *
 * This interface is responsible for persisting and checking revoked JWT identifiers (`jti`),
 * allowing the application to invalidate tokens before their natural expiration.
 *
 * ### Responsibilities
 * - Provide methods to **store** revoked token identifiers with an expiration time.
 * - Provide methods to **check** whether a given token has been revoked.
 *
 * ### Layer
 * - **Port (Infrastructure Contract)** — implemented by adapters (e.g., Redis, memory).
 * - Consumed by the {@link BlacklistService} in the application layer.
 */
export interface BlacklistPort {
  /**
   * Stores a revoked token identifier (`jti`) in the blacklist for a limited duration.
   *
   * @param jti - The unique identifier of the JWT.
   * @param ttlSeconds - Time-to-live in seconds (remaining lifetime of the token).
   * @returns A promise that resolves once the token has been added to the blacklist.
   */
  revokeToken(jti: JWTJti, ttlSeconds: number): Promise<void>

  /**
   * Checks whether the given token identifier (`jti`) is present in the blacklist.
   *
   * @param jti - The unique identifier of the JWT.
   * @returns A promise that resolves to `true` if the token has been revoked; otherwise `false`.
   */
  isTokenRevoked(jti: JWTJti): Promise<boolean>
}
