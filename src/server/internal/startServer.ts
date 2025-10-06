import { type BaseURLOptions } from '#types/BaseURLOptions'
import { getBaseUrl } from '#utils/net/getBaseUrl'
import { Express } from 'express'
import { Logger } from 'winston'

/**
 * **startServer**
 *
 * Starts the HTTP server for a given Express application.
 *
 * ### Responsibilities
 * - Launches the Express app on the specified host and port.
 * - Logs the full base URL of the running service using the provided {@link Logger}.
 * - Serves as the final step of the bootstrapping process initiated by {@link bootstrap}.
 *
 * ### Notes
 * - This function does **not** handle clustering, HTTPS, or graceful shutdown.
 * - Intended for lightweight startup scripts; more advanced deployments
 *   (e.g., with PM2, Kubernetes, or Docker) should handle process supervision externally.
 *
 * @param app - The initialized Express application instance.
 * @param logger - Winston logger used to log the startup message.
 * @param options - Network configuration parameters defining how the server is exposed.
 * @param options.protocol - Communication protocol (`http` or `https`).
 * @param options.host - Hostname or IP address where the server will bind.
 * @param options.port - TCP port on which the application will listen.
 *
 */
export const startServer = (app: Express, logger: Logger, options: BaseURLOptions): void => {
  app.listen(options.port, options.host, () => {
    logger.info(`✅ Server running at ${getBaseUrl(options)}`)
  })
}
