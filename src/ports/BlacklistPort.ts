/**
 * BlacklistPort
 *
 * Defines the contract for interacting with a blacklist storage (e.g. Redis).
 * Responsible for storing revoked token JTIs and checking their status.
 */
export interface BlacklistPort {
  /**
   * Adds a token JTI to the blacklist with an expiration time.
   *
   * @param jti - Unique identifier of the token (JWT ID)
   * @param ttlSeconds - Time to live in seconds (remaining lifetime)
   */
  revokeToken(jti: string, ttlSeconds: number): Promise<void>

  /**
   * Checks whether a token is present in the blacklist.
   *
   * @param jti - Token identifier
   * @returns `true` if revoked; otherwise `false`
   */
  isTokenRevoked(jti: string): Promise<boolean>
}
