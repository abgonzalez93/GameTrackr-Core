import { getServerConf } from '@config/index'

const { IS_PRODUCTION, HOST, PORT } = getServerConf()

/**
 * Computes the base URL of the application based on environment settings.
 *
 * Uses `env.HOST`, `env.PORT` and `env.IS_PRODUCTION` by default.
 *
 * @returns The full base URL (e.g., http://localhost:4000).
 *
 * @module utils/net
 */
export const getBaseURL = (): string => {
  const protocol = IS_PRODUCTION ? 'https' : 'http'
  return `${protocol}://${HOST}:${PORT}`
}
