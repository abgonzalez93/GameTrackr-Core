import { type Logger } from 'winston'

/**
 * **Logger**
 *
 * Type re-export for the Winston logger instance.
 *
 * This allows TrackPlay services to reference the `Logger` type
 * without directly depending on the `winston` package.
 *
 * ### Use Case
 * Provides a consistent logger interface across all TrackPlay services,
 * ensuring strongly typed logging within infrastructure, middlewares,
 * and controllers.
 *
 * @see {@link https://github.com/winstonjs/winston | Winston Documentation}
 */
export type { Logger }
