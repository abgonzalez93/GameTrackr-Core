import { type ErrorHandlerOptions } from './ErrorHandlerOptions.js'
import { type HelmetOptions } from 'helmet'
import { type CorsOptions } from 'cors'

/**
 * **MiddlewareOptions**
 *
 * Defines configuration parameters for the **global middleware stack**
 * applied to every TrackPlay service during app initialization.
 *
 * ### Responsibilities
 * - Control which core middlewares are enabled globally.
 * - Provide custom configuration for security, CORS, and error handling.
 * - Allow fine-grained control of Express defaults like JSON parsing and compression.
 *
 * ### Notes
 * - Intended for use inside the `createApp` or `bootstrap` pipeline.
 * - If any option is explicitly set to `false`, the corresponding middleware is **disabled**.
 * - Defaults are optimized for production security and API readiness.
 *
 * ### Default Behavior
 * | Option             | Default | Description |
 * |--------------------|----------|--------------|
 * | `helmet`           | `{}`     | Enables HTTP security headers |
 * | `cors`             | `{}`     | Enables Cross-Origin Resource Sharing |
 * | `enableCompression`| `true`   | Enables gzip/deflate compression |
 * | `enableJson`       | `true`   | Enables JSON body parsing |
 * | `errorHandler`     | `{}`     | Enables structured global error handling |
 *
 */
export interface MiddlewareOptions {
  /**
   * Configuration options for Helmet middleware.
   * Set to `false` to disable security headers.
   *
   * @default {}
   */
  helmet?: HelmetOptions | false

  /**
   * Configuration options for Cross-Origin Resource Sharing (CORS).
   * Set to `false` to disable CORS entirely.
   *
   * @default {}
   */
  cors?: CorsOptions | false

  /**
   * Enables response compression using gzip or deflate.
   *
   * @default true
   */
  enableCompression?: boolean

  /**
   * Enables automatic JSON request body parsing.
   *
   * @default true
   */
  enableJson?: boolean

  /**
   * Configuration options for the global error handler middleware.
   * Used to customize behavior such as stack trace visibility in development.
   *
   * @see {@link ErrorHandlerOptions}
   */
  errorHandler?: ErrorHandlerOptions
}
