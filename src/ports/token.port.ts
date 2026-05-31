import { type JWTPayload } from 'jose'

export interface TokenPort {
  generateAccessToken(payload: Partial<JWTPayload>): Promise<string>
  generateRefreshToken(payload: Partial<JWTPayload>): Promise<string>
}
