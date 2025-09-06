import { ErrorHandlerOptions } from '@middlewares/index'
import { Express, json, RequestHandler } from 'express'
import helmet, { HelmetOptions } from 'helmet'
import cors, { CorsOptions } from 'cors'
import compression from 'compression'

export interface MiddlewareOptions {
  helmet?: HelmetOptions | false
  cors?: CorsOptions | false
  enableCompression?: boolean
  enableJson?: boolean
  errorHandler?: ErrorHandlerOptions
}

/**
 * Applies a middleware only if its options are not false.
 */
const useIfEnabled = <Options>(app: Express, middleware: (options?: Options) => RequestHandler, opts?: Options | false) => {
  if (opts !== false) app.use(middleware(opts))
}

/**
 * Registers global middlewares for the Express app.
 */
export const applyMiddlewares = (app: Express, options: MiddlewareOptions = {}): void => {
  const { helmet: helmetOpts = {}, cors: corsOpts = {}, enableCompression = true, enableJson = true } = options

  useIfEnabled(app, helmet, helmetOpts)
  useIfEnabled(app, cors, corsOpts)

  if (enableCompression) app.use(compression())
  if (enableJson) app.use(json())
}
