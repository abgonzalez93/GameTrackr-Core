import { getServerConf } from '@config/index'
import { getBaseUrl } from '@utils/index'
import { logger } from '@logger/index'
import { Express } from 'express'

/**
 * Starts an HTTP server for the provided Express application.
 *
 * @param app - The Express application instance to start
 * @param options - Base URL options including host, port and protocol
 *
 * @module server
 */
export const startServer = (app: Express): void => {
  const { IS_PRODUCTION, PORT, HOST } = getServerConf()
  const protocol = IS_PRODUCTION ? 'https' : 'http'
  const log = logger()

  app.listen(PORT, HOST, () => {
    log.info(`🚀 Server running at ${getBaseUrl({ protocol, host: HOST, port: PORT })}`)
  })
}
