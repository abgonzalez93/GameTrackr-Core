import { HTTP_STATUS } from '#constants/httpStatus.constant'

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface FetchOptions {
  headers?: Record<string, string>
  body?: BodyInit | null
  cache?: RequestCache
  filters?: Record<string, unknown>
  timeoutMs?: number
}

const buildQueryParams = (filters: Record<string, unknown>): string => {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === null || value === '') continue

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== undefined && v !== null && v !== '') {
          params.append(key, String(v))
        }
      })
    } else {
      params.set(key, String(value))
    }
  }

  const query = params.toString()
  return query ? `?${query}` : ''
}

interface PreparedRequestInput {
  endpoint: string
  options: Omit<FetchOptions, 'filters'>
}

const prepareRequestInput = (endpoint: string, options?: FetchOptions): PreparedRequestInput => {
  const { filters, ...restOptions } = options ?? {}
  const queryString = filters ? buildQueryParams(filters) : ''
  return {
    endpoint: `${endpoint}${queryString}`,
    options: restOptions,
  }
}

const performRequest = async (
  method: Method,
  endpoint: string,
  options: Omit<FetchOptions, 'filters'>,
): Promise<Response> => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 8000)

  try {
    return await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body ?? null,
      cache: options.cache ?? 'no-store',
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
  }
}

const parseResponseBody = async (res: Response): Promise<unknown> => {
  const headers = res.headers
  if (res.status === HTTP_STATUS.NO_CONTENT || headers.get('Content-Length') === '0') return null
  const contentType = headers.get('content-type')
  if (contentType?.includes('application/json')) return await res.json()
  return await res.text()
}

const request = async <T>(method: Method, endpoint: string, options: FetchOptions = {}): Promise<T> => {
  const res = await performRequest(method, endpoint, options)
  const parsed = await parseResponseBody(res)
  return parsed as T
}

const method = <T>(method: Method, endpoint: string, options?: FetchOptions): Promise<T> => {
  const { endpoint: finalEndpoint, options: finalOptions } = prepareRequestInput(endpoint, options)
  return request<T>(method, finalEndpoint, finalOptions)
}

export const apiFetch = {
  get: <T>(endpoint: string, options?: FetchOptions) => method<T>('GET', endpoint, options),
  post: <T>(endpoint: string, options?: FetchOptions) => method<T>('POST', endpoint, options),
  put: <T>(endpoint: string, options?: FetchOptions) => method<T>('PUT', endpoint, options),
  patch: <T>(endpoint: string, options?: FetchOptions) => method<T>('PATCH', endpoint, options),
  delete: <T = void>(endpoint: string, options?: FetchOptions) => method<T>('DELETE', endpoint, options),
}
