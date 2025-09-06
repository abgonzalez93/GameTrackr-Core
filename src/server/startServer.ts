import { BaseURLOptions, getBaseUrl } from '@utils/index'
import { Express } from 'express'
import { Logger } from 'winston'

/**
 * Starts an HTTP server for the provided Express application.
 *
 * @param app - The Express app instance
 * @param options - Base URL configuration (protocol, host, port)
 */
export const startServer = (app: Express, logger: Logger, options: BaseURLOptions): void => {
  app.listen(options.port, options.host, () => {
    logger.info(`✅ Server running at ${getBaseUrl(options)}`)
  })
}
