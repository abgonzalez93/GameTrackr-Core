import type { JWTJti } from '#types/jwt.type'

export interface BlacklistPort {
  revokeToken(jti: JWTJti, ttlSeconds: number): Promise<void>
  isTokenRevoked(jti: JWTJti): Promise<boolean>
}
