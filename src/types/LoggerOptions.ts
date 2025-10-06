/**
 * **Logger Options**
 *
 * Defines configuration parameters for the Winston-based logger.
 * Used primarily during infrastructure setup (via {@link createLogger})
 * to control output format, verbosity, and contextual labeling.
 *
 * ### Responsibilities
 * - Configure log formatting (JSON or colorized console output).
 * - Adjust verbosity based on environment (`isDevelopment`).
 * - Attach a service-specific label (e.g., `"TrackPlay-Catalog"`).
 *
 * ### Notes
 * - When `isDevelopment` is `true`, logs are colorized and human-readable.
 * - In production mode, logs are serialized in JSON for centralized log collection.
 * - Commonly passed into `createLogger` or `bootstrap` during service initialization.
 *
 */
export interface LoggerOptions {
  /**
   * Indicates whether the service is running in development mode.
   * Enables colored and human-readable console output when `true`.
   *
   * @default false
   */
  isDevelopment?: boolean

  /**
   * Optional label applied to each log entry.
   * Typically set to the service name (e.g., `"TrackPlay-Catalog"`).
   */
  label?: string

  /**
   * Minimum log level to include in the output.
   *
   * - `"debug"` → detailed development logs
   * - `"info"` → general operational events
   * - `"warn"` → potential issues, non-critical
   * - `"error"` → critical failures or crashes
   *
   * @default "info"
   */
  level?: 'info' | 'debug' | 'warn' | 'error'
}
