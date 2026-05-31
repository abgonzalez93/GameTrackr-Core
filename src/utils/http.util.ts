export interface BaseURLOptions {
  protocol: 'http' | 'https'
  host: string
  port: number
}

export const getBaseUrl = ({ protocol, host, port }: BaseURLOptions): string => {
  return `${protocol}://${host}:${port}`
}
