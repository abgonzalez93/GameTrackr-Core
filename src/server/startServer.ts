import { BaseURLOptions, getBaseUrl } from '@utils/index'
import { getLogger } from '@logger/index'
import { Express } from 'express'

/**
 * Starts an HTTP server for the provided Express application.
 *
 * @param app - The Express app instance
 * @param options - Base URL configuration (protocol, host, port)
 */
export const startServer = (app: Express, options: BaseURLOptions): void => {
  const log = getLogger()

  app.listen(options.port, options.host, () => {
    log.info(`✅ Server running at ${getBaseUrl(options)}`)
  })
}
