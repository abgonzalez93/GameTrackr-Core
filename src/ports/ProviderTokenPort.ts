import { type ProviderToken } from '#types/providers/ProviderToken'

/**
 * **ProviderTokenPort**
 *
 * Defines the **infrastructure-level contract** for authenticating
 * against external game data providers (e.g., IGDB, RAWG).
 *
 * ### Responsibilities
 * - Handle provider-specific authentication flows:
 *   - OAuth 2.0 (Client Credentials) for providers like IGDB/Twitch.
 *   - Static API key schemes for providers like RAWG.
 * - Expose a unified interface that returns normalized {@link ProviderToken} objects.
 *
 * ### Layer
 * - **Port (Infrastructure Contract)** — implemented by provider-specific adapters.
 * - Consumed by the {@link TokenService} in the application layer to obtain valid tokens.
 *
 * ### Notes
 * - Each implementation must abstract away any protocol details (OAuth, API key, etc.).
 * - The returned {@link ProviderToken} should always be in a **domain-neutral format**.
 */
export interface ProviderTokenPort {
  /**
   * Requests a valid authentication token from the external provider.
   *
   * Implementations should ensure that the token returned is ready for immediate use
   * (e.g., already validated, formatted, and normalized).
   *
   * @returns A promise resolving to a provider-issued, domain-safe {@link ProviderToken}.
   */
  requestToken(): Promise<ProviderToken>
}
