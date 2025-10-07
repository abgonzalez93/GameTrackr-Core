/**
 * **BaseURLOptions**
 *
 * Configuration parameters defining the **network binding and URL generation**
 * behavior for a running TrackPlay service.
 *
 * Used primarily during HTTP/HTTPS server initialization or when constructing
 * fully-qualified service URLs (e.g., `"http://localhost:4000"`).
 *
 * ### Responsibilities
 * - Define consistent network configuration (`protocol`, `host`, `port`).
 * - Support dynamic environment-based URL generation (dev, staging, prod).
 * - Standardize base URL creation across services.
 *
 * ### Notes
 * - Commonly passed to {@link startServer} or log helpers for startup messages.
 * - The combination of all three fields uniquely identifies a service endpoint.
 *
 */
export interface BaseURLOptions {
  /**
   * Network protocol used by the service.
   *
   * Usually `"http"` in development and `"https"` in production.
   */
  protocol: 'http' | 'https'

  /**
   * Hostname or IP address where the service runs.
   *
   * Example: `"localhost"` or `"0.0.0.0"`.
   */
  host: string

  /**
   * Port number on which the service listens.
   *
   * Example: `4000`.
   */
  port: number
}
