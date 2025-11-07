import type { ProviderToken } from '#types/provider.type'

export interface ProviderTokenPort {
  requestToken(): Promise<ProviderToken>
}
