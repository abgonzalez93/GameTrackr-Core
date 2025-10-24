import { type ConfigValues } from '#types/config/ConfigValues'

/**
 * **GetEnvOptions**
 *
 * Base interface defining runtime options for environment configuration utilities
 * such as {@link getClientEnv} and {@link createEnvConfig}.
 *
 * These options control **how environment variables are sourced and normalized**
 * before validation with Zod schemas.
 *
 * ### Responsibilities
 * - Allow custom injection of environment values (useful for testing or serverless environments).
 * - Provide control over how empty string values are interpreted.
 * - Ensure consistent normalization behavior across all environment utilities.
 *
 * ### Properties
 * | Name | Type | Description |
 * |------|------|-------------|
 * | `runtimeEnv` | {@link ConfigValues} | Optional environment source. Defaults to `process.env`. |
 * | `emptyStringAsUndefined` | `boolean` | Whether empty strings should be converted to `undefined` before validation. Defaults to `true`. |
 *
 * @see {@link ConfigValues}
 * @see {@link getClientEnv}
 * @see {@link createEnvConfig}
 */
export interface GetEnvOptions {
  /**
   * Optional custom environment source.
   * If not provided, defaults to `process.env`.
   *
   * Useful for:
   * - Unit testing
   * - Serverless environments
   * - Dependency injection in configuration utilities
   */
  runtimeEnv?: ConfigValues

  /**
   * Controls whether empty string values (`""`) are treated as `undefined`.
   *
   * @default true
   */
  emptyStringAsUndefined?: boolean
}
