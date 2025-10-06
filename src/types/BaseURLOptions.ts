/**
 * **Base URL Options**
 *
 * Defines the parameters required to construct the base URL for a running service.
 * This structure is commonly used to configure the HTTP/HTTPS server and generate
 * fully-qualified service URLs (e.g., `http://localhost:4000`).
 *
 * ### Responsibilities
 * - Provide consistent configuration for network binding (protocol, host, port).
 * - Support dynamic URL generation across environments.
 *
 * ### Notes
 * - Typically injected into the {@link startServer} function or logging utilities.
 * - The combination of `protocol`, `host`, and `port` is used to compute the full base URL.
 *
 */
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
