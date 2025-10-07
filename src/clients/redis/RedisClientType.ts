import { type RedisClientType } from 'redis'

/**
 * **RedisClientType**
 *
 * Type re-export for the Redis client interface.
 *
 * This allows other TrackPlay services to depend on a unified Redis type definition
 * provided by `@trackplay/core` without requiring a direct `redis` dependency.
 *
 * ### Use Case
 * Useful when defining ports, adapters, or infrastructure layers that depend on Redis,
 * ensuring consistent typing across all microservices.
 *
 * @see {@link https://www.npmjs.com/package/redis | Redis NPM Package}
 */
export type { RedisClientType }
