import { type ConfigValues } from '#types/config/ConfigValues'

/**
 * **normalizeEnvValues**
 *
 * Converts raw environment variables from `process.env` into a normalized,
 * case-insensitive key–value map suitable for schema validation.
 *
 * ### Responsibilities
 * - Convert all keys to uppercase for case-insensitive lookups.
 * - Treat keys like `port`, `PORT`, or `Port` as the same variable.
 * - Optionally replace empty string values (`""`) with `undefined`.
 * - Preserve all non-empty values as-is.
 * - The **last occurrence wins** when duplicate keys differ only by case.
 *
 * ### Parameters
 * | Name | Type | Description |
 * |------|------|-------------|
 * | `source` | `ConfigValues` | The raw environment object (usually `process.env`). |
 * | `emptyAsUndefined` | `boolean` | If `true`, replaces empty strings with `undefined`. |
 *
 * @param source - Raw environment variables (typically `process.env`).
 * @param emptyAsUndefined - Whether to treat empty strings as `undefined`.
 * @returns A normalized, case-insensitive key–value map of environment variables.
 *
 * @see {@link ConfigValues}
 * @see {@link createEnvConfig}
 * @see {@link buildEnvConfig}
 */
export const normalizeEnvValues = (source: ConfigValues, emptyAsUndefined: boolean): ConfigValues => {
  const normalized: ConfigValues = {}

  for (const [key, value] of Object.entries(source)) {
    const upperKey = key.toUpperCase()
    const normalizedValue = emptyAsUndefined && value === '' ? undefined : value
    normalized[upperKey] = normalizedValue
  }

  return normalized
}
