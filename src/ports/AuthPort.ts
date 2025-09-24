import { ProviderToken } from '@schemas/index'

/**
 * Port defining the authentication contract for any external game provider.
 *
 * Implementations of this port are responsible for handling provider-specific
 * authentication flows (e.g., OAuth for IGDB, API keys for RAWG).
 *
 * The application layer depends only on this interface and remains agnostic
 * of provider-specific details.
 */
export interface AuthPort {
  /**
   * Requests and returns a valid authentication token from the provider.
   *
   * @returns {Promise<ProviderToken>} A promise resolving to a provider-issued token object.
   */
  requestToken(): Promise<ProviderToken>
}
