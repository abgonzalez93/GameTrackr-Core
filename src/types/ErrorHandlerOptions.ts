/**
 * **Error Handler Options**
 *
 * Defines configuration parameters for the global error-handling middleware.
 * These options control the verbosity, format, and behavior of error responses.
 *
 * ### Responsibilities
 * - Enable detailed stack traces and logs during development.
 * - Ensure production environments expose only safe, user-friendly messages.
 * - Provide flexibility for future error-handling customization (e.g., telemetry, Sentry integration).
 *
 * ### Notes
 * - Typically passed into {@link createErrorHandler}.
 * - The `isDevelopment` flag should be derived from `NODE_ENV === 'development'`.
 * - When `true`, stack traces and detailed messages are logged and optionally included in responses.
 *
 */
export interface ErrorHandlerOptions {
  /**
   * Enables verbose error logging and stack traces when `true`.
   *
   * Recommended to be `true` only in development environments.
   */
  isDevelopment?: boolean
}
