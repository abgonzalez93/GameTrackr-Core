import { type BaseURLOptions } from '#types/http.type'

export const getBaseUrl = ({ protocol, host, port }: BaseURLOptions): string => {
  return `${protocol}://${host}:${port}`
}
