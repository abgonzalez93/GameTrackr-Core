import { type BaseURLOptions } from '#types/http/BaseURLOptions'

export const getBaseUrl = ({ protocol, host, port }: BaseURLOptions): string => {
  return `${protocol}://${host}:${port}`
}
