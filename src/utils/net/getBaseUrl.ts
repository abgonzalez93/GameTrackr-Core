export interface BaseURLOptions {
  /**
   * Network protocol used by the service.
   * Usually `"http"` in development and `"https"` in production.
   */
  protocol: 'http' | 'https'

  /**
   * Hostname or IP address where the service runs.
   * Example: `"localhost"` or `"0.0.0.0"`.
   */
  host: string

  /**
   * Port number on which the service listens.
   * Example: `4000`.
   */
  port: number
}

/**
 * Builds a fully qualified base URL from protocol, host, and port values.
 *
 * ### Responsibilities
 * - Assembles a complete URL string used for logging, service discovery, or CORS.
 * - Provides a single source of truth for how service URLs are represented internally.
 *
 * ### Notes
 * - Does not include trailing slashes.
 * - Designed for use within `@trackplay/core/server` helpers.
 *
 * @param options - Object containing the protocol, host, and port.
 * @returns A formatted URL string such as `"http://localhost:4000"`.
 *
 */
export const getBaseUrl = ({ protocol, host, port }: BaseURLOptions): string => {
  return `${protocol}://${host}:${port}`
}
