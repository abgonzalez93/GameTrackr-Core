import { type ConfigValues } from '#types/config/ConfigValues'

export const normalizeEnvValues = (source: ConfigValues, emptyAsUndefined: boolean): ConfigValues => {
  const normalized: ConfigValues = {}

  for (const [key, value] of Object.entries(source)) {
    const upperKey = key.toUpperCase()
    const normalizedValue = emptyAsUndefined && value === '' ? undefined : value
    normalized[upperKey] = normalizedValue
  }

  return normalized
}
