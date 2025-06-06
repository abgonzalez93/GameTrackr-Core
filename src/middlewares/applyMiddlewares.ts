import { ErrorHandlerOptions, NotFoundHandlerOptions } from '@middlewares/index'
import helmet, { HelmetOptions } from 'helmet'
import cors, { CorsOptions } from 'cors'
import { Express, json } from 'express'
import compression from 'compression'

export interface MiddlewareOptions {
  helmet?: HelmetOptions | false
  cors?: CorsOptions | false
  enableCompression?: boolean
  enableJson?: boolean
  errorHandler?: ErrorHandlerOptions
  notFoundHandler?: NotFoundHandlerOptions
}

/**
 * Registers global middlewares for the Express app.
 *
 * @module middlewares
 */
export const applyMiddlewares = (app: Express, options: MiddlewareOptions = {}): void => {
  const { helmet: helmetOpts = {}, cors: corsOpts = {}, enableCompression = true, enableJson = true } = options

  if (helmetOpts !== false) app.use(helmet(helmetOpts))
  if (corsOpts !== false) app.use(cors(corsOpts))
  if (enableCompression) app.use(compression())
  if (enableJson) app.use(json())
}
