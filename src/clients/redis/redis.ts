import { RedisClientType, createClient } from 'redis'
import { Logger } from 'winston'

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

/**
 * **connectRedis**
 *
 * Establishes a connection to the Redis server using the provided client.
 *
 * ### Scope
 * - Connects the client and logs connection success or failure.
 * - Terminates the process gracefully if the connection fails.
 *
 * ### Responsibilities
 * - Handle Redis connection lifecycle during application startup.
 * - Report connection status via the provided {@link Logger} instance.
 *
 * ### Notes
 * - Logs a success message upon successful connection (`✅ Redis connected`).
 * - Logs an error and calls `process.exit(1)` on failure to prevent partial startup.
 *
 * @param client - The {@link RedisClientType} instance to connect.
 * @param logger - The {@link Logger} instance used for structured output.
 * @returns Promise resolving when the connection is successfully established.
 */
export const connectRedis = async (client: RedisClientType, logger: Logger): Promise<void> => {
  try {
    await client.connect()
    logger.info('✅ Redis connected')
  } catch (error) {
    logger.error('❌ Failed to connect to Redis:', error)
    process.exit(1)
  }
}
