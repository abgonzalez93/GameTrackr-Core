import { env } from '../config'

/**
 * Application-level constants and environment flags.
 *
 * @module constants
 */
export const APP = {
  NODE_ENV: env.NODE_ENV,
  IS_PRODUCTION: env.IS_PRODUCTION,
  IS_DEVELOPMENT: env.IS_DEVELOPMENT,
}
