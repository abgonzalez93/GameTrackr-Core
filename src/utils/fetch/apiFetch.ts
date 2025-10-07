import { HTTP_STATUS } from '#constants/httpStatus'

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface FetchOptions {
  headers?: Record<string, string>
  body?: BodyInit | null
  cache?: RequestCache
  filters?: Record<string, unknown>
  timeoutMs?: number
}

/**
 * Converts a filter object into a query string suitable for URL appending.
 *
 * ### Responsibilities
 * - Serializes simple key–value pairs.
 * - Handles arrays by appending multiple parameters (e.g. `?tag=1&tag=2`).
 * - Skips nullish or empty values to keep URLs clean.
 *
 * @param filters - Key-value object representing query parameters.
 * @returns A query string starting with `"?"` or an empty string if no valid filters exist.
 *
 */
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

/**
 * Prepares a final request URL by appending serialized query parameters
 * and removing non-fetchable internal options.
 *
 * @param endpoint - Base endpoint path (e.g., `"/games"`).
 * @param options - Raw fetch options, possibly containing a `filters` object.
 * @returns The normalized URL and cleaned fetch options ready for `fetch()`.
 */
const prepareRequestInput = (
  endpoint: string,
  options?: FetchOptions,
): { endpoint: string; options: Omit<FetchOptions, 'filters'> } => {
  const { filters, ...restOptions } = options ?? {}
  const queryString = filters ? buildQueryParams(filters) : ''
  return {
    endpoint: `${endpoint}${queryString}`,
    options: restOptions,
  }
}

/**
 * Executes a low-level HTTP request using the Fetch API with timeout handling.
 *
 * ### Responsibilities
 * - Adds default headers (`Content-Type: application/json`).
 * - Automatically aborts if the request exceeds the configured timeout.
 * - Ensures consistent behavior across all HTTP methods.
 *
 * @param method - HTTP verb (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
 * @param endpoint - Target API URL.
 * @param options - Optional fetch configuration (headers, body, timeout, etc.).
 * @returns The raw {@link Response} object from the Fetch API.
 */
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

/**
 * Safely parses an HTTP response body into JSON or plain text.
 *
 * ### Responsibilities
 * - Automatically handles `204 No Content` and empty bodies.
 * - Parses `application/json` responses as JSON; falls back to `text()` otherwise.
 *
 * @param res - The {@link Response} object from a fetch call.
 * @returns Parsed body content as `unknown`, or `null` if empty.
 */
const parseResponseBody = async (res: Response): Promise<unknown> => {
  const headers = res.headers
  if (res.status === HTTP_STATUS.NO_CONTENT || headers.get('Content-Length') === '0') return null
  const contentType = headers.get('content-type')
  if (contentType?.includes('application/json')) return await res.json()
  return await res.text()
}

/**
 * Performs a typed HTTP request and parses the response automatically.
 *
 * @template T - The expected shape of the response body.
 * @param method - HTTP verb (e.g., `GET`, `POST`).
 * @param endpoint - API endpoint or absolute URL.
 * @param options - Optional configuration (headers, body, etc.).
 * @returns Parsed response body as type `T`.
 */
const request = async <T>(method: Method, endpoint: string, options: FetchOptions = {}): Promise<T> => {
  const res = await performRequest(method, endpoint, options)
  const parsed = await parseResponseBody(res)
  return parsed as T
}

/**
 * Internal helper that unifies request preparation, query serialization,
 * and typed response parsing into a single flow.
 *
 * @template T - Expected response type.
 * @param method - HTTP method.
 * @param endpoint - API endpoint.
 * @param options - Optional fetch configuration.
 * @returns Typed response data.
 */
const method = <T>(method: Method, endpoint: string, options?: FetchOptions): Promise<T> => {
  const { endpoint: finalEndpoint, options: finalOptions } = prepareRequestInput(endpoint, options)
  return request<T>(method, finalEndpoint, finalOptions)
}

/**
 * **apiFetch**
 *
 * A typed, provider-agnostic HTTP client wrapper for external API requests.
 *
 * ### Features
 * - Strongly-typed return values via generics.
 * - Automatic query serialization via `filters`.
 * - Built-in timeout and JSON parsing.
 * - Unified error-handling entry point.
 *
 */
export const apiFetch = {
  get: <T>(endpoint: string, options?: FetchOptions) => method<T>('GET', endpoint, options),
  post: <T>(endpoint: string, options?: FetchOptions) => method<T>('POST', endpoint, options),
  put: <T>(endpoint: string, options?: FetchOptions) => method<T>('PUT', endpoint, options),
  patch: <T>(endpoint: string, options?: FetchOptions) => method<T>('PATCH', endpoint, options),
  delete: <T = void>(endpoint: string, options?: FetchOptions) => method<T>('DELETE', endpoint, options),
}
