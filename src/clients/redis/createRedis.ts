import { type RedisClientType, createClient } from 'redis'

/**
 * **createRedis**
 *
 * Factory function for creating a configured {@link RedisClientType} instance.
 *
 * ### Scope
 * - Initializes a Redis client with the provided connection URL.
 * - Encapsulates Redis client creation for dependency injection.
 *
 * ### Notes
 * - The returned client is **not connected** automatically — call {@link connectRedis}
 *   to establish the actual connection.
 * - Typically invoked during application bootstrap.
 *
 * @param url - Full Redis connection URL (e.g., `"redis://localhost:6379"`).
 * @returns A {@link RedisClientType} instance configured but not connected.
 */
export const createRedis = (url: string): RedisClientType => createClient({ url })
