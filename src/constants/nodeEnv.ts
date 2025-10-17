/**
 * **NODE_ENV Constant**
 *
 * Defines the canonical, type-safe values accepted for the `NODE_ENV`
 * environment variable across all TrackPlay services.
 *
 * ### Scope
 * - Establishes a shared contract for environment mode detection.
 * - Ensures consistent checks for environment-specific behaviors such as:
 *   - Debug logging
 *   - CORS policies
 *   - Database connections
 *   - Error stack visibility
 *
 * ### Allowed Values
 * - `"development"` — Enables relaxed security, verbose logs, and hot reload.
 * - `"production"` — Optimized for stability, performance, and restricted output.
 * - `"test"` — Used exclusively for automated or integration testing.
 *
 * ### Notes
 * - Should always mirror the official Node.js `process.env.NODE_ENV` semantics.
 * - Used in combination with `isDevelopment`, `isProduction`, and `isTest`
 *   helper flags derived at runtime.
 */
export const NODE_ENV = {
  /** Local development environment (debug, verbose, non-optimized). */
  DEVELOPMENT: 'development',

  /** Production environment (optimized, secure, minimal output). */
  PRODUCTION: 'production',

  /** Automated testing environment (unit or integration tests). */
  TEST: 'test',
} as const
