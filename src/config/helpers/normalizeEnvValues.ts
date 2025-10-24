import { type ConfigValues } from '#types/config/ConfigValues'

/**
 * **normalizeEnvValues**
 *
 * Converts raw environment variables from `process.env` into a normalized
 * and predictable key–value map suitable for schema validation.
 *
 * This helper is primarily used by configuration utilities such as
 * {@link createEnvConfig} and {@link buildEnvConfig} to sanitize input values
 * before passing them to Zod schemas.
 *
 * ### Responsibilities
 * - Convert the `process.env` object into a plain, serializable record.
 * - Optionally replace **empty string values** (`""`) with `undefined`
 *   to enforce stricter validation semantics.
 * - Preserve all non-empty string values as-is.
 *
 * ### Parameters
 * | Name | Type | Description |
 * |------|------|-------------|
 * | `source` | `ConfigValues` | The raw environment object (usually `process.env`). |
 * | `emptyAsUndefined` | `boolean` | If `true`, replaces empty strings with `undefined`. |
 *
 * @param source - Raw environment variables (typically `process.env`).
 * @param emptyAsUndefined - Whether to treat empty strings as `undefined`.
 * @returns A normalized key–value map of environment variables.
 *
 * @see {@link ConfigValues}
 * @see {@link createEnvConfig}
 * @see {@link buildEnvConfig}
 */
export const normalizeEnvValues = (source: ConfigValues, emptyAsUndefined: boolean): ConfigValues =>
  Object.fromEntries(
    Object.entries(source).map(([key, value]) => [key, emptyAsUndefined && value === '' ? undefined : value]),
  )
