import { BaseURLOptions, getBaseUrl } from '@utils/index'
import { getLogger } from '@logger/index'
import { Express } from 'express'

const log = getLogger()

/**
 * Starts an HTTP server for the provided Express application.
 *
 * @param app - The Express app instance
 * @param options - Base URL configuration (protocol, host, port)
 */
export const startServer = (app: Express, options: BaseURLOptions): void => {
  app.listen(options.port, options.host, () => {
    log.info(`✅ Server running at ${getBaseUrl(options)}`)
  })
}
