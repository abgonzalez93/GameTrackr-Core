export interface BaseURLOptions {
  protocol: 'http' | 'https'
  host: string
  port: number
}

/**
 * Computes the base URL from provided options.
 *
 * @param options - Protocol, host and port
 * @returns A complete URL string (e.g., http://localhost:4000)
 */
export const getBaseUrl = ({ protocol, host, port }: BaseURLOptions): string => {
  return `${protocol}://${host}:${port}`
}
