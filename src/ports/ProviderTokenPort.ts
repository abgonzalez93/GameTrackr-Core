import { type ProviderToken } from '#types/providers/ProviderToken'

export interface ProviderTokenPort {
  requestToken(): Promise<ProviderToken>
}
