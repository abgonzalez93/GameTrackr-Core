import { type BaseURLOptions } from '#types/http/BaseURLOptions'

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
