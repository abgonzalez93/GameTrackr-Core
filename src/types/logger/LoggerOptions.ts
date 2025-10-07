/**
 * **LoggerOptions**
 *
 * Configuration parameters for the **Winston-based logger** used across TrackPlay services.
 * Primarily consumed by {@link createLogger} and {@link bootstrap} to define
 * logging verbosity, output format, and contextual labeling.
 *
 * ### Responsibilities
 * - Control log verbosity (`level`) and output format (JSON or colorized).
 * - Reflect runtime mode (`isDevelopment`) for dynamic formatting behavior.
 * - Attach a contextual label to each log entry (e.g., `"TrackPlay-Auth"`).
 *
 * ### Notes
 * - In **development**, logs are colorized and human-readable.
 * - In **production**, logs are serialized as JSON for aggregation tools (e.g., Loki, ELK).
 * - Passed during infrastructure setup to unify logging behavior across all microservices.
 *
 */
export interface LoggerOptions {
  /**
   * Whether the service is running in development mode.
   *
   * When `true`, enables colorized and human-readable console output.
   *
   * @default false
   */
  isDevelopment?: boolean

  /**
   * Optional label applied to every log entry.
   *
   * Commonly set to the service name (e.g., `"TrackPlay-Catalog"`),
   * allowing easy identification in multi-service logs.
   */
  label?: string

  /**
   * Minimum log level to include in the output stream.
   *
   * - `"debug"` — Detailed development traces.
   * - `"info"` — General operational events.
   * - `"warn"` — Recoverable or non-critical warnings.
   * - `"error"` — Critical failures or unexpected crashes.
   *
   * @default "info"
   */
  level?: 'info' | 'debug' | 'warn' | 'error'
}
