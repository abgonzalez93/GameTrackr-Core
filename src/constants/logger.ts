/**
 * **LOGGER**
 *
 * Centralized logging configuration constants for all TrackPlay services.
 * Defines:
 * - Canonical log levels
 * - Default configuration values
 * - Emoji indicators for visual clarity (dev mode)
 * - Locale for timestamp formatting
 *
 * This object is intended to be imported anywhere structured logging is used:
 *  - `createLogger` (Winston setup)
 *  - `createErrorHandler` (HTTP error logging)
 *  - Domain-level debug or audit logs
 */
export const LOGGER = {
  /**
   * Canonical log severity levels used across the platform.
   */
  LEVELS: {
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
  },

  /**
   * Default service label applied to log entries.
   */
  DEFAULT_LABEL: 'TrackPlay',

  /**
   * Locale used for timestamp formatting.
   * Typically `"es-ES"` with `"Europe/Madrid"` timezone in app-level formatting.
   */
  TIMESTAMP: {
    LOCALE: 'es-ES',
    TIMEZONE: 'Europe/Madrid',
  },

  /**
   * Emoji indicators associated with each log level.
   * Used to improve readability during development.
   */
  EMOJIS: {
    error: '❌',
    warn: '⚠️',
    info: 'ℹ️',
    debug: '🐞',
  },
} as const
