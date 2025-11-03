import { type JWTJti } from '#types/jwt/JWTJti'

export interface BlacklistPort {
  revokeToken(jti: JWTJti, ttlSeconds: number): Promise<void>
  isTokenRevoked(jti: JWTJti): Promise<boolean>
}
