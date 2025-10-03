/**
 * **HTTP_STATUS Constant**
 *
 * Defines a canonical list of HTTP status codes used across all API responses.
 *
 * ### Scope
 * - Centralizes common HTTP status codes to ensure consistency
 *   throughout controllers, middlewares, and error handlers.
 * - Aligns with the [RFC 9110](https://datatracker.ietf.org/doc/html/rfc9110)
 *   HTTP/1.1 standard.
 *
 * ### Notes
 * - Intended for use in both success and error responses.
 * - Promotes semantic readability (e.g. `HTTP_STATUS.OK` instead of `200`).
 * - Includes standard informational, success, redirect, client error,
 *   and server error codes.
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc9110 | RFC 9110 Specification}
 * @see {@link TrackPlayError}
 */
export const HTTP_STATUS = {
  // --- 1xx: Informational ---
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  PROCESSING: 102,

  // --- 2xx: Success ---
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // --- 3xx: Redirection ---
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,

  // --- 4xx: Client Errors ---
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  CONFLICT: 409,
  GONE: 410,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  // --- 5xx: Server Errors ---
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
}
